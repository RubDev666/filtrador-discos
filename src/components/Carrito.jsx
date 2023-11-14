import '../styles/carrito.css';

const Carrito = ({ showCarrito, carrito, borrarArticulo, total, totalPagar, formatearCantidad, setErrorCantidad, eliminarModal }) => {
    const cantidad = (e) => {
        //por si hay un input de cantidad que este vacio
        if(e.target.value === ''){
            setErrorCantidad(true); //mostrar y activar el error

            carrito.map((disco) => {
                if(disco.album === e.target.name){
                    disco.cantidad = 0; //para validar el error de cantidad y mostrarlo
                }
            })

            return
        }

        //si es 0 o un numero negativo borra el articulo
        if(Number(e.target.value) <= 0){
            borrarArticulo(e.target.name)
        }

        //quitar error de cantidad
        setErrorCantidad(false);

        //añade la cantidad y actualiza por cada cambio correcto
        carrito.map((disco) => {
            if (disco.album === e.target.name) {
                disco.cantidad = Number(e.target.value);
            }
        })

        //guardar en localStorage los articulos que tengan como minimo 1 cantidad
        //lo hago asi para corregir errores
        if (!carrito.some((disco) => disco.cantidad === 0)) {
            localStorage.setItem('carrito-music', JSON.stringify(carrito));
        } 

        //calcula el total a pagar por cada cambio
        totalPagar();
    }
 
    return (
        <>
            <div className="modal" onClick={eliminarModal}></div>
            <div className="carrito-contenedor">
                <i className="fas fa-times btn-cerrar-carrito" onClick={showCarrito}></i>

                <p className="error-cantidad">*CANTIDAD NO VALIDA</p>
                {carrito.length === 0 ? (
                    <p className='no-resultados'>No hay articulos en el carrito</p>
                ) : (
                    <>
                        <div className="articulos-contenedor">
                            <div className="articulos">
                                {carrito.map((disco) => (
                                    <div className="articulo" key={disco.album}>
                                        <div className="caratula">
                                            <img src={`/src/assets/images/${disco.caratula}.webp`} alt="caratula" />
                                        </div>
                                        <div className="descripcion">
                                            <p className="p-artista">{disco.artista}</p>
                                            <p className="p-genero">{disco.album}</p>
                                        </div>
                                        <div className="cantidades">
                                            <label htmlFor={disco.album}>Cantidad: </label>
                                            <input type="number" defaultValue={disco.cantidad ?? '1'} name={disco.album} onChange={cantidad} id={disco.album} />
                                        </div>
                                        <button className="btn btn-trash" value={disco.album} onClick={borrarArticulo}>Eliminar</button>
                                    </div>
                                ))}
                            </div>
                            <div className="total">
                                <h4>Total a pagar: <span className="total-span">{formatearCantidad(total)}</span></h4>
                                <button className="btn btn-1 btn-pagar">Ir a pagar</button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    )
}

export default Carrito