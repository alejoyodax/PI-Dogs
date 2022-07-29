/* eslint-disable react-hooks/exhaustive-deps */ // PARA DESACTIVAR AVISO DE DEPENDENCIA OMITIDA EN USE-EFFECT
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import styles from "./Dogs.module.css"
// import fondo from "../../img/countries.png"

// IMPORTAR COMPONENTES
import PagedDogs from "../PagedDogs/PagedDogs"
import IsLoading from "../IsLoading/IsLoading.js"

import { getAllDogBreeds, resetFilter, getAllDogTemperaments } from '../../redux/actions/actions.js'


export default function Countries() {
    let isLoading = useSelector((state) => state.isLoading)
    let isSuccesRequest = useSelector((state) => state.isSuccesRequest)

    let dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllDogBreeds())
        dispatch(getAllDogTemperaments())
        // RESETEAMOS LOS FILTROS CUANDO SE DESMONTE
        return function resetFilters() {
            dispatch(resetFilter())
        }
    }, []
    )

    return (
        <div className={ styles.container }>
            <div className={ styles.fondo }>
                <img alt="fondo" src={ "fondo.png" }></img>
            </div>
            { isLoading ? IsLoading(isSuccesRequest) : <PagedDogs /> }
        </div>
    )
}


