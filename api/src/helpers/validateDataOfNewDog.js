module.exports = function validateDataOfNewDog(dogToCreate) {
   const EXAMPLE_DOG = {
      "nombre": "Alejoyodax raza",
      "altura": "23-34",
      "peso": "06-09",
      "años_de_vida": "10-16",
      "img_id": "akdjsf4ioiu"
   }
   for (let prop in EXAMPLE_DOG) {
      if (typeof (dogToCreate[prop]) !== typeof (EXAMPLE_DOG[prop])) {
         // console.log("ERROR EN LA PROPIEDAD:", prop)
         return false
      }
   }
   return true
}