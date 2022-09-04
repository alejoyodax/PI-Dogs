const axios = require('axios')
const { Router } = require('express') // IMPORTAMOS EL ROUTER DE EXPRESS
const { createDogBreed,
   getDogsFromApi,
   searchDogsMatchedByName,
   getInfoBreedById
} = require("../controllers/dogControllers.js")
const customError = require('../helpers/customErrorCreator.js')

const dogRouter = Router() // CREAR UNA INSTANCIA DEL ROUTER DE EXPRESS



dogRouter.get("/", async (req, res, next) => {
   try {
      const dogsFromFound = await getDogsFromApi()
      res.status(200).send([...dogsFromFound])
   } catch (error) {
      next(error)
   }
})

dogRouter.get("/search", async (req, res, next) => {
   const { q } = req.query //    STRING A BUSCAR
   console.log(q)
   try {
      const dogsFound = await searchDogsMatchedByName(q)
      res.status(200).send([...dogsFound])

   } catch (error) {
      next(error)
   }
})

dogRouter.get("/:idRaza", async (req, res, next) => {

   //  ID DE INFORMACIÓN DE RAZA SOLICITADA
   console.log("RAZA SOLICITADA", idRaza)
   try {
      const breedInfo = await getInfoBreedById(idRaza)
      breedInfo ?
         res.status(200).send(breedInfo) :
         res.status(404).send("No hay ninguna coincidencia")

   } catch (error) {
      next(error)
   }
})

dogRouter.post("/", async (req, res, next) => {
   const dogToCreate = req.body
   // console.log(dogToCreate)
   try {
      const [id, nombre] = await createDogBreed(dogToCreate)
      res.status(200).send({ msg: `Se ha creado la raza \'${nombre}\' con el id \'${id}\'` })
   } catch (error) {
      next(error)
   }
})

module.exports = dogRouter; // EXPORTAMOS EL ROUTER CON NUESTRAS RUTAS