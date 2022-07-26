
// FUNCION GENERADORA DE UN OBJETO ERROR PERSONALIZADO
module.exports = function customErrorCreator(message, status) {
   let err = new Error(message)
   err.status = status || 500
   return err
}

