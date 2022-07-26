const axios = require("axios")
const { Temper } = require("../db.js")

module.exports = async function loadTemperamentsOnBD() {
   const dataFromAPi = await axios.get("https://api.thedogapi.com/v1/breeds")
   let temperamentsList = []
   dataFromAPi.data.forEach(dog => {
      if (dog.temperament) {
         let dogTempsList = dog.temperament.split(", ")
         temperamentsList = [...new Set([...temperamentsList, ...dogTempsList])]
      }
   })
   temperamentsList.forEach(async (temp) => {
      await Temper.create({
         nombre: temp
      })
   })
}