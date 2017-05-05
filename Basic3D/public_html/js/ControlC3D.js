
/* global tabla, codigo, stack */

var temp = 0;
var l = 1;
var c3d = "";
var cad;
var P = 0;
var H = 0;
var S = 0;

class ControlC3D {

    reiniciar() {
        temp = 0;
        c3d = "";
        l = 1;
    }

    generaTemp() {
        return "t" + temp++;
    }

    agregarC3D(sentencia) {
        c3d += sentencia;
    }

    getC3D() {
        return c3d;
    }

    generaL() {
        return "L" + l++;
    }
}

class NodoC3D {
    constructor(cadena, tipo, v, f) {
        this.cadena = cadena;
        this.tipo = tipo;
        this.v = v;
        this.f = f;
    }
}

