import styles from "./DogCard.module.css"

export default function DogCard({ isFromBD, id, nombre, altura_min, altura_max, peso_min, peso_max, años_de_vida, img_url, temperamentos }) {
    return (
        <div className={ styles.card }>
            <div className={ styles.tituloContenedor }>
                <h3 className={ styles.titulo } >{ nombre.toUpperCase() }</h3>
                {/* <hr className={ styles.horizontalLine }></hr> */ }
            </div>

            <DogImage img_url={ img_url } />
            <DogTemperaments temperamentos={ temperamentos } />

        </div>
    )
}

function DogTemperaments({ temperamentos }) {
    function renderTemperaments() {
        return temperamentos ?
            temperamentos.map((temp, i) => <span key={ `${i}${temp}` }>{ temp }</span>) :
            <span>{ "Sin información" }</span>
    }
    return (
        <div className={ styles.temperamentosContainer }>
            { renderTemperaments() }
        </div>
    )
}

function DogImage({ img_url, nombre }) {
    return (
        <div className={ styles.imagenContainer }>
            <img className={ styles.imagen } alt={ `imagen_${nombre}` } src={ img_url } />
        </div>
    )
}