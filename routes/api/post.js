const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const Post = require("../../model/Post");
const User = require("../../model/User");

// @route POST api/post
// @desc Create post
// @access Private
router.post(
  "/",
  [auth, [check("text", "Text is required").not().isEmpty()]],
  async (req, res) => {
    try {
      const { text } = req.body;

      const user = await User.findOne({ _id: req.user.id }).select("-password");

      const postData = {
        text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };
      const post = new Post(postData);
      await post.save();
      res.json(post);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server Error");
    }
  }
);

// @route GET api/post
// @desc Get all posts
// @access Private
router.get("/", auth, async (req, res) => {
  try {
    const post = await Post.find().sort({ date: -1 });
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// @route GET api/post/:post_id
// @desc Get posts by id
// @access Private
router.get("/:post_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.json(post);
  } catch (err) {
    console.error(err);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route PUT api/post/:post_id
// @desc Edit post
// @access Private
router.put("/:post_id", auth, async (req, res) => {
  try {
    const { text } = req.body;
    let post = await Post.findOne({ _id: req.params.post_id });
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }
    if (post.user.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ msg: "You are not authorize to perform this action" });
    }
    post.text = text;
    await post.save();

    res.json(post);
  } catch (err) {
    console.error(err);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route DELETE api/post/:post_id
// @desc Delete post
// @access Private
router.delete("/:post_id", auth, async (req, res) => {
  try {
    const { text } = req.body;
    let post = await Post.findOne({ _id: req.params.post_id });
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }
    if (post.user.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ msg: "You are not authorize to perform this action" });
    }
    await post.remove();
    res.json("Post deleted");
  } catch (err) {
    console.error(err);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route DELETE api/post/:post_id
// @desc Delete post
// @access Private
router.delete("/:post_id", auth, async (req, res) => {
  try {
    const { text } = req.body;
    let post = await Post.findOne({ _id: req.params.post_id });
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }
    if (post.user.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ msg: "You are not authorize to perform this action" });
    }
    await post.deleteOne();
    res.json("Post deleted");
  } catch (err) {
    console.error(err);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route PUT api/post/like/:post_id
// @desc like a post
// @access Private
router.put("/like/:post_id", auth, async (req, res) => {
  try {
    let post = await Post.findOne({ _id: req.params.post_id });
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    const allLikedUsers = post.likes.map((like) => like._id.toString());

    if (!allLikedUsers.includes(req.user.id)) {
      await post.likes.unshift(req.user.id);
    } else {
      await post.likes.pull(req.user.id);
    }

    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.error(err);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route PUT api/post/unlike/:post_id
// @desc unlike a post
// @access Private
router.put("/unlike/:post_id", auth, async (req, res) => {
  try {
    let post = await Post.findOne({ _id: req.params.post_id });
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    const allLikedUsers = post.likes.map((like) => like._id.toString());

    if (allLikedUsers.includes(req.user.id)) {
      await post.likes.pull(req.user.id);
    } else {
      await post.likes.unshift(req.user.id);
    }

    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.error(err);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route PUT api/post/comment/:post_id
// @desc add a post
// @access Private
router.put("/comment/:post_id", auth, async (req, res) => {
  try {
    let post = await Post.findOne({ _id: req.params.post_id });
    const user = await User.findOne({ _id: req.user.id });
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    const newComment = {
      text: req.body.text,
      user: req.user.id,
      name: user.name,
      avatar: user.avatar,
    };

    await post.comments.unshift(newComment);

    await post.save();

    res.json(post.comments);
  } catch (err) {
    console.error(err);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route DELETE api/comment/:post_id/:commen_id
// @desc Delete comment
// @access Private
router.delete("/comment/:post_id/:comment_id", auth, async (req, res) => {
  try {
    let post = await Post.findOne({ _id: req.params.post_id });
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }
    const commentIndex = post.comments
      .map((comment) => comment._id.toString())
      .indexOf(req.params.comment_id);

    if (post.comments[commentIndex].user.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ msg: "You are not authorize to perform this action" });
    }
    await post.comments.pull(post.comments[commentIndex]._id);
    await post.save();
    res.json("Post deleted");
  } catch (err) {
    console.error(err);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.status(500).send("Server Error");
  }
});

module.exports = router;
