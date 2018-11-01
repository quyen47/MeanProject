const express = require("express");

const Post = require('../models/post');

const router = express.Router();

router.post("", (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });
    post.save().then(createPost => {
        res.status(201).json({
            message: "Post added successfully",
            postId: createPost._id
        });
    });
});

router.get("", (req, res, next) => {
    const pageSize = +req.query.pageSize;
    const currentPage = +req.query.currentPage;
    const postQuery = Post.find();
    let fetchedPosts;

    if(pageSize && currentPage) {
        postQuery
            .skip(pageSize * (currentPage - 1))
            .limit(pageSize);
    }

    console.log(req.query);
    postQuery
        .then(documents => {
            fetchedPosts =documents;
            return Post.count();
        })
        .then( total => {
            res.status(200).json({
                message: 'Posts fetched succesfully!',
                posts: fetchedPosts,
                count: total
            });
        });
});

router.get("/:id", (req, res, next) => {
    Post.findById({_id: req.params.id})
        .then(post => {
            if (post) {
                res.status(200).json(post);
            } else {
                res.status(404).json({message: 'Can get post!'});
            }
        });
})

router.delete("/:id", (req, res, next) => {
    Post.deleteOne({_id: req.params.id})
        .then(result => {
            console.log(result);
            res.status(200).json({message: "Post deleted!"});
        });
});

router.put("/:id", (req, res, next) => {
    const post = Post({
        _id: req.body.id,
        title: req.body.title,
        content: req.body.content
    });
    Post.updateOne({_id: req.params.id}, post)
        .then(result => {
            console.log(result);
            res.status(200).json({message: "Update successful!"});
        })
        .catch(result => {
            console.log("FAIL");
        });
});

module.exports = router;