
/* global listaError */

class Reporte {

    agregarError(tipo, descripcion, fila, columna) {
        var s = new Error(tipo, descripcion, fila, columna);
        listaError.push(s);
    }
}


class Error {
    constructor(tipo, descripcion, fila, columna) {
        this.tipo = tipo;
        this.descripcion = descripcion;
        this.fila = fila;
        this.columna = columna;
    }
}