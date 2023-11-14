import '../styles/resultados.css';

const Resultados = ({discosGenero, añadirCarrito, carrito, borrarArticulo, formatearCantidad}) => {
    let albumsCarrito = [];
 
    //para evitar los repetidos en el carrito
    carrito.map((disco) => {
        albumsCarrito.push(disco.album)
    });
    
    return (
        <div className="resultados-contenedor">
            <div className="contenedor-discos">
                {discosGenero ? (
                    <>
                        {discosGenero.map(disco => {
                            return (
                                <article className="disco" key={disco.album}>
                                    <div className="caratula">
                                        <img src={`/src/assets/images/${disco.caratula}.webp`} alt="caratula" />
                                    </div>
                                    <div className="info-disco">
                                        <h4>{disco.artista} - {disco.album}</h4>
                                        <p>{formatearCantidad(disco.precio)}</p>
                                    </div>
                                    <div className="btns-disco">
                                        <button className="btn btn-1 btn-comprar">Comprar</button>
                                        <button className="btn btn-2 btn-carrito" onClick={albumsCarrito.includes(disco.album) ? borrarArticulo : añadirCarrito} value={disco.album}>{albumsCarrito.includes(disco.album) ? 'Eliminar del carrito' : 'Añadir al carrito'}</button>
                                    </div>
                                </article>
                            )
                        })}
                    </>
                ) : (<h3>Sin resultados</h3>)}
            </div>
        </div>
    )
}

export default Resultados