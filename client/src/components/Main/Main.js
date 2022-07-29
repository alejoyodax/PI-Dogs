import { Outlet } from "react-router-dom";
import styles from './Main.module.css'
// import fondo from "../../img/countries.png"

import Nav from '../NavBar/NavBar.js'
// import OrderFilter from "../OrderFilter/OrderFilter";

export default function Main() {
    return (
        <div className={ styles.home }>
            <Nav />
            <Outlet />
        </div>
    );
}