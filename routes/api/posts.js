const express = require("express");
const router = express.Router();
const multer = require('multer');

const Post = require("../../models/Post");

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './client/public/images');
    },
    filename: (req, file, cb) => {
        
        cb(null, file.originalname);
    }
});
const upload = multer({
    storage: multerStorage
}).single('file');

router.post("/create", async (req, res) => {

    const newPost = new Post({
        title: req.body.title,
        createdAt: new Date().toISOString(),
        text: req.body.text,
        image: "image",
        user_id: req.body.id
    });

    console.log(req.body);

    await newPost.save((err, result) => {
        if (err) {
            return res.status(400).json(err);
        } else {
            return res.status(200).json("Created");
        }
    });
});

router.post("/add-image", async (req, res) => {
    console.log("aya")
    upload(req, res, function (err) {
        if (err) {
            return res.status(500).json(err);
        }
        return res.status(200).json("images/" + req.file.originalname);
    });
});


router.get("/:id", async (req, res) => {
    let posts = await Post.find({ user_id: req.params.id })
    return res.status(200).json({ posts });
})

module.exports = router;
