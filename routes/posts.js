const express = require("express");
const router = express.Router();

//Load model
const Post = require("../models/Post");

//Show all Post
router.get("/", async (req, res) => {
  const posts = await Post.find().lean().sort({ date: -1 });
  res.render("posts/index", { posts: posts });
});

//Show form to add Post
router.get("/add", (req, res) => {
  res.render("posts/add");
});

//Post method
router.post("/", async (req, res) => {
  console.log(req.body);
  const { title, text } = req.body;
  let errs = [];
  if (!title) errs.push({ msg: "Title required !" });
  if (!text) errs.push({ msg: "Text required !" });
  if (errs.length > 0) res.render("posts/add", { title, text });
  else {
    const newPostData = { title: title, text: text };
    const newPost = new Post(newPostData);
    await newPost.save();
    res.redirect("/posts");
  }
});

//Show edit Post, Get method
router.get("/edit/:id", async (req, res) => {
  const post = await Post.findOne({ _id: req.params.id }).lean();
  res.render("posts/edit", { post: post });
});

//update posts, PUT method
router.put("/:id", async (req, res) => {
  const { title, text } = req.body;
  await Post.findOneAndUpdate(
    { _id: req.params.id },
    { title: title, text: text }
  );
  res.redirect("/posts");
});

//edit post, DELETE method
router.delete("/:id", async (req, res) => {
  await Post.findOneAndRemove({ _id: req.params.id });
  res.redirect("/posts");
});

//delete all posts, DELETE method
router.delete("/", async (req, res) => {
  await Post.deleteMany({});
  res.redirect("/posts");
});

module.exports = router;
