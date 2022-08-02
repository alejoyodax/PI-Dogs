import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import styles from './PagedDogs.module.css'

// COMPONENTES
import DogCard from '../DogCard/DogCard.js'
import FilterSort from '../FilterSort/FilterSort.js'

import { useState } from 'react'
import { useEffect } from 'react'

export default function PagedDogs() {
    const totalBreeds = useSelector(state => state.dogBreeds.length)
    const dogBreedsToShow = useSelector(state => state.dogBreedsToShow)
    const [state, setState] = useState([...dogBreedsToShow])
    const [currentPage, setCurrentPage] = useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(8)
    const [currentItems, setCurrentItems] = useState([...state.slice(0, itemsPerPage)])
    const [totalPages, setTotalPages] = useState((Math.floor(dogBreedsToShow.length / itemsPerPage)))
    // console.log("TOTAL PAGES:", totalPages)

    // CUANDO LOS DOGS A MOSTRAR DEL STORE E itemsPerPage CAMBIEN
    useEffect(() => {
        // console.log("PAGINAS MONTADA")
        // console.log("dogBreedsToShow: ", dogBreedsToShow)
        setState([...dogBreedsToShow])
        setCurrentItems([...dogBreedsToShow.slice(0, itemsPerPage)])
        setTotalPages(Math.floor(dogBreedsToShow.length / itemsPerPage))
    }, [dogBreedsToShow, itemsPerPage]
    )

    // CUANDO EL NÚMERO DE LA PÁGINA DE POKEMONES CAMBIE (cuando cambiemos la página) O itemsPerPage CAMBIEN
    useEffect(() => {
        const newFirstIndex = currentPage * itemsPerPage
        setCurrentItems([...state.slice(newFirstIndex, newFirstIndex + itemsPerPage)])
    }, [currentPage, state, itemsPerPage]
    )

    const siguientePagina = () => {
        if (currentPage >= totalPages) return
        // console.log("AVANZA DE PÁGINA")
        setCurrentPage(currentPage + 1)
    }

    const anteriorPagina = () => {
        if (currentPage <= 0) return
        setCurrentPage(currentPage - 1)
    }

    const setItemsPorPagina = (event) => {
        setCurrentPage(0)
        // console.log("CANTIDAD SELECCIONADA:", event.target.value)
        event.target.value === "Todos" ?
            setItemsPerPage(999) :
            setItemsPerPage(parseInt(event.target.value)) // EL VALOR DEL SELECT ES UN STRING
    }

    const renderCards = () => {
        return (
            currentItems.map(dog => {
                return (
                    <Link style={ { textDecoration: 'none' } } to={ "/home/dog-detail/" + dog.id } key={ `link${dog.id}${dog.nombre}` }>
                        <DogCard
                            key={ `${dog.id}${dog.nombre}` }
                            nombre={ dog.nombre }
                            img_url={ dog.img_url }
                            temperamentos={ dog.temperamentos }
                        />
                    </Link>)
            }
            )
        )
    }

    const RenderPageControls = () => {
        const totalPagesToShow = totalPages === 1 ? 1 : totalPages + 1
        return (
            <div className={ styles.paginatedControlsContainer }>
                <button disabled={ currentPage === 0 ? true : false } onClick={ anteriorPagina }>Anterior</button>
                <h3>{ `${dogBreedsToShow.length}/${totalBreeds} dog breeds - Página ${currentPage + 1} de ${totalPagesToShow}` }</h3>
                <button disabled={ currentPage + 1 === totalPagesToShow ? true : false } onClick={ siguientePagina }>Siguiente</button>
            </div>)
    }

    return (
        <div className={ styles.cardsContainer } >
            <FilterSort setCurrentPage={ setCurrentPage } setItemsPorPagina={ setItemsPorPagina } />
            <RenderPageControls />
            {
                currentItems.length > 0 && state.length !== 0 ? renderCards() : "No hay resultados para tus filtros :("
            }
            { currentItems.length > 12 ? <RenderPageControls /> : null }
        </div >
    )
}

