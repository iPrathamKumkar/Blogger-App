const express = require("express");
const router = express.Router();
const multer = require('multer');
const fs = require('fs');

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


var aws = require('aws-sdk');

// Configure aws with your accessKeyId and your secretAccessKey

// Now lets export this function so we can call it from somewhere else

router.post("/create", async (req, res) => {

    const newPost = new Post({
        title: req.body.title,
        createdAt: new Date().toISOString(),
        text: req.body.text,
        image: req.body.image,
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

router.post("/add-image", multer({ dest: 'temp/', limits: { fieldSize: 8 * 1024 * 1024 } }).array('images'), async (req, res) => {
    console.log(req.name);

    aws.config.update({
        region: 'us-west-1', // Put your aws region here
        accessKeyId: 'AKIAJUUMYTYWVT2DXXRQ',
        secretAccessKey: 'd9hYGzxz+FtxkNidHQQoHv8NYxVcCSfqlx/nTQVo'
    })
    const S3_BUCKET = 'blog-cs174';
    const s3 = new aws.S3();  // Create a new instance of S3

    // Set up the payload of what we are sending to the S3 api

    const file = req.files;

    file.map((item) => {
      if (item.path != null) {
        var params = {
          ACL: 'public-read',
          Bucket: S3_BUCKET,
	  Body: fs.createReadStream(item.path),
          Key:item.originalname
        };
	console.log(' in PARAMS OF AWS S# IMAGE UPLOADDDDDDD', item);
	console.log(' PARAMS ', params);
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






    // Make a request to the S3 API to get a signed URL which we can use to upload our file
    s3.getSignedUrl('putObject', s3Params, (err, data) => {
        if (err) {
            console.log(err);
            res.json({ success: false, error: err })
        }
        // Data payload of what we are sending back, the url of the signedRequest and a URL where we can access the content after its saved. 
        const returnData = {
            signedRequest: data,
            url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
        };
        // Send it all back
        res.json({ success: true, data: { returnData } });
    });
});


router.get("/:id", async (req, res) => {
    let posts = await Post.find({ user_id: req.params.id })
    return res.status(200).json({ posts });
})

module.exports = router;
