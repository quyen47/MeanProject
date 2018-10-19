const express = require('express');

const app = express();

// app.use((req, res, next) => {
//     console.log('First middleware.');
//     next();
// });

// app.use((req, res, next) => {
//     console.log('Second middeware.');
//     res.send('Hello from express.');
//     // next();
// });

app.use((req, res, next) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader(
        "Access-Control-Allow-Hearders",
        "Origin, X-Requested-With, Content-Type, Accept"
      );
      res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, DELETE, PUT, OPTIONS"
      );
    next();
});

app.use("/api/posts", (req, res, next) => {
    const posts = [
        {
            id: 1,
            title: "first title",
            content: "first content"
        },
        {
            id: 2,
            title: "second title2",
            content: "second content"
        }
    ];
    res.status(200).json({
        message: 'Posts fetched succesfully!',
        post: posts
    });
});

module.exports = app;