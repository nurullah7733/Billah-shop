const multer = require("multer");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");
const { Readable } = require("stream");
const cloudinary = require("cloudinary").v2;
var toArray = require("stream-to-array");
cloudinary.config({
  cloud_name: process.env.CLOUNDINARY_NAME,
  api_key: process.env.CLOUNDINARY_API_KEY,
  api_secret: process.env.CLOUNDINARY_SECRET_KEY,
});

const storage = multer.memoryStorage();
exports.upload = multer({ storage });

// bufferToStream = (buffer) => {
//   const readable = new Readable({
//     read() {
//       this.push(buffer);
//       this.push(null);
//     },
//   });
//   return readable;
// };
toArray(stream).then(function (parts) {
  const buffers = parts.map((part) =>
    util.isBuffer(part) ? part : Buffer.from(part)
  );
  return Buffer.concat(buffers);
});

exports.uploadImgController = async (req, res) => {
  try {
    console.log(req.files[0].buffer);
    const data = await sharp(req.files[0].buffer)
      .resize(300, 300)
      .webp({ quality: 90 })
      .toBuffer();
    const stream = cloudinary.uploader.upload_stream(
      { folder: "DEV" },
      (error, result) => {
        if (error) return console.error(error);

        return res
          .status(200)
          .json({ status: "success", data: result.secure_url });
      }
    );
    bufferToStream(data).pipe(stream);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: "fail" });
  }
};

// exports.uploadImages = async (req, res) => {
//   try {
//     const urls = [];
//     const files = req.files;
//     for (const file of files) {
//       const { path } = file;
//       urls.push(path);
//     }

//     // let cloudinaryUploadedImgUrl = await uploadMultipleImages(urls);

//     // urls.map((item) => {
//     //   fs.unlinkSync(item);
//     // });

//     res
//       .status(200)
//       .json({ status: "success", data: "cloudinaryUploadedImgUrl" });
//   } catch (error) {
//     res.status(400).json({ status: "fail", data: error.toString() });
//   }
// };

exports.deleteImages = async (req, res) => {
  const id = req.params.id;
  try {
    const deleted = await deleteCloudinaryImg(id);
    res.status(200).json({ status: "success", data: deleted });
  } catch (error) {
    res.status(400).json({ status: "fail", data: error.toString() });
  }
};
