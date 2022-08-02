import { useEffect } from "react"
import s from "./DogImg.module.css"

export default function DogImg({ img_url, handleInputChange, errors }) {
   useEffect(() => {
      console.log("CAMBIÓ LA URL")
   }, [img_url])

   function clearInput(e) {
      e.preventDefault()
      e.target.value = ""
      handleInputChange(e)
   }

   function SpanError({ text }) {

      return (
         <label className={ s.spanError }>{ text }</label>
      )
   }

   return (
      <div className={ s.imgContainer }>
         <div className={ s.img }>
            { img_url ? <img src={ img_url } alt={ "" } /> :
               <span>Paste the image URL below</span> }
         </div>

         <div className={ s.urlImageContainer }>
            <button name="img_url" onClick={ (e) => clearInput(e) }>CLEAR</button>
            <input
               onChange={ (e) => handleInputChange(e) }
               name="img_url"
               type="text"
               value={ img_url }
               placeholder="paste URL image here!" />
            {
               errors.img_url && <SpanError text={ errors.img_url } />
            }
         </div>
      </div >
   )
}