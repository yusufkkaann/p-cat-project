const express = require("express");
const mongoose = require("mongoose");
const path = require("path"); // path modülü şu işe yarar dosya yollarını düzenlemek için kullanılır
const enj = require("ejs"); // ejs modülü şu işe yarar html dosyalarını düzenlemek için kullanılır

const Photo = require("./models/Photo");

const app = express();
mongoose.connect("mongodb://127.0.0.1:27017/pcat-test-db");
console.log("Connected to MongoDB");
const port = 3000;

//middleware dosyası
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true })); //formdan gelen verileri almak için
app.use(express.json()); //json verileri almak için

app.get("/", async (req, res) => {
  // Bu nedenle, path.resolve() işlevi, dosya yolunu belirtmek için kullanılmaktadır.
  //res.sendFile(path.resolve(__dirname, "temp/index.html"));
  const photos = await Photo.find({});
  res.render("index.ejs", { photos });
});
app.get("/about", (req, res) => {
  // Bu nedenle, path.resolve() işlevi, dosya yolunu belirtmek için kullanılmaktadır.
  //res.sendFile(path.resolve(__dirname, "temp/index.html"));
  res.render("about.ejs");
});
app.get("/contact", (req, res) => {
  // Bu nedenle, path.resolve() işlevi, dosya yolunu belirtmek için kullanılmaktadır.
  //res.sendFile(path.resolve(__dirname, "temp/index.html"));
  res.render("contact.ejs");
});
app.post("/photos", async (req, res) => {
  //console.log(req.body);
  await Photo.create(req.body);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
