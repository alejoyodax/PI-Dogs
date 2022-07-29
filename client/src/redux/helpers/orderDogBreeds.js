





export default function orderDogBreeds({ order, dogBreeds }) {
   console.log("ORDER DOGS by:", order)
   const orderedDogs = [...dogBreeds]
   // ORDENAR POR PESO
   if (order === "DES" || order === "ASC") {
      orderedDogs.sort((a, b) => {
         if (a.peso_max < b.peso_max) {
            return order === "ASC" ? 1 : -1
         }
         if (a.peso_max > b.peso_max) {
            return order === "DES" ? 1 : -1
         }
         return 0
      })
   }

   // ORDENAR POR NOMBRE
   if (order === "AZ" || order === "ZA") {
      orderedDogs.sort((a, b) => {
         if (a.nombre.toLowerCase() > b.nombre.toLowerCase()) {
            return order === "AZ" ? 1 : -1
         }
         if (a.nombre.toLowerCase() < b.nombre.toLowerCase()) {
            return order === "ZA" ? 1 : -1
         }
         return 0
      })
   }

   orderedDogs.forEach(dog => console.log(dog.peso_max))

   return [...orderedDogs]
}