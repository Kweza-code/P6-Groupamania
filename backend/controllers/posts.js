const Post = require("../models/posts");
const fs = require("fs");

exports.createPost = (req, res, next) => {
  const postObject = JSON.parse(req.body.post);
  const post = new Post({
    ...postObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });
  post.userId = req.auth.userId;
  post.likes = 0;
  post.dislikes = 0;
  post.usersLiked = [];
  post.usersDisliked = [];
  post
    .save()
    .then(() => res.status(201).json({ message: "Post postée !" }))
    .catch((error) => res.status(400).json({ error: error }));
  console.log(post.userId);
};
//----------------------------------------------------------

exports.getOnePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id })
    .then((post) => res.status(200).json(post))
    .catch((error) => res.status(404).json({ error: error }));
};
//----------------------------------------------------------
exports.getAllPosts = (req, res, next) => {
  Post.find()
    .sort({ createdAt: "desc" })
    .then((posts) => res.status(200).json(posts))
    .catch((error) => res.status(400).json({ error: error }));
};
//----------------------------------------------------------
exports.modifyPost = (req, res, next) => {
  // Loading post
  Post.findOne({ _id: req.params.id })
    .then((post) => {
      // Veryfiying userId
      if (post.userId !== req.auth.userId) {
        res.status(403).json({ error: "Vous n'êtes pas l'auteur du post" });
      } else {
        // Deleting image
        if (req.file) {
          const filename = post.imageUrl.split("/images/")[1];
          fs.unlink(`images/${filename}`, () => {});
        }
        // Gathering postObject data
        const postObject = req.file
          ? {
              ...JSON.parse(req.body.post),
              imageUrl: `${req.protocol}://${req.get("host")}/images/${
                req.file.filename
              }`,
            }
          : { ...req.body };
        // Updating the post in DB
        Post.updateOne(
          { _id: req.params.id },
          { ...postObject, _id: req.params.id }
        )
          .then(() =>
            res.status(201).json({ message: "Post updated successfully!" })
          )
          .catch((error) => res.status(400).json({ error: error }));
      }
    })
    .catch((error) => res.status(404).json({ error }));
};
//----------------------------------------------------------
exports.deletePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id });
  User.findOne({ _id: req.auth.userId })
    .then(myUser)
    .then((post) => {
      if (post.userId !== req.auth.userId || myUser.admin !== true) {
        res.status(400).json({ error: error });
      } else {
        const filename = post.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          Post.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: "Deleted!" }))
            .catch((error) => res.status(400).json({ error: error }));
        });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};
//----------------------------------------------------------
exports.likePost = (req, res, next) => {
  // Identification of the post
  Post.findOne({ _id: req.params.id })
    .then(async (post) => {
      if (!post) {
        res.status(404).json({ message: "The post does not exist" });
      } else {
        // On met en place des variables tampons
        let likes = post.likes;
        let dislikes = post.dislikes;
        let usersLiked = post.usersLiked;
        let usersDisliked = post.usersDisliked;
        // On ajuste
        switch (req.body.like) {
          case 1:
            usersDisliked = usersDisliked.filter(
              (element) => element !== req.auth.userId
            );
            usersLiked.addToSet(req.auth.userId);
            break;
          case -1:
            usersLiked = usersLiked.filter(
              (element) => element !== req.auth.userId
            );
            usersDisliked.addToSet(req.auth.userId);
            break;
          case 0:
            usersLiked = usersLiked.filter(
              (element) => element !== req.auth.userId
            );
            usersDisliked = usersDisliked.filter(
              (element) => element !== req.auth.userId
            );
            break;
          default:
            res.status(400).send({ message: "Unknown value " });
            return;
        }
        // On met à jour les totaux
        likes = usersLiked.length;
        dislikes = usersDisliked.length;
        // On sauvegarde notre post
        let data = {
          usersLiked: usersLiked,
          usersDisliked: usersDisliked,
          likes: likes,
          dislikes: dislikes,
        };
        await post.updateOne(data);
        res.status(200).send({ message: "Modification like made", data: data });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error: error,
      });
    });
};
