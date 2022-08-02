import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import axios from "axios"
import s from "./DogDetail.module.css"
// import fondo from "../../img/countries.png"
// import CountryActivities from "../CountryActivities/CountryActivities";

const BASE_URL = process.env.REACT_APP_API_URL;
const URL_DOG_DETAIL = process.env.NODE_ENV === "production" ?
   BASE_URL + "/api/dogs/" : "http://localhost:3001/api/dogs/"

export default function DogDetail() {
   const { dogId } = useParams()
   const [isLoading, setIsloading] = useState(true)
   const [dogInfo, setDogInfo] = useState({})
   const [error, setError] = useState(false)

   useEffect(() => {
      // console.log("FETCHING DOG INFO...")
      axios(URL_DOG_DETAIL + dogId)
         .then((response) => {
            setDogInfo(response.data)
            setIsloading(false)
            // console.log(response.data)
         }).catch(() => {
            setError(true)
         })

   }, [dogId]
   )

   function RenderCard() {
      return (
         <div className={ s.cardContainer }>
            <div className={ s.headerContainer }>
               <h1>{ dogInfo.nombre.toUpperCase() }</h1>
            </div>

            <div className={ s.bodyContainer }>
               <div className={ s.imgContainer }>
                  <img height={ "80%" } alt={ dogId.name + ".png" } src={ dogInfo.img_url } />
               </div >

               <div className={ s.infoContainer }>
                  <div className={ s.row }>
                     <label>Life span</label>
                     {
                        dogInfo.años_de_vida ?
                           <span>{ `${dogInfo.años_de_vida} years` }</span> :
                           <span>{ "No life span avalaible" }</span>
                     }
                  </div>

                  <div className={ s.row }>
                     <label>Weight</label>
                     <span>{ `${dogInfo.peso_min} to ${dogInfo.peso_max} kg` }</span>
                  </div>

                  <div className={ s.row }>
                     <label>Height</label>
                     <span>{ `${dogInfo.altura_min} to ${dogInfo.altura_max} cm` }</span>
                  </div>
                  <div className={ s.rowTemps }>
                     <label>Temperaments</label>
                     <div className={ s.tempsContainer }>
                        {
                           dogInfo.temperamentos.map(temp => <span key={ temp + dogInfo.nombre }>{ temp }</span>)
                        }
                     </div>
                  </div>
               </div>
            </div>
         </div >)
   }

   function IsLoading() {
      return isLoading === true && error === true ?
         <h1>Oops... ha ocurrido un error al solicitar la información</h1> :
         <h1>Cargando...</h1>
   }

   return (
      <div className={ s.mainContainer }>
         {/* <div className={ s.fondo }>
            <img alt="fondo" src={ fondo }></img>
         </div> */}
         {
            isLoading ?
               <IsLoading /> :
               <RenderCard />
         }
      </div>
   )
}