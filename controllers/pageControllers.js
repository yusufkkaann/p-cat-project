const Photo = require("../models/Photo");
exports.getOnePhoto = async (req, res) => {
  const photo = await Photo.findById(req.params.id);
  res.render("photo.ejs", { photo });
};

exports.getContactPage = (req, res) => {
  // Bu nedenle, path.resolve() işlevi, dosya yolunu belirtmek için kullanılmaktadır.
  //res.sendFile(path.resolve(__dirname, "temp/index.html"));
  res.render("contact.ejs");
};

exports.getAboutPage = (req, res) => {
  // Bu nedenle, path.resolve() işlevi, dosya yolunu belirtmek için kullanılmaktadır.
  //res.sendFile(path.resolve(__dirname, "temp/index.html"));
  res.render("about.ejs");
};
