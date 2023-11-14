import "../styles/select.css";
import {
    //precioMayoraMenor,
    //precioMenoraMayor,
    artistaMenoraMayor,
    artistaMayoraMenor,
    albumMayoraMenor,
    albumMenoraMayor
} from "/src/helpers/ordenar.js";

const Selects = ({ generos, setOrdenar, setGeneroSeleccionado, discos, mostrarFiltros }) => {
    const handleGenero = (e) => {
        setGeneroSeleccionado(e.target.value);
    }

    const handleOrdenar = (e) => {
        setOrdenar(e.target.value);
 
        if (e.target.value === 'menor-precio') {
            discos.sort((a, b) => a.precio - b.precio);
        }

        if (e.target.value === 'mayor-precio') {
            discos.sort((a, b) => b.precio - a.precio);
        }

        if (e.target.value === 'menor-artista') {
            discos.sort(artistaMenoraMayor);
        }

        if (e.target.value === 'mayor-artista') {
            discos.sort(artistaMayoraMenor);
        }

        if (e.target.value === 'menor-album') {
            discos.sort(albumMenoraMayor);
        }

        if (e.target.value === 'mayor-album') {
            discos.sort(albumMayoraMenor);
        }
    }
 
    return (
        <div className="select-contenedor">
            <i className="fas fa-times btn-cerrar-filtros" onClick={mostrarFiltros}></i>
  
            <div className="select-genero">
                <label htmlFor="generos">Genero:</label>
                <select name="" id="generos" onChange={handleGenero}>
                    <option value="todos" key={"todos"}>{"Todos los generos"} ({discos.length})</option>
                    {generos.map((obj) => (
                        <option value={obj.genero} key={obj.genero}>{obj.genero} ({obj.cantidad})</option>
                    ))}
                </select>
            </div>
            
            <div className="select-ordenar">
                <h3>Ordenar por:</h3>
                <form onChange={handleOrdenar}>
                    <label className="contenedor-input">
                        <input type="radio" name="ordenar" value="menor-precio" id="menor-precio" />
                        <span>Menor Precio</span>
                        <div className="circulo">
                            <div className="circulo-active"></div>
                        </div>
                    </label>
                    <label className="contenedor-input">
                        <input type="radio" name="ordenar" value="mayor-precio" id="mayor-precio" />
                        <span>Mayor Precio</span>
                        <div className="circulo">
                            <div className="circulo-active"></div>
                        </div>
                    </label>
                    <label className="contenedor-input">
                        <input type="radio" name="ordenar" value="menor-artista" id="menor-artista" />
                        <span>Nombre artista (A - Z)</span>
                        <div className="circulo">
                            <div className="circulo-active"></div>
                        </div>
                    </label>
                    <label className="contenedor-input">
                        <input type="radio" name="ordenar" value="mayor-artista" id="mayor-artista" />
                        <span>Nombre artista (Z - A)</span>
                        <div className="circulo">
                            <div className="circulo-active"></div>
                        </div>
                    </label>
                    <label className="contenedor-input">
                        <input type="radio" name="ordenar" value="menor-album" id="menor-album" />
                        <span>Nombre album (A - Z)</span>
                        <div className="circulo">
                            <div className="circulo-active"></div>
                        </div>
                    </label>
                    <label className="contenedor-input">
                        <input type="radio" name="ordenar" value="mayor-album" id="mayor-album" />
                        <span>Nombre album (Z - A)</span>
                        <div className="circulo">
                            <div className="circulo-active"></div>
                        </div>
                    </label>
                </form>
            </div>
        </div>
    )
}

export default Selects