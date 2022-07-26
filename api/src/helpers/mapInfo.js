const dog = {
   "weight": {
      "imperial": "6 - 13",
      "metric": "3 - 6"
   },
   "height": {
      "imperial": "9 - 11.5",
      "metric": "23 - 29"
   },
   "id": 1,
   "name": "Affenpinscher",
   "bred_for": "Small rodent hunting, lapdog",
   "breed_group": "Toy",
   "life_span": "10 - 12 years",
   "temperament": "Stubborn, Curious, Playful, Adventurous, Active, Fun-loving",
   "origin": "Germany, France",
   "reference_image_id": "BJa4kxc4X",
   "image": {
      "id": "BJa4kxc4X",
      "width": 1600,
      "height": 1199,
      "url": "https://cdn2.thedogapi.com/images/BJa4kxc4X.jpg"
   }
}
function getUtilInfoFromDog(dog) {
   const altura = dog.height.metric.split(" - ")
   const peso = dog.weight.metric.split(" - ")
   return {
      nombre: dog.name,
      altura_min: altura[0],
      altura_max: altura[1],
      peso_min: peso[0],
      peso_max: peso[1],
      años_de_vida: dog.life_span.split(" ")[2],
      img_url: dog.image.url
   }
}
console.log(getUtilInfoFromDog(dog))