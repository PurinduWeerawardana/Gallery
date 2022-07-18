const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");
const fs = require("fs");
const Gallery = require("express-photo-gallery");

app.use(express.static("public"));
app.use(express.static("images"));

app.set(`view engine`, `ejs`);

//define routes
app.get("/", function (req, res) {
  res.render("index");
});

app.get("/gallery", function (req, res) {
  res.render("gallery.ejs", { albums: listOfAlbums, thumbs: albumThumbs });
});

app.get("/timeline", function (req, res) {
  res.render("timeline.ejs");
});

app.get("/worldmap", function (req, res) {
  res.render("worldmap.ejs");
});

//define port
app.listen(port, function () {
  console.log(`Server is running on port //localhost:${port}`);
});

var optionsForGallery = { title: "Album View" };
const directoryPath = path.join(__dirname, "./images/Albums");
var example =
  "../Albums/Eiffel Tower/thumbs/istockphoto-1133449890-612x612.jpg";

const directoryPathForThumbs = path.join(directoryPath, "./images/Albums");
var listOfAlbums = fs.readdirSync(directoryPath);
console.log("Available albums are, \n" + listOfAlbums);
var albumThumbs = {};
listOfAlbums.forEach(function (file) {
  var pathToAlbum = `./images/Albums/${file}`;
  app.use(
    `/${file.replace(/\s/g, "")}`,
    Gallery(pathToAlbum, optionsForGallery)
  );
  var tempPathForThumbs = "images/Albums/" + file + "/thumbs/";
  const directoryPathForThumbs = path.join(__dirname, tempPathForThumbs);
  var listOfThumbs = fs.readdirSync(directoryPathForThumbs);
  albumThumbs[file] = listOfThumbs;
});
