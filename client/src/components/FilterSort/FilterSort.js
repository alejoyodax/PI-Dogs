import { useRef, } from "react"
import { useDispatch, useSelector } from "react-redux"
import styles from "./FilterSort.module.css"
// Componentes
import ButtonSwitch from "../Elements/ButtonSwitch.js"

//ACTIONS
import { filterDogBreeds, orderDogBreeds } from "../../redux/actions/actions.js"
// import { orderDogBreeds } from "../../redux/actions/actions.js"

export default function FilterSort({ setItemsPorPagina, setCurrentPage }) {
    const dispatch = useDispatch()
    const temperaments = useSelector(state => state.temperaments)

    // FILTROS
    const sourceRef = useRef()
    const tempRef = useRef()

    // SORTS
    const nameAZ = useRef()
    const nameZA = useRef()
    const weightASC = useRef()
    const weightDES = useRef()

    function handleFilter(event) {
        setCurrentPage(0)   // SE CONFIGURA EN LA PRIMERA PÁGINA
        const source = sourceRef.current.value;
        const temp = tempRef.current.value;

        // SI NO HAY NINGÚN ORDENAMIENTO APLICADO
        if (nameAZ.current.checked === false &&
            nameZA.current.checked === false &&
            weightASC.current.checked === false &&
            weightDES.current.checked === false) {
            dispatch(filterDogBreeds({ source, temp }))

        } else {  // FILTRAR Y ORDENAR
            console.log("FILTRO CON ORDENAMIENTO")
            const listValuesOrders = [nameAZ, nameZA, weightASC, weightDES]
            let order;
            listValuesOrders.forEach(o => { // BUSCAMOS CUAL ES EL FILTRO APLICADO
                if (o.current.checked) order = o.current.value
            })
            dispatch(filterDogBreeds({ source, temp }))
            dispatch(orderDogBreeds(order))
        }

    }

    function handlerSort(event) {
        // console.log("SORT CHANGE")
        const source = sourceRef.current.value;
        const temp = tempRef.current.value;
        dispatch(filterDogBreeds({ source, temp }))
        dispatch(orderDogBreeds(event.target.value))

    }

    // console.log(temperaments)
    return (
        <div className={ styles.filtersSortsContainer }>
            <div className={ styles.boxControl }>
                <div className={ styles.labelContainer }><label>Temperament:</label></div>
                <select name="filter" className={ styles.select } ref={ tempRef } onChange={ (e) => { handleFilter(e) } }>
                    <option>All</option>
                    {
                        temperaments.length === 0 ?
                            null :
                            temperaments.map((temp, i) => <option key={ `${temp}${i}` }>{ temp.nombre }</option>)
                    }
                </select>
            </div>

            <div className={ styles.boxControl }>
                <div className={ styles.labelContainer }><label>Source:</label></div>
                <select name="filter" className={ styles.select } ref={ sourceRef } onChange={ (e) => { handleFilter(e) } }>
                    <option>All</option>
                    <option>API</option>
                    <option>BD</option>

                </select>
            </div>

            <div className={ styles.boxControl }>
                <div className={ styles.labelContainer }><label>Nombre:</label></div>
                <input value="AZ"
                    className={ styles.radio }
                    ref={ nameAZ }
                    type="radio"
                    name="sort"
                    onChange={ (e) => { handlerSort(e) } }
                ></input>
                <div className={ styles.labelContainer }><label>Az</label></div>

                <input value="ZA"
                    onChange={ (e) => { handlerSort(e) } }
                    className={ styles.radio }
                    ref={ nameZA }
                    type="radio"
                    name="sort"></input>
                <div className={ styles.labelContainer }><label>Za</label></div>
            </div>

            <div className={ styles.boxControl }>
                <div className={ styles.labelContainer }><label>Peso:</label></div>
                <input value="DES" ref={ weightASC } onChange={ (e) => { handlerSort(e) } } className={ styles.radio } type="radio" name="sort"></input>
                <div className={ styles.labelContainer }><label>DES</label></div>
                <input value="ASC" ref={ weightDES } onChange={ (e) => { handlerSort(e) } } className={ styles.radio } type="radio" name="sort"></input>
                <div className={ styles.labelContainer }><label>ASC</label></div>
            </div>

            <div className={ styles.boxControl }>
                <div className={ styles.labelContainer }><label>Ver:</label></div>
                <select className={ styles.select } onChange={ (e) => setItemsPorPagina(e) }>
                    <option>8</option>
                    <option>16</option>
                    <option>32</option>
                    <option>Todos</option>
                </select>
            </div>
        </div>
    )
}