const express = require("express");
const router = express.Router();

const ctrlPosts = require("../controllers/posts");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

router.post("/", /*auth,*/ multer, ctrlPosts.createPost);
router.get("/:id", /*auth,*/ ctrlPosts.getOnePost);
router.get("/", /*auth,*/ ctrlPosts.getAllPosts);
router.put("/:id", /*auth,*/ multer, ctrlPosts.modifyPost);
router.delete("/:id", /*auth,*/ ctrlPosts.deletePost);
router.post("/:id/like", /*auth,*/ ctrlPosts.likePost);

module.exports = router;
