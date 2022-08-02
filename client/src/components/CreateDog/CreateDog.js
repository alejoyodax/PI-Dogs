import { useState } from "react"
import s from "./CreateDog.module.css"
// import fondo from "../../img/countries.png"
import axios from "axios"
import DogInfo from "./DogInfo"
import DogImg from "./DogImg"



const BASE_URL = process.env.REACT_APP_API_URL;
const URL_CREATE_DOG = process.env.NODE_ENV === "production" ?
   BASE_URL + "/api/dogs/" : "http://localhost:3001/api/dogs/"

export default function CreateDog() {
   const [isLoading, setIsLoading] = useState(false)
   const [errors, setErrors] = useState({ nombre: "* name is required" })
   const [input, setInput] = useState({ // DATOS DE ACTIVIDAD
      "nombre": "",
      "altura_min": 0,
      "altura_max": 0,
      "peso_min": 0,
      "peso_max": 0,
      "años_de_vida": 0,
      "img_url": "",
      "temperamentos": []
   });

   function validarDatos(input) {
      let errors = {}

      if (!input.nombre) {
         errors.nombre = "* the dogname is necessary"
      } else if (input.nombre.length > 20) {
         errors.nombre = "* toooooo loooong"
      } else if (!/[a-zA-Z]+/.test(input.nombre)) {
         errors.nombre = "* not valid"
      }


      // ALTURA #######################
      // ALTURA MAX
      if (!input.altura_max) {
         errors.altura_max = "* max value necessary"
      } else if (isNaN(parseInt(input.altura_max)) || input.altura_max < 1) {
         errors.altura_max = "max value must be greater than 0"
      }

      // ALTURA MIN
      if (!input.altura_min) {
         errors.altura_min = "* min value necessary"
      } else if (isNaN(parseInt(input.altura_min)) || input.altura_min < 1) {
         errors.altura_min = "min value must be a number"
      }

      // ALTURA MAX-MIN
      if (!isNaN(parseInt(input.altura_max)) && !isNaN(parseInt(input.altura_min))) {
         if (input.altura_min === input.altura_max) {
            errors.altura_max = "* min and max cannot be equal"
         } else if (input.altura_min > input.altura_max) {
            errors.altura_max = "* max cannot be lower than min"
         }
      }

      // PESO #######################
      if (!input.peso_max) {
         errors.peso_max = "* max value necessary"
      } else if (isNaN(parseInt(input.peso_max)) || input.peso_max < 1) {
         errors.peso_max = "max value must be greater than 0"
      }

      // PESO MIN
      if (!input.peso_min) {
         errors.peso_min = "* min value necessary"
      } else if (isNaN(parseInt(input.peso_min)) || input.peso_min < 1) {
         errors.peso_min = "min value must be a number"
      }

      // PESO MAX-MIN
      if (!isNaN(parseInt(input.peso_max)) && !isNaN(parseInt(input.peso_min))) {
         if (input.peso_min === input.peso_max) {
            errors.peso_max = "* min and max cannot be equal"
         } else if (input.peso_min > input.peso_max) {
            errors.peso_max = "* max cannot be lower than min"
         }
      }

      // LIFE SPAN #######################
      if (!input.años_de_vida) {
         errors.años_de_vida = "* value is invalid"
      } else if (isNaN(parseInt(input.años_de_vida))) {
         errors.años_de_vida = "* must be a number"
      } else if (input.años_de_vida <= 1) {
         errors.años_de_vida = "* must be greaten than 1"
      }

      if (!input.img_url) {
         errors.img_url = "* url is required"
      }

      return errors
   }


   async function handleCreateDog(e) {
      e.preventDefault()
      await axios.post(URL_CREATE_DOG, input).then(() => {
         console.log("DOG CREADO CON ÉXITO")
         alert("DOG BREED CEATED SUCCESSFULLY")
      })

         .catch((e) => {
            console.log("ERROR AL INTENTAR CREAR DOG", e)
            alert("THERE WAS AN ERROR TRYING TO CREATE THE DOG BREED " + e.response.data.error.message)
         })
   }

   function handleInputChange(e) {
      console.log(e.target.value)
      setErrors(validarDatos({
         ...input,
         [e.target.name]: e.target.value
      }))
      setInput({
         ...input,
         [e.target.name]: e.target.value
      })
   }

   function handleTemperamentosChange(temps) {
      setInput({
         ...input,
         temperamentos: [...temps]
      })

      // console.log(temps)
   }


   return (
      <form id="create-dog" className={ s.mainContainer }>
         <div className={ s.cardContainer }>
            <div className={ s.headerContainer }>
               <h2>CREATE YOUR OWN BREED!</h2>
            </div>

            <div className={ s.bodyContainer }>
               <DogInfo handleTemperamentosChange={ handleTemperamentosChange } errors={ errors } handleInputChange={ handleInputChange } />
               <DogImg errors={ errors } img_url={ input.img_url } handleInputChange={ handleInputChange } />
            </div>
            <input
               style={ { display: Object.keys(errors).length === 0 && input.temperamentos.length > 0 ? null : "none" } }
               onClick={ handleCreateDog }
               className={ s.submitButton }
               type="submit" value="CREATE BREED" />
         </div>

      </form>
   )
}

