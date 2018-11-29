const path = require("path");
const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const routerPost = require('./routers/posts')
const mongoose = require('mongoose');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("backend/images")));

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

app.use("/api/posts", routerPost);
module.exports = app;