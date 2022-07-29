function filterBySource(source, dog) {
   if (source === "All") return true
   if (source === "API") {
      // PREGUNTAR EL ORIGEN DEL DOG
      if (!dog.isFromBD) return true
      return false
   }
   if (source === "BD") {
      if (dog.isFromBD) return true
      return false
   }
   return false
}

function filterByTemperament(temp, dog) {
   if (temp === "All") return true
   if (dog.temperamentos && dog.temperamentos.includes(`${temp}`)) return true
   return false
}

export default function filterDogBreeds({ source, temp, dogBreeds }) {
   // console.log("HELPER FILTER DOGS:", source, temp, dogBreeds.length)
   if (source === "All" && temp === "All") return dogBreeds

   let filteredDogs = dogBreeds.filter((dog) => {
      if (filterBySource(source, dog) &&
         filterByTemperament(temp, dog)) {
         return true
      } else { return false }
   })

   // console.log(filteredDogs)
   return [...filteredDogs]

}