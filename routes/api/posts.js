const express = require("express");
const router = express.Router();
const multer = require('multer');
const fs = require('fs');

const Post = require("../../models/Post");

var aws = require('aws-sdk');

router.post("/create", async (req, res) => {

    const newPost = new Post({
        title: req.body.title,
        createdAt: new Date().toISOString(),
        text: req.body.text,
        image: req.body.image,
        user_id: req.body.id
    });

    await newPost.save((err, result) => {
        if (err) {
            return res.status(400).json(err);
        } else {
            return res.status(200).json("Created");
        }
    });
});

router.post("/add-image", multer({ dest: 'temp/', limits: { fieldSize: 8 * 1024 * 1024 } }).array('images'), async (req, res) => {
    aws.config.update({
        region: 'us-west-1',
        accessKeyId: 'AKIAJUUMYTYWVT2DXXRQ',
        secretAccessKey: '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'
    })
    const S3_BUCKET = 'blog-cs174';
    const s3 = new aws.S3();

    const file = req.files;

    file.map((item) => {
        if (item.path != null) {
            var params = {
                ACL: 'public-read',
                Bucket: S3_BUCKET,
                Body: fs.createReadStream(item.path),
                Key: item.originalname
            };
            s3.upload(params, (err, data) => {

                if (err) {
                    console.log('Error occured while trying to upload to S3 bucket', err);
                }

                if (data) {
                    return res.status(200).json(data);
                }
            });

        }
    });

    s3.getSignedUrl('putObject', s3Params, (err, data) => {
        if (err) {
            res.json({ success: false, error: err })
        }

        const returnData = {
            signedRequest: data,
            url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
        };

        res.json({ success: true, data: { returnData } });
    });
});

router.get("/:id", async (req, res) => {
    let posts = await Post.find({ user_id: req.params.id })
    return res.status(200).json({ posts });
})

module.exports = router;
