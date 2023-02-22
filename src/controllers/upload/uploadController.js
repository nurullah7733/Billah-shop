const fs = require("fs");
const sharp = require("sharp");
const {
  uploadMultipleImages,
  deleteCloudinaryImg,
} = require("../../utils/cloudinary");

exports.uploadImages = async (req, res) => {
  try {
    let cloudinaryUploadedImgUrl;
    const urls = [];
    const files = req.files;
    for (const file of files) {
      const { path } = file;
      urls.push(path);
    }
    // console.log(urls);

    cloudinaryUploadedImgUrl = await uploadMultipleImages(urls);

    urls.map((item) => {
      fs.unlinkSync(item);
    });

    res.status(200).json({ status: "success", data: cloudinaryUploadedImgUrl });
  } catch (error) {
    res.status(400).json({ status: "fail", data: error.toString() });
  }
};

exports.deleteImages = async (req, res) => {
  const id = req.params.id;
  try {
    const deleted = await deleteCloudinaryImg(id);
    res.status(200).json({ status: "success", data: deleted });
  } catch (error) {
    res.status(400).json({ status: "fail", data: error.toString() });
  }
};
