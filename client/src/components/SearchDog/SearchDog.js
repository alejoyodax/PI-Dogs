import axios from "axios"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import lupa from "../../img/lupita.png"
import s from './SearchDog.module.css'


const BASE_URL = process.env.REACT_APP_API_URL;
const URL_SEARCH_DOGS = process.env.NODE_ENV === "production" ?
   BASE_URL + "/api/dogs/search?q=" : "http://localhost:3001/api/dogs/search?q="

export default function NavBar() {
   const [textInput, setTextInput] = useState("")
   const [dogsFound, setDogsFound] = useState([])
   const [isVisible, setIsVisible] = useState(false)  // MUESTRA LA CAJITA CON LOS RESULTADOS DE LOS DOGS ENCONTRADOS

   useEffect(() => {
      // CUANDO DE CLICK EN CUALQUIER PARTE, QUIERO CERRAR LA CAJITA CON LOS RESULTADOS DE LA BÚSQUEDA DE PAÍS POR NOMBRE
      document.getElementById("APP").addEventListener("click", () => setIsVisible(false))
      return () => {
         document.getElementById("APP").removeEventListener("click", () => setIsVisible(false))
      }
   })


   async function handleTextInput(e) {
      // console.log(e.target.value)
      setTextInput(e.target.value)
      if (e.target.value.length >= 3) {

         axios.get(URL_SEARCH_DOGS + e.target.value)
            .then(res => { //SI HAY RESPUESTA CON RESULTADOS
               setDogsFound([...res.data])
               setIsVisible(true)   // MOSTRAMOS LA CAJA CON LOS RESULTADOS
            })
            .catch(e => setIsVisible(false))
      } else {
         console.log("OCULTAR")
         setIsVisible(false)
      }

   }

   function RenderDogsFound() {
      // SOLO MOSTRAR MÁXIMO 7 RESULTADOS
      const dogsFoundToShow = dogsFound.length >= 7 ? dogsFound.slice(0, 7) : dogsFound
      return (
         <div style={ { visibility: isVisible ? "visible" : "hidden" } } className={ s.dogsFoundContainer }>
            {
               dogsFoundToShow.map((dog, index) => {
                  return (
                     <Link style={ { textDecoration: 'none' } } className={ s.dogRow }
                        to={ "/home/dog-detail/" + dog.id } key={ dog.nombre + index }>
                        <span>{ dog.id[0] === "A" ? "BD" : "API" }</span>
                        <span>{ dog.nombre }</span>
                     </Link>

                  )
               })
            }
         </div>
      )
   }


   return (
      <div className={ s.mainContainer }>
         <img height="20px" src={ lupa } alt="." />
         <input
            onClick={ () => dogsFound.length ? setIsVisible(true) : setIsVisible(false) }
            className={ s.searchInput }
            value={ textInput }
            onChange={ (e) => handleTextInput(e) }
         />

         <RenderDogsFound />
      </div>
   )
}