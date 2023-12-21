const ImagesServices = require("../services/images.services");

class ImageControllers {
  static async getImage(req, res) {
    const { imageName } = req.params;

    try {
      const imageData = await ImagesServices.getImage(imageName);
      res.status(200).json({ imageData: imageData.toString("base64") });
    } catch (error) {
      console.error("Error al obtener la imagen:", error);

      if (error.code === "ENOENT") {
        res.status(404).json({ error: "La imagen solicitada no existe." });
      } else {
        res.status(500).json({ error: "Error interno del servidor." });
      }
    }
  }

  static async deleteImage(req, res) {
    const { imageName } = req.params;

    try {
      await ImagesServices.deleteImage(imageName);
      res.status(200).json("Imagen eliminada");
    } catch (error) {
      console.error("Error al obtener la imagen:", error);

      if (error.code === "ENOENT") {
        res.status(404).json({ error: "La imagen solicitada no existe." });
      } else {
        res.status(500).json({ error: "Error interno del servidor." });
      }
    }
  }

  static async getImages(req, res) {
    const { imagenes } = req.query;
    try {
      const productImages = await ImagesServices.getImages(imagenes);
      res.status(200).json({ images: productImages });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = ImageControllers;
