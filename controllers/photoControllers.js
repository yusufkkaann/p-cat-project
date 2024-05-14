const Photo = require("../models/Photo");
const fs = require("fs");
const path = require("path");

exports.gelAllPhotos = async (req, res) => {
  // Bu nedenle, path.resolve() işlevi, dosya yolunu belirtmek için kullanılmaktadır.
  //res.sendFile(path.resolve(__dirname, "temp/index.html"));
  const photos = await Photo.find({}).sort("-createdAt");
  res.render("index.ejs", { photos });
};

exports.createPhoto = (req, res) => {
  //console.log(req.body);
  // console.log(req.files.image);
  //await Photo.create(req.body);
  //res.redirect("/");
  const uploadDir = "public/uploads";
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  let uploadImage = req.files.image;
  let uploadPath = path.join(__dirname, "../public/uploads/", uploadImage.name);

  uploadImage.mv(uploadPath, async () => {
    await Photo.create({
      ...req.body,
      image: "../uploads/" + uploadImage.name,
    });
    res.redirect("/");
  });
};

exports.updatePhoto = async (req, res) => {
  const photo = await Photo.findById(req.params.id);
  photo.title = req.body.title;
  photo.description = req.body.description;
  photo.save();
  res.redirect(`/photos/${req.params.id}`);
};

exports.deletePhoto = async (req, res) => {
  const photo = await Photo.findById(req.params.id);
  let deletedImage = path.join(__dirname, "../public/uploads", photo.image);
  fs.unlinkSync(deletedImage);
  await Photo.findByIdAndDelete(req.params.id);
  res.redirect("/");
};
