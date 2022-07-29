import React from 'react'
import { NavLink } from 'react-router-dom';
import styles from './NavBar.module.css'
// import logo from "../../img/logo.png"

// ESTABLECE COLOR AL LINK ACTIVO
const getColorIfActive = ({ isActive }) => {
    return isActive ? styles.activeLink : styles.link
}

export default function NavBar() {
    return (
        <header className={ styles.header }>
            <div>
                <img height="40px" src={ "logo" } alt='logo.png'></img>
            </div>

            <nav className={ styles.navContainer }>
                <ul>
                    <li className={ styles.liContainer }>
                        <NavLink className={ getColorIfActive }
                            to="dogs" >Dog Breeds</NavLink>
                    </li>
                    <li className={ styles.liContainer }>
                        <NavLink className={ getColorIfActive }
                            to="create-breed">Create breed</NavLink>
                    </li>
                    <li className={ styles.liContainer }>
                        <NavLink className={ getColorIfActive }
                            to="about">About</NavLink>
                    </li>

                </ul>
            </nav>
        </header >
    );
}


