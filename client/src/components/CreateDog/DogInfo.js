import { useState, useEffect, useRef } from "react"
import { useSelector } from "react-redux"

import s from "./DogInfo.module.css"

export default function DogInfo({ handleInputChange, errors, handleTemperamentosChange }) {
   const temps = useSelector(state => state.temperaments)
   const [selectedTemps, setSelectedTemps] = useState([])
   const [matchedTemps, setMatchedTemps] = useState([])
   const [isVisible, setIsVisible] = useState(false)
   const refSelectedDogs = useRef()

   function detectIfBoxWasClicked(e) {
      // console.log(e.target)
      // console.log("ID ACTUAL:", refSelectedDogs.current.id)
      // console.log(e.target.parentNode.parentElement.id)
      // console.log(refSelectedDogs)
      // e.target.parentNode.parentElement.id === refSelectedDogs.current.id
      if (!document.getElementById("boxFoundTemps")) return
      if (document.getElementById("boxFoundTemps").contains(e.target)) {
         console.log("CLICK ADENTRO!!")
         setIsVisible(false)
      } else {
         console.log("CLICK AFUERA!!")
         if (e.target.id !== "inputFindTemps") setIsVisible(false)
      }

      // setIsVisible(false)
   }
   useEffect(() => {
      // CUANDO DE CLICK EN CUALQUIER PARTE, QUIERO CERRAR LA CAJITA CON LOS RESULTADOS DE LA BÚSQUEDA DE BREEDS
      window.addEventListener("click", detectIfBoxWasClicked)
      return () => {
         window.removeEventListener("click", detectIfBoxWasClicked)
      }
   }, [])

   function handleSearchTemp(e) {
      if (e.target.value === "") {
         setIsVisible(false)
         return
      }
      // console.log(e.target.value)
      const toSearch = e.target.value.toLowerCase()
      const matchedNames = []

      // console.log(temps)
      for (let i = 0; i < temps.length; i++) {
         if (temps[i].nombre.toLowerCase().includes(toSearch)) matchedNames.push(temps[i])
      }
      // console.log(matchedNames)
      setMatchedTemps([...matchedNames])
      matchedNames.length > 0 ?
         setIsVisible(true) :
         setIsVisible(false)
   }

   function addSelectedTemp(temp) {
      console.log(temp)
      for (let i = 0; i < selectedTemps.length; i++) {
         if (selectedTemps[i].nombre === temp.nombre) return
      }
      setSelectedTemps([...selectedTemps, temp])
      // setIsVisible(false)

      const tempsToForm = [
         ...selectedTemps.map(t => t.id),
         temp.id
      ]
      handleTemperamentosChange(tempsToForm)
   }

   function deleteSelectedTemp(temp) {
      console.log("delete:", temp)
      let indexToDelete
      let aux = [...selectedTemps]

      for (let i = 0; i < aux.length; i++) {
         if (aux[i].nombre === temp.nombre) indexToDelete = i
      }
      console.log(aux)
      aux.splice(indexToDelete, 1)
      console.log(aux)
      setSelectedTemps([...aux])
      console.log("ELEMENTO A ELIMINAR:", indexToDelete)

      const tempsToForm = [...aux.map(t => t.id)]
      handleTemperamentosChange(tempsToForm)
   }

   function RenderMatchedTemps() {
      // SOLO MOSTRAR MÁXIMO 5 RESULTADOS
      const matchedTempsToShow = matchedTemps.length >= 5 ? matchedTemps.slice(0, 5) : matchedTemps
      return (
         <div id="boxFoundTemps" ref={ refSelectedDogs } style={ { visibility: isVisible ? "visible" : "hidden" } } className={ s.tempsFoundContainer }>
            {
               matchedTempsToShow.map((temp, index) => {
                  return (
                     <div
                        style={ { cursor: "pointer" } }
                        className={ s.tempRow }
                        onClick={ () => addSelectedTemp(temp) }
                        key={ temp.nombre + index }>
                        <span>{ temp.nombre }</span>
                     </div>
                  )
               })
            }
         </div>
      )
   }

   function SpanError({ text }) {

      return (
         <label className={ s.spanError }>{ text }</label>
      )
   }


   return (
      <div className={ s.infoContainer }>
         <div className={ s.rowContainer }>
            <div style={ { width: "30%" } } className={ s.rowLabel }>
               <span >Name</span>
            </div>
            <div className={ s.rowInputName }>
               <input
                  onChange={ (e) => handleInputChange(e) }
                  name="nombre" placeholder="breed name">
               </input>
               {
                  errors.nombre && <SpanError text={ errors.nombre } />
               }
            </div>
         </div>

         <div className={ s.rowContainer }>
            <div style={ { width: "30%" } } className={ s.rowLabel }>
               <span >Height</span>
            </div>
            <div className={ s.rowInputsHeight }>
               <input type="number" onChange={ (e) => handleInputChange(e) } name="altura_min" placeholder="min"></input>
               <input type="number" onChange={ (e) => handleInputChange(e) } name="altura_max" placeholder="max"></input>
               <span>cm</span>
               {
                  <SpanError text={ errors.altura_max || errors.altura_min } />
               }
            </div>
         </div>

         <div className={ s.rowContainer }>
            <div style={ { width: "30%" } } className={ s.rowLabel }>
               <span >Weight</span>
            </div>
            <div style={ { width: "65%" } } className={ s.rowInputsHeight }>
               <input type="number" onChange={ (e) => handleInputChange(e) } name="peso_min" placeholder="min"></input>
               <input type="number" onChange={ (e) => handleInputChange(e) } name="peso_max" placeholder="max"></input>
               <span>kg</span>
               {
                  <SpanError text={ errors.peso_min || errors.peso_max } />
               }
            </div>
         </div>

         <div className={ s.rowContainer }>
            <div className={ s.rowLabel }>
               <span >Max life span</span>
            </div>
            <div className={ s.rowInputsLife }>
               <input type="number" onChange={ (e) => handleInputChange(e) } name="años_de_vida" placeholder="max"></input>
               <span>years</span>
               {
                  <SpanError text={ errors.años_de_vida } />
               }
            </div>
         </div>

         <div className={ s.rowContainer }>
            <div className={ s.rowLabel }>
               <span >Temperaments</span>
            </div>
            <div className={ s.rowInputName }>
               <input
                  style={ { marginLeft: "10px" } }
                  id="inputFindTemps"
                  onClick={ () => matchedTemps.length > 0 ? setIsVisible(true) : setIsVisible(false) }
                  onChange={ (e) => handleSearchTemp(e) } placeholder="search temperament"></input>
            </div>
            <RenderMatchedTemps />
         </div>

         <div className={ s.rowTemps }>
            {
               selectedTemps.map((t, i) => {
                  return (
                     <span
                        onClick={ () => deleteSelectedTemp(t) }
                        key={ t.nombre + i + "temperament" } >
                        { t.nombre }
                     </span>
                  )
               })
            }
         </div>
      </div>
   )
}
