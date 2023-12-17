const express = require("express");
const imagesRouter = express.Router();
const fs = require("fs");
const path = require("path");

imagesRouter.get("/:imageName", (req, res) => {
  const imageName = req.params.imageName;
  const imagePath = path.join(__dirname, "..", "public", "images", imageName);

  const imageData = fs.readFileSync(imagePath);

  res.status(200).json({ imageData: imageData.toString("base64") });
});

imagesRouter.get("/", (req, res) => {
  const imagesPath = path.join(__dirname, "..", "public", "images");
  const { imagenes } = req.query;
  let arrayImagenesQuery = [];
  if (imagenes) {
    arrayImagenesQuery = imagenes.split(",");
  }

  // Lee el contenido del directorio de imágenes
  fs.readdir(imagesPath, (err, files) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error al leer el directorio de imágenes");
    }

    // Filtra solo los archivos de imagen (puedes ajustar según los tipos de archivos que estás manejando)
    const imageFiles = files.filter((file) =>
      /\.(jpg|jpeg|png|gif)$/i.test(file)
    );

    const array = [];
    if (arrayImagenesQuery.length > 0) {
      for (let i = 0; i < imageFiles.length; i++) {
        for (let j = 0; j < arrayImagenesQuery.length; j++) {
          if (arrayImagenesQuery[j] === imageFiles[i]) {
            array.push(arrayImagenesQuery[j]);
          }
        }
      }
    }

    const arrayImagenes = array.length > 0 ? array : imageFiles;

    // Construye un array de objetos con datos binarios de las imágenes
    const imagesData = arrayImagenes.map((file) => {
      const imagePath = path.join(imagesPath, file);
      const imageData = fs.readFileSync(imagePath);
      return { name: file, data: imageData.toString("base64") };
    });

    // Envía el array de objetos de imágenes como respuesta
    res.json({ images: imagesData });
  });
});

module.exports = imagesRouter;
