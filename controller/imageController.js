require("dotenv").config();
const multer = require("multer");
const multers3 = require("multer-s3");
const aws = require("aws-sdk");
const path = require("path");

const s3 = new aws.S3({
   accessKeyId: process.env.ACCESS_KEY_ID,
   secretAccessKey: process.env.SECRET_ACCESS_KEY,
});

const profileImgUpload = multer({
   storage: multers3({
      s3: s3,
      bucket: process.env.BUCKET,
      acl: "public-read",
      contentDisposition: 'attachment; filename="filename.jpg"',
      key: function (req, file, cb) {
         cb(
            null,
            path.basename(file.originalname, path.extname(file.originalname)) +
               "-" +
               Date.now() +
               path.extname(file.originalname)
         );
      },
   }),
   limits: { fileSize: 2000000 }, // In bytes: 2000000 bytes = 2 MB
   // fileFilter: function (req, file, cb) {
   //    checkFileType(file, cb);
   // },
}).single("profileImage");

function checkFileType(file, cb) {
   // Allowed ext
   const filetypes = /jpeg|jpg|png|gif/;
   // Check ext
   const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
   );
   // Check mime
   const mimetype = filetypes.test(file.mimetype);
   if (mimetype && extname) {
      return cb(null, true);
   } else {
      cb("Error: Images Only!");
   }
}

exports.singleUpload = (req, res) => {
   profileImgUpload(req, res, (error) => {
      console.log(req.file);
      // console.log( 'error', error );
      if (error) {
         console.log("errors", error);
         res.json({ error: error });
      } else {
         // If File not found
         if (req.file === undefined) {
            console.log("Error: No File Selected!");
            res.json("Error: No File Selected");
         } else {
            // If Success
            const imageName = req.file.key;
            const imageLocation = req.file.location;
            // Save the file name into database into profile model
            res.json({
               image: imageName,
               location: imageLocation,
            });
         }
      }
   });
};
