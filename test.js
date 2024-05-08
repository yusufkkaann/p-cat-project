const mongoose = require("mongoose");
const Schema = mongoose.Schema;

async function main() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/pcat-test-db");
    console.log("Connected to MongoDB");

    const photoSchema = new mongoose.Schema({
      title: String,
      description: String,
    });

    const Photo = mongoose.model("Photo", photoSchema);

    // Yeni bir fotoğraf belgesi oluştur
    // const photo = new Photo({
    //   title: "photo title 1",
    //   description: "photo description 1",
    // });
    // const photo2 = new Photo({
    //   title: "photo title 2",
    //   description: "photo description 2",
    // });

    // // Fotoğrafı kaydet ve kaydetme işlemi tamamlanana kadar beklet
    // await photo.save();
    // await photo2.save();

    //console.log("Photo saved successfully");
    //veritabanındaki tüm fotoğrafları oku
    const photos = await Photo.find();
    console.log(photos);
    //---------------------
    // update işlemi
    // await Photo.findByIdAndUpdate("663a35e4a9806bb1ea694437", {
    //   title: "updated title",
    //   description: "updated description",
    // });
    // console.log("Photo updated successfully");
    await Photo.findByIdAndDelete("663a35e4a9806bb1ea694437");
    console.log("Photo deleted successfully");

    // MongoDB bağlantısını kapat
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

main();
