const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const Post = require('./models/post');
const mongoose = require('mongoose');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.use((req, res, next) => {
//     console.log('First middleware.');
//     next();
// });

// app.use((req, res, next) => {
//     console.log('Second middeware.');
//     res.send('Hello from express.');
//     // next();
// });

mongoose.connect("mongodb+srv://quyen:4K!qESLzCgf8BGH@clusterver1-q8jkp.mongodb.net/demo?retryWrites=true", { useNewUrlParser: true })
    .then(() => {
        console.log('Connect successfully!');
    }).catch(() => {
        console.log('Connect fail!');
    });

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, DELETE, PUT, OPTIONS"
    );
    next();
});

app.post("/api/posts", (req, res, next) => {
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

app.get("/api/posts", (req, res, next) => {
    Post.find().then(data => {
        res.status(200).json({
            message: 'Posts fetched succesfully!',
            posts: data
        });
    });
});

app.delete("/api/posts/:id", (req, res, next) => {
    Post.deleteOne({_id: req.params.id})
        .then(result => {
            console.log(result);
            res.status(200).json({message: "Post deleted!"});
        });
});

module.exports = app;