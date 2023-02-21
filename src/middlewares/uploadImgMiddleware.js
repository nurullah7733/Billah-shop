const multer = require("multer");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");
const { Readable } = require("stream");

// const storage = multer.memoryStorage();
// exports.upload = multer({ storage });

// exports.bufferToStream = (buffer) => {
//   const readable = new Readable({
//     read() {
//       this.push(buffer);
//       this.push(null);
//     },
//   });
//   return readable;
// };

// const data = await sharp(req.file.buffer).webp({ quality: 20 }).toBuffer();
// const stream = cloudinary.uploader.upload_stream(
//   { folder: "DEV" },
//   (error, result) => {
//     if (error) return console.error(error);
//     return res.json({ URL: result.secure_url });
//   }
// );
// bufferToStream(data).pipe(stream);

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.join(__dirname, "../public/images"));
//   },
//   filename: function (req, file, cb) {
//     const uniquesuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, file.fieldname + "-" + uniquesuffix + ".jpeg");
//   },
// });

// const multerFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith("image")) {
//     cb(null, true);
//   } else {
//     cb({ message: "Unsupported file format" }, false);
//   }
// };

// exports.uploadPhoto = multer({
//   storage: storage,
//   fileFilter: multerFilter,
//   limits: { fileSize: 1000000 },
// });
// sharp.cache(false);
// exports.productImgResize = async (req, res, next) => {
//   if (!req.files) return next();
//   req.files.map(async (file) => {
//     try {
//       await sharp(file.path)
//         .resize(300, 300)
//         .toFormat("jpeg")
//         .jpeg({ quality: 90 })
//         .toFile(`${__dirname}/../public/images/products/${file.filename}`);
//       // fs.unlinkSync(`../public/images/${file.filename}`);
//     } catch (error) {
//       console.log(error);
//     }
//   });

//   next();
// };
