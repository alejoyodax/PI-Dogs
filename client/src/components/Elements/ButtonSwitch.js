import { useState } from "react"
import s from "./ButtonSwitch.module.css"

export default function ButtonSwitch({ initialState = false }) {
   const [state, setState] = useState(initialState)
   console.log("inicial estado:", initialState)

   function handleState() {
      setState((state) => {
         if (state === false) return "DES"
         if (state === "DES") return "ASC"
         if (state === "ASC") return "DES"

      })
   }

   return (
      <button onClick={ () => handleState() } className={ s.button } >
         {
            state ? state : "DESACTIVADO"
         }
      </button>
   )
}