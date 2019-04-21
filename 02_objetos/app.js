class Pelicula {
    constructor(nombre, id) {
        this.nombre = nombre;
        this.id = id;
    }

    reproducir() {
        return `Reproduciendo pelicula ${this.nombre}`
    }
}

class Serie extends Pelicula {

    constructor(nombre, id, capitulo) {
        super(nombre, id);
        this.capitulo = capitulo;
    }

    reproducirCapitulo() {
        return `Reproduciendo capitulo ${this.capitulo} --- ${this.nombre}`
    }
}

const serie = new Serie('Dexter', 01, 55);

console.log(serie.reproducirCapitulo());