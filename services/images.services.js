const fs = require("fs");
const path = require("path");
const util = require('util');
const unlinkAsync = util.promisify(fs.unlink);
const readdirAsync = util.promisify(fs.readdir);
const readFileAsync = util.promisify(fs.readFile);

class ImagesServices {
  static async getImage(imageName) {
    try {
      const imagePath = path.join(
        __dirname,
        "..",
        "public",
        "images",
        imageName
      );

      const imageData = fs.readFileSync(imagePath);

      return imageData;
    } catch (error) {
      throw error; // Re-lanzar el error para que sea manejado por el controlador
    }
  }

  static async deleteImage(imageName) {
    try {
      const imagePath = path.join(__dirname, '..', 'public', 'images', imageName);
      await unlinkAsync(imagePath);
      console.log(`${imagePath} ha sido eliminado exitosamente.`);
    } catch (error) {
     
      throw error
    }
  }

  static async getImages(imagenes) {
    try {
      const imagesPath = path.join(__dirname, '..', 'public', 'images');
      let arrayImagenesQuery = [];

      if (imagenes) {
        arrayImagenesQuery = imagenes.split(',');
      }

      // Utiliza readdirAsync para leer el directorio de imágenes de manera asíncrona
      const files = await readdirAsync(imagesPath);

      // Filtra solo los archivos de imagen (puedes ajustar según los tipos de archivos que estás manejando)
      const imageFiles = files.filter((file) => /\.(jpg|jpeg|png|gif)$/i.test(file));

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

      // Utiliza Promise.all para ejecutar readFileAsync de manera concurrente
      const imagesData = await Promise.all(
        arrayImagenes.map(async (file) => {
          const imagePath = path.join(imagesPath, file);
          const imageData = await readFileAsync(imagePath);
          return { name: file, data: imageData.toString('base64') };
        })
      );

      // Retorna el array de objetos de imágenes
      return imagesData;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ImagesServices;
