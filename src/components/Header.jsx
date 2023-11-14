import { useEffect } from "react";

const Header = ({carrito, showCarrito, mostrarFiltros}) => {
    useEffect(() => {
        const handleScrollcolor = () => {
            const header = document.querySelector('.header');
            
            if(window.scrollY > 10){
                header.classList.add('color-scroll')
            } else {
                header.classList.remove('color-scroll')
            }
        };

        window.addEventListener('scroll', handleScrollcolor);
    }, []);

    return (
        <div className="header">
            <h3>Music Store</h3>
            <div className="items-center">
                <button className="btn btn-1 btn-filtros" onClick={mostrarFiltros}>
                    <p>Filtros</p>
                </button>
                <button className="btn-cart" onClick={showCarrito}>
                    <div className="contador-carrito items-center">{carrito.length}</div>
                    <i className="fas fa-shopping-cart"></i>
                </button>
            </div>
        </div>

    )
}

export default Header