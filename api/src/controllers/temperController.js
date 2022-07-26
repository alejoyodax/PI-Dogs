const customError = require("../helpers/customErrorCreator.js")
const axios = require("axios")
const { Temper } = require("../db.js") // DB EXPORTA LOS MODELOS

async function getAllTempers() {
   async function loadTemperamentsOnBD() {
      let temperamentsList = [];
      // TRAER DESDE LA API
      const dataFromAPi = await axios.get("https://api.thedogapi.com/v1/breeds", {
         headers: {
            'x-api-key': process.env.API_KEY_DOGS
         }
      })
      // 
      dataFromAPi.data.forEach(dog => {
         if (dog.temperament) {
            let dogTempsList = dog.temperament.split(", ")
            temperamentsList = [...temperamentsList, ...dogTempsList]
         }
      })
      // ELIMINAR LOS DUPLICADOS
      temperamentsList = [...new Set(temperamentsList)]

      let createdInstances = [];

      for (let i = 0; i < temperamentsList.length; i++) {
         const newTemp = await Temper.create({
            nombre: temperamentsList[i],
         })
         createdInstances.push(newTemp.dataValues)
      }
      console.log(`Se crearon \'${temperamentsList.length}\' temperamentos:`, createdInstances.length)
      return [...createdInstances]
   }
   let allTempers = await Temper.findAll({ raw: true })
   if (allTempers.length === 0) {   // SI NO EXISTEN, SE CREAN EN LA BD
      console.log("No existe ningún temperamento en BD")
      allTempers = await loadTemperamentsOnBD() // CARGO TODOS LOS TEMPERAMENTOS DE LA API EN LA BD, Y ME LOS RETORNA
   }
   return [...allTempers]
}

module.exports = {
   getAllTempers
}
