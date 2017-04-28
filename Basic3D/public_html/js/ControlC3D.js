
var temp = 0;
var l = 1;
var c3d = "";
var cad;

class ControlC3D {

    reiniciar() {
        temp = 0;
        c3d = "";
        l = 1;
    }

    generaTemp() {
        return "t$" + temp++;
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
    constructor(cadena, v, f) {
        this.cadena = cadena;
        this.v = v;
        this.f = f;
    }
}