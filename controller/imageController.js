require("dotenv").config();
const multer = require("multer");
const multers3 = require("multer-s3");
const aws = require("aws-sdk");

const s3 = new aws.S3({
   accessKeyId: process.env.ACCESS_KEY_ID,
   secretAccessKey: process.env.SECRET_ACCESS_KEY,
});

const fileStorage = multers3({
   s3: s3,
   bucket: process.env.BUCKET,
   // acl: "public-read",
   key: (req, file, cb) => {
      cb(null, file.originalname);
   },
});

const uploader = multer({ storage: fileStorage, limits: 2000000 }).single(
   "image"
);

// another way
const storage = multer.memoryStorage({
   destination: (req, file, cb) => {
      cb(null, "");
   },
});

const uploadImg = multer({ storage }).single("image");

exports.singleUpload = (req, res, next) => {
   // uploader(req, res, (error) => {
   //    if (error) {
   //       console.log(error);
   //       return res.status(500).json({ msg: "AWS server error" });
   //    }
   //    console.log(req.file);
   //    return res.status(200).json({ msg: "Successfully upload" });
   // });
   // const parmas = {
   //    s3 : s3,

   // }

   uploadImg(req, res, (err) => {
      if (err) {
         console.log(err);
         return res.status(500).json({ msg: "AWS server error" });
      }
      console.log(req.file);
      s3.upload(
         {
            Bucket: process.env.BUCKET,
            Body: req.file.buffer,
            Key: req.file.originalname,
         },
         (err, data) => {
            console.log(data);
            res.status(200).json({ data });
         }
      );
      return res.status(200).json({ msg: "Successfully upload" });
   });
};
