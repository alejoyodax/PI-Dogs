import React from 'react'
import { NavLink } from 'react-router-dom';
import styles from './NavBar.module.css'
import logo from "../../img/page_landing/logo.png"
// import lupa from "../../img/lupita.png"

import SearchDog from "../SearchDog/SearchDog.js"

// ESTABLECE COLOR AL LINK ACTIVO
const getColorIfActive = ({ isActive }) => {
    return isActive ? styles.activeLink : styles.link
}

export default function NavBar() {
    return (
        <header className={ styles.header }>
            <div>
                <img height="50px" src={ logo } alt='logo.png'></img>
            </div>

            <nav className={ styles.navContainer }>
                <ul>
                    {/* <li className={ styles.searchInputContainer }>
                        <img height="20px" src={ lupa } />
                        <input className={ styles.searchInput } />
                    </li> */}
                    <li>
                        <SearchDog />
                    </li>


                    <li className={ styles.liContainer }>
                        <NavLink className={ getColorIfActive }
                            to="dogs" >Dog Breeds</NavLink>
                    </li>
                    <li className={ styles.liContainer }>
                        <NavLink className={ getColorIfActive }
                            to="create-breed">Create breed</NavLink>
                    </li>
                    {/* <li className={ styles.liContainer }>
                        <NavLink className={ getColorIfActive }
                            to="about">About</NavLink>
                    </li> */}

                </ul>
            </nav>
        </header >
    );
}


