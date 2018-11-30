const express = require("express");
const multer = require('multer');
const Post = require('../models/post');
const router = express.Router();

const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/gif': 'gif'
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error("Invalid mime type");
        if (isValid) {
            error = null;
        };
        cb(error, 'backend/images');
    },
    filename: function (req, file, cb) {
        const name = file.originalname.toLowerCase().split(' ').join('_');
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb( null, name + '_' + Date.now() + '.' + ext);
    }
})

router.post("", multer({storage: storage}).single("image"), (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        imagePath: url + "/images/" + req.file.filename
    });
    post.save().then(createPost => {
        res.status(201).json({
            message: "Post added successfully",
            post: {
                ...createPost,
                id: createPost._id
            }
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

router.put("/:id", multer({storage: storage}).single("image"), (req, res, next) => {
    let imagePath = req.body.imagePath;
    if (req.file) {
        const url = req.protocol + "://" + req.get("host");
        imagePath = url + "/images/" + req.file.filename
    }
    const post = Post({
        _id: req.body.id,
        title: req.body.title,
        content: req.body.content,
        imagePath: imagePath
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