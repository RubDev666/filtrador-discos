/*export function precioMenoraMayor(x, y) {
    if(x.precio < y.precio){ 
        return -1;
    } else if (x.precio > y.precio){
        return 1
    } else {
        return 0;
    }
}
 
export function precioMayoraMenor(x, y) {
    if(x.precio > y.precio){ 
        return -1;
    } else if (x.precio < y.precio){
        return 1
    } else {
        return 0;
    }
}*/

export function artistaMenoraMayor(x, y) {
    if(x.artista < y.artista){ 
        return -1;
    } else if (x.artista > y.artista){
        return 1
    } else {
        return 0;
    }
}

export function artistaMayoraMenor(x, y) {
    if(x.artista > y.artista){ 
        return -1;
    } else if (x.artista < y.artista){
        return 1
    } else {
        return 0;
    }
}

export function albumMenoraMayor(x, y) {
    if(x.album < y.album){ 
        return -1;
    } else if (x.album > y.album){
        return 1
    } else {
        return 0;
    }
}

export function albumMayoraMenor(x, y) {
    if(x.album > y.album){ 
        return -1;
    } else if (x.album < y.album){
        return 1
    } else {
        return 0;
    }
}

