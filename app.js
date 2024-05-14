const express = require("express");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const methodOverride = require("method-override");
const path = require("path"); // path modülü şu işe yarar dosya yollarını düzenlemek için kullanılır
const fs = require("fs"); // fs modülü şu işe yarar dosya işlemleri yapmak için kullanılır
const enj = require("ejs"); // ejs modülü şu işe yarar html dosyalarını düzenlemek için kullanılır
const photoControllers = require("./controllers/photoControllers");
const pageControllers = require("./controllers/pageControllers");

const Photo = require("./models/Photo");

const app = express();
mongoose.connect("mongodb://127.0.0.1:27017/pcat-test-db");
console.log("Connected to MongoDB");
const port = 3000;

//middleware dosyası
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true })); //formdan gelen verileri almak için
app.use(express.json()); //json verileri almak için
app.use(fileUpload());
app.use(methodOverride("_method", { methods: ["POST", "GET"] })); //formdan gelen verileri almak için

//ROUTE İŞLEMLERİ
app.get("/", photoControllers.gelAllPhotos);
app.get("/about", pageControllers.getAboutPage);
app.get("/contact", pageControllers.getContactPage);
app.get("/photos/:id", pageControllers.getOnePhoto);
app.post("/photos", photoControllers.createPhoto);

app.get("/photos/edit/:id", async (req, res) => {
  const photo = await Photo.findById(req.params.id);
  res.render("edit.ejs", { photo });
});

app.put("/photos/:id", photoControllers.updatePhoto);
app.delete("/photos/:id", photoControllers.deletePhoto);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
