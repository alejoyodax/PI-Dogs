import { Link } from "react-router-dom"
import styles from './Homepage.module.css'
// import fondo from "../../img/dog.png"
import { useState } from "react"

export default function Homepage() {
    console.log(1)
    const [isVisible, setIsVisible] = useState(false)


    function getEndLoad() {
        console.log(2)
        setIsVisible(true)
    }

    return (
        <div style={ { visibility: isVisible ? "visible" : "hidden" } } className={ styles.homepageContainer }>
            <div className={ styles.fondoContainer }>
                <img onLoad={ () => getEndLoad() } src={ "https://images4.alphacoders.com/936/936378.jpg" } alt="countries.png"></img>
            </div>

            <div className={ styles.boxWelcome }>
                <h2 className="normalizar">Dogs</h2>
                <br></br>
                <Link to="/home">Vamos!</Link>
            </div>

        </div>

    )
}