const customError = require("../helpers/customErrorCreator.js")
// const validateDataOfNewDog = require("../helpers/validateDataOfNewDog.js")
const axios = require("axios")
const { Dog } = require("../db.js") // DB EXPORTA LOS MODELOS
const { Op } = require("sequelize");
const { Temper } = require("../db.js");

const BASE_URL_API_DOGS = "https://api.thedogapi.com/v1/breeds"

function getUtilInfoFromDog(dog) {
   const altura = dog.height.metric.split(" - ")
   const peso = dog.weight.metric.split(" - ")
   const años = dog.life_span.split(" ")
   // console.log(años)
   return {
      id: dog.id,
      nombre: dog.name,
      altura_min: altura[0],
      altura_max: altura[1],
      peso_min: peso[0],
      peso_max: peso[1],
      años_de_vida: años[2],
      img_url: dog.image.url,
      temperamentos: dog.temperament && [...dog.temperament.split(", ")]
   }
}

// ########################################################

async function createDogBreed(dogToCreate) {
   // VALIDAR LA DATA
   (function validateDataOfNewDog() {
      const EXAMPLE_DOG = {
         "nombre": "Alejoyodax raza",
         "altura_min": 34,
         "altura_max": 78,
         "peso_min": 24,
         "peso_max": 34,
         "años_de_vida": 16,
         "img_url": "akdjsf4ioiu"
      }
      for (let prop in EXAMPLE_DOG) {
         if (typeof (dogToCreate[prop]) !== typeof (EXAMPLE_DOG[prop])) {
            throw customError(`Error en la propiedad: [${prop}]. El tipo de dato debe ser: [${typeof (EXAMPLE_DOG[prop])}]. Recibido: ${[typeof (dogToCreate[prop])]}`, 400)
         }
      }
   })()

   // VERIFICAR SI YA EXISTE
   const dogFound = await Dog.findOne(
      {
         where: {
            nombre: dogToCreate.nombre
         }
      })
   if (dogFound) {
      console.log("ID PERRO CREADO", dogFound.id)
      throw customError(`Ya existe una raza con el nombre \'${dogToCreate.nombre}\' en la base de datos`)
   }
   const newDog = await Dog.create({
      ...dogToCreate,
      nombre: dogToCreate.nombre.toLowerCase()
   })

   for (let i = 0; i < dogToCreate.temperamentos.length; i++) {
      await newDog.addTempers(dogToCreate.temperamentos[i])
   }
   return [newDog.id, newDog.nombre]
}

async function getDogsFromApi() {
   // TRAER A LOS DOGS DE LA API DOGS
   const { data } = await axios.get("https://api.thedogapi.com/v1/breeds").catch(e => {
      throw customError("Sucedio un error al intentar comunicarse a la API de DOGS")
   })
   let dogsWithUtilInfoFromApi = []
   data.forEach(dog => {
      const dogWithUtilInfo = getUtilInfoFromDog(dog) // EXTRAER LA DATA QUE YO QUIERO (DE CADA DOG)
      dogsWithUtilInfoFromApi.push(dogWithUtilInfo)
   })
   const rawDogsFromBD = await Dog.findAll({ // TRAER LOS DOGS DE LA BD
      include: Temper
   });
   // POR CADA OBJETO TEMPERAMENTO
   for (let i = 0; i < rawDogsFromBD.length; i++) {
      rawDogsFromBD[i] = rawDogsFromBD[i].nombre   // SOLO QUIERO LOS NOMBRES DE LOS TEMPERAMENTOS
   }

   return [...rawDogsFromBD, ...dogsWithUtilInfoFromApi]
}

async function searchDogsMatchedByName(stringToSearch) {
   if (typeof (stringToSearch) !== "string") throw customError(`El parámetro de búsqueda no es válido. Debe ser un \'string\'. Recibido \'${typeof (stringToSearch)}`)
   let dogsFoundApi = []
   let dogsFoundBD = []

   // BUSCAR COINCIDENCIAS EN LA API
   const matchedDogsFromApi = (await axios.get("https://api.thedogapi.com/v1/breeds/search?q=" + stringToSearch.toLowerCase())).data

   // BUSCAR COINCIDENCIAS EN LA BD
   const matchedDogsFromBD = await Dog.findAll({
      where: {
         nombre: {
            [Op.substring]: `%${stringToSearch.toLowerCase()}%`
         }
      },
      // raw: true
   })
   console.log("ENCONTRADOS EN BD: ", matchedDogsFromBD.length)
   console.log("ENCONTRADOS EN BD: ", matchedDogsFromApi.length)

   // SI NO SE ENCUENTRA NINGUNA COOINCIDENCIA EN LA API Y BD
   if (matchedDogsFromApi.length === 0 && matchedDogsFromBD.length === 0) throw customError("No hay ninguna coincidencia", 404)

   // MAPEAR INFO NECESARIA BD
   matchedDogsFromBD.length && matchedDogsFromBD.forEach(dog => {
      dogsFoundBD.push({
         id: dog.id,
         nombre: dog.nombre
      })
   })
   // MAPEAR INFO NECESARIA API
   matchedDogsFromApi.length && matchedDogsFromApi.forEach(dog => {
      dogsFoundApi.push({
         id: dog.id,
         nombre: dog.name
      })
   })

   return [...dogsFoundBD, ...dogsFoundApi]
}

async function getInfoBreedById(idBreed) {
   const itIsNotExistError = customError("El id solicitado no existe", 404)
   let dogFound
   // SI EL ID ES DE LA BD
   if (idBreed[0] === "A" || idBreed[0] === "a") {
      console.log("ID DE BASE DE DATOS")
      const dogQuery = await Dog.findByPk(idBreed.slice(1))
      if (!dogQuery) throw itIsNotExistError
      dogFound = {
         ...dogQuery.dataValues,
         id: dogQuery.id
      }

   } else {// SI EL ID ES DE LA API
      console.log("ID DE API")
      const dogsFromApi = (await axios.get("https://api.thedogapi.com/v1/breeds", {
         headers: {
            'x-api-key': process.env.API_KEY_DOGS
         }
      })).data

      for (let i = 0; i < dogsFromApi.length; i++) {
         if (dogsFromApi[i].id == idBreed) {
            dogFound = getUtilInfoFromDog(dogsFromApi[i])
            // console.log("DOG ENCONTRADO N°:", idBreed)
            break
         }
      }
      if (!dogFound) throw itIsNotExistError
   }

   console.log(dogFound)
   return dogFound
}

module.exports = {
   createDogBreed,
   getDogsFromApi,
   searchDogsMatchedByName,
   getInfoBreedById
}