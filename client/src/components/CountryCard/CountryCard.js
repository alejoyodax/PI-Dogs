import styles from "./CountryCard.module.css"

function NombrePais({ nombre }) {
    const styleTituloPeque = {
        fontSize: "0.65rem"
    }

    return (
        <div style={ nombre.length > 14 ? styleTituloPeque : null } className={ styles.tituloContenedor }>
            <h3 className={ styles.titulo } >{ nombre.toUpperCase() }</h3>
        </div>
    )
}

function ImagenPais({ img, nombre }) {
    return (
        <img className={ styles.bandera } width="115px" height={ "64px" } alt={ `imagen_${nombre}` } src={ img } />
    )
}

function Continente({ continente }) {
    return (
        <label className={ styles.continente }>{ continente }</label>
    )
}

export default function CountryCard({ nombre, imagen, continente }) {

    return (
        <div className={ styles.card }>
            <NombrePais nombre={ nombre } />
            <hr className={ styles.horizontalLine }></hr>
            <ImagenPais img={ imagen } />
            <Continente continente={ continente } />

        </div>
    )
}