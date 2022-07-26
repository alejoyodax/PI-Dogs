const { Router } = require('express') // IMPORTAMOS EL ROUTER DE EXPRESS
const temperRouter = Router() // CREAR UNA INSTANCIA DEL ROUTER DE EXPRESS
const customError = require('../helpers/customErrorCreator.js') // FUNCION QUE CREA UN ERROR PERSONALIZADO
const { getAllTempers } = require("../controllers/temperController.js")

temperRouter.get("/", async (req, res, next) => {
   // console.log("recibida tempers")
   try {
      const tempers = await getAllTempers()
      res.status(200).send([...tempers])
   } catch (error) {
      next(error)
   }
})

module.exports = temperRouter; // EXPORTAMOS EL ROUTER CON NUESTRAS RUTAS