import { Link } from "react-router-dom"
import styles from './Homepage.module.css'
// import fondo from "../../img/countries.png"

export default function Homepage() {

    return (
        <div className={ styles.homepageContainer }>
            <div className={ styles.fondoContainer }>
                {/* <img src={ fondo } alt="countries.png"></img> */ }
            </div>

            <div className={ styles.boxWelcome }>
                <h2 className="normalizar">Dogs</h2>
                <br></br>
                <Link to="/home">Vamos!</Link>
            </div>

        </div>

    )
}