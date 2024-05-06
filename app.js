const express = require("express");
const path = require("path"); // path modülü şu işe yarar dosya yollarını düzenlemek için kullanılır
const enj = require("ejs"); // ejs modülü şu işe yarar html dosyalarını düzenlemek için kullanılır
const app = express();
const port = 3000;

//middleware dosyası
app.use(express.static("public"));

app.get("/", (req, res) => {
  // Bu nedenle, path.resolve() işlevi, dosya yolunu belirtmek için kullanılmaktadır.
  //res.sendFile(path.resolve(__dirname, "temp/index.html"));
  res.render("index.ejs");
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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
