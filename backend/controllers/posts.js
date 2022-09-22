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
  post.likes = 0;
  post.dislikes = 0;
  post
    .save()
    .then(() => res.status(201).json({ message: "Post postée !" }))
    .catch((error) => res.status(400).json({ error: error }));
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
  Post.findOne({ _id: req.params.id })
    .then((post) => {
      if (!post) {
        res.status(404).json({ error: error });
      }
      if (post.userId !== req.auth.userId) {
        res.status(400).json({ error: error });
      }
      const filename = post.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        Post.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: "Deleted!" }))
          .catch((error) => res.status(400).json({ error: error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};
//----------------------------------------------------------
exports.likePost = (req, res, next) => {
  if (req.body.like === 1) {
    Post.updateOne(
      { _id: req.params.id },
      {
        $inc: { likes: req.body.like++ },
        $push: { usersLiked: req.body.userId },
      }
    )
      .then((post) => res.status(200).json({ message: "Like ajouté !" }))
      .catch((error) => res.status(400).json({ error }));
  } else if (req.body.like === -1) {
    Post.updateOne(
      { _id: req.params.id },
      {
        $inc: { dislikes: req.body.like++ * -1 },
        $push: { usersDisliked: req.body.userId },
      }
    )
      .then((post) => res.status(200).json({ message: "Dislike ajouté !" }))
      .catch((error) => res.status(400).json({ error }));
  } else {
    Post.findOne({ _id: req.params.id })
      .then((post) => {
        if (post.usersLiked.includes(req.body.userId)) {
          Post.updateOne(
            { _id: req.params.id },
            { $pull: { usersLiked: req.body.userId }, $inc: { likes: -1 } }
          )
            .then((post) => {
              res.status(200).json({ message: "Like supprimé !" });
            })
            .catch((error) => res.status(400).json({ error }));
        } else if (post.usersDisliked.includes(req.body.userId)) {
          Post.updateOne(
            { _id: req.params.id },
            {
              $pull: { usersDisliked: req.body.userId },
              $inc: { dislikes: -1 },
            }
          )
            .then((post) => {
              res.status(200).json({ message: "Dislike supprimé !" });
            })
            .catch((error) => res.status(400).json({ error }));
        }
      })
      .catch((error) => res.status(400).json({ error }));
  }
};
