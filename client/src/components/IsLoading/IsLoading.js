
export default function IsLoading(isSuccesRequest) {
    // console.log(isSuccesRequest)
    let loadInfo = isSuccesRequest ?
        <h1>Cargando...</h1> :
        <h1>Ups, ha ocurrido un error!</h1>


    return (
        <div>
            { loadInfo }
        </div>
    )
}