import { Link } from "react-router-dom"
import styles from './Homepage.module.css'
import fondo from "../../img/page_landing/bg.png"
import dog_model from "../../img/page_landing/dog_model.png"
import logoB from "../../img/page_landing/logoB.svg"

import { useState } from "react"

export default function Homepage() {
    console.log(1)
    const [isVisible, setIsVisible] = useState(true)


    function showPage() {
        console.log(2)
        setIsVisible(true)
    }

    function BackGroundImages() {
        return (
            <div className={ styles.backGroundImages }>
                <img className={ styles.bgBones }
                    onLoad={ () => showPage() }
                    src={ fondo }
                    alt="countries.png">
                </img>

                <img
                    className={ styles.bgDogModel }
                    alt="dog_model.png"
                    src={ dog_model }
                />
            </div>
        )
    }

    function InfoContainer() {
        return (
            <div className={ styles.infoContainer }>
                <img src={ logoB } className={ styles.logoSvg } alt="logo.svg" />
                <h3>discover the canine variety through its breeds</h3>
                <Link to="home">
                    <button className={ styles.goButton }>lets go!</button>
                </Link>

            </div>
        )
    }


    return (
        <div style={ { visibility: isVisible ? "visible" : "hidden" } }
            className={ styles.homepageContainer }>
            <BackGroundImages />
            <InfoContainer />

        </div>

    )
}