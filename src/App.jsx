import { useEffect, useState } from "react";
import Header from "./components/Header";
import Selects from "./components/Selects";
import Resultados from "./components/Resultados";
import Carrito from "./components/Carrito";
import { discos } from "./db/basedatos.js";
 
function App() {
    const [carrito, setCarrito] = useState(JSON.parse(localStorage.getItem('carrito-music')) ?? []);
    const [carritoActive, setCarritoActive] = useState(false);
    const [filtroActive, setFiltroActive] = useState(false);
    const [modal, setModal] = useState(false);
    const [errorCantidad, setErrorCantidad] = useState(false);
    const [total, setTotal] = useState(0);
    const [generos, setGeneros] = useState([]);
    const [generoSeleccionado, setGeneroSeleccionado] = useState('todos');
    const [discosGenero, setDiscosgenero] = useState(discos);
    const [ordenar, setOrdenar] = useState('');

    //cerrar modales al hacer evento resize
    useEffect(() => {
        window.addEventListener("resize", function () {
            const modal = document.querySelector('.modal');
            modal.classList.remove('show-modal');

            const carrito = document.querySelector('.carrito-contenedor')
            carrito.classList.remove('show-carrito');

            const select = document.querySelector('.select-contenedor');
            select.classList.remove('show');

            setCarritoActive(false);
            setFiltroActive(false);
            setModal(false);
        });
    }, [])

    //para cargar los generos y cantidad para el select de generos
    useEffect(() => {
        let g = [];

        for (let disco of discos) {
            if (!g.some(obj => obj.genero === disco.genero)) {
                g.push({ genero: disco.genero, cantidad: 1 });
            } else {
                for (let obj of g) {
                    if (obj.genero === disco.genero) {
                        obj.cantidad += 1;
                    }
                }
            }
        }

        setGeneros(g);
    }, []) 

    //filtras u ordenar por genero
    useEffect(() => {
        filtrar();
    }, [generoSeleccionado, ordenar])

    //para mostrar total a pagar
    //mensaje de error y localStorage con cada cambio del carrito
    useEffect(() => {
        totalPagar();

        mensajeError();

        if (!carrito.some((disco) => disco.cantidad === 0)) {
            localStorage.setItem('carrito-music', JSON.stringify(carrito));
        } 
    }, [carrito])

    //cada vez que se active el error de cantidad
    useEffect(() => {
        mensajeError();
    }, [errorCantidad])

    //useEffect para el modal
    useEffect(() => {
        mostrarModal();
    }, [modal])

    //el modal es la pantalla oscura de fondo cuando se muestre el carrito o el filtrador
    const mostrarModal = () => {
        const modal = document.querySelector('.modal');

        if(carritoActive || filtroActive) {
            modal.classList.add('show-modal');
        } else if(!carritoActive || !filtroActive) {
            modal.classList.remove('show-modal');
        }
    }

    //ocultar modal, y el select o carrito
    const eliminarModal = () => {
        if(filtroActive){
            const filtrosContenedor = document.querySelector('.select-contenedor');

            filtrosContenedor.classList.remove('show');

            setFiltroActive(false);

            setModal(false);

            return;
        }

        if(carritoActive){
            const carrito = document.querySelector('.carrito-contenedor');

            setCarritoActive(false);

            setModal(false);

            carrito.classList.remove('show-carrito');

            return;
        }
    }
  
    const showCarrito = () => {
        //si el modal de filtro esta activo, el carrito no se puede abrir
        if (filtroActive) {
            return;
        }

        const carrito = document.querySelector('.carrito-contenedor');

        /* esto lo hago para que cuando elimine un articulo desde el carrito de compras
        no se cierre el carrito, ya que se puede eliminar articulos desde el contenedor 
        principal de discos, y puede ser molesto para algunos si desea borrar mas articulos
        y tener que abrir una y otra vez el carrito borrando articulo por articulo
        */
        if (carritoActive === true) {
            eliminarModal(); //remueve carrito y modal
        } else {
            setCarritoActive(true);

            carrito.classList.add('show-carrito');

            setModal(true); //mostrar la pantalla oscura de fondo
        }
    }

    const filtrar = () => {
        if(generoSeleccionado === 'todos'){
            setDiscosgenero(discos);
        } else {
            let filtro = discos.filter(disco => disco.genero === generoSeleccionado);

            setDiscosgenero(filtro);
        }
    }

    const añadirCarrito = (e) => {
        let copiaCarrito = []

        discosGenero.map((disco) => {
            if(disco.album === e.target.value) {
                disco.cantidad = 1;

                copiaCarrito = [disco, ...carrito];
            }
        })

        setCarrito(copiaCarrito);

        //mostrar el carrito despues de añadir el articulo
        showCarrito();
    }

    const borrarArticulo = (e) => {
        let copiaCarrito = [];

        if(typeof(e) === 'string'){
            copiaCarrito = carrito.filter((disco) => disco.album !== e);
        } else {
            copiaCarrito = carrito.filter((disco) => disco.album !== e.target.value);
        }

        setCarrito(copiaCarrito);

        //si el carrito esta activo no se cierra al borrar el articulo
        //pero si borramos desde el contenedor de discos, muestra el carrito
        if(!carritoActive) {
            showCarrito();
        }
    }

    const totalPagar = () => {
        let totalPagar = 0;

        carrito.map((disco) => {
            totalPagar += disco.precio * disco.cantidad;
        })

        setTotal(totalPagar);
    }

    //convetir los numeros a dinero
    const formatearCantidad = (cantidad) => {
        return cantidad.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        })
    }

    const mensajeError = () => {
        const mensajeError = document.querySelector('.error-cantidad');

        if (carrito.some((disco) => disco.cantidad === 0)) {
            mensajeError.classList.add('active')

            setErrorCantidad(true)
        } else {
            mensajeError.classList.remove('active')

            setErrorCantidad(false)
        }
    }

    const mostrarFiltros = () => {
        //si el carrito esta activo, no se podra usar el filtrador
        if(carritoActive){
            return;
        }

        const filtrosContenedor = document.querySelector('.select-contenedor');

        if(filtroActive){
            eliminarModal();
        } else {
            filtrosContenedor.classList.add('show');

            setFiltroActive(true);

            setModal(true);
        }
    }

    return (
        <>
            <Header
                carrito={carrito}
                showCarrito={showCarrito}
                mostrarFiltros={mostrarFiltros}
            />

            <div className="contenedor-principal">
                <Selects 
                    generos={generos}
                    setGeneroSeleccionado={setGeneroSeleccionado}
                    setOrdenar={setOrdenar}
                    discos={discos}
                    mostrarFiltros={mostrarFiltros}
                />
                
                <Resultados
                    discosGenero={discosGenero}
                    añadirCarrito={añadirCarrito}
                    carrito={carrito}
                    borrarArticulo={borrarArticulo}
                    formatearCantidad={formatearCantidad}
                    mostrarFiltros={mostrarFiltros}
                />

                <Carrito 
                    carrito={carrito}
                    showCarrito={showCarrito}
                    borrarArticulo={borrarArticulo}
                    total={total}
                    totalPagar={totalPagar}
                    formatearCantidad={formatearCantidad}
                    setErrorCantidad={setErrorCantidad}
                    eliminarModal={eliminarModal}
                />
            </div>
        </>
    )
}

export default App
