
/* global listaSimbolo, tabla, codigo, stack, P */

var puntero = 0;

class Simbolo {
    constructor(nombre, tipo, rol, ambito, tamanio, posicion) {
        this.nombre = nombre;
        this.tipo = tipo;
        this.rol = rol;
        this.ambito = ambito;
        this.tamanio = tamanio;
        this.posicion = posicion;
    }
}

class TablaSimbolo {

    agregarSimbolo(nombre, tipo, rol, ambito, tamanio, posicion) {
        console.log(nombre + " - " + tipo + " - " + rol + " - " + ambito + " - " + tamanio + " - " + posicion);
        var s = new Simbolo(nombre, tipo, rol, ambito, tamanio, posicion);
        listaSimbolo.push(s);
        return true;
    }

    buscarSimbolo(nombre, tipo, rol, ambito, tamanio, posicion) {
        for (var i = 0; i < listaSimbolo.length; i++) {
            var s = listaSimbolo[i];
            if (s.nombre === (nombre) && s.tipo === (tipo)) {
                return s;
            }
        }
        return null;
    }

    buscarElemento(nombre) {
        for (var i = 0; i < listaSimbolo.length; i++) {
            var s = listaSimbolo[i];
            if (s.nombre === (nombre) && s.rol === "elemento") {
                return s;
            }
        }
        return null;
    }
}

class FuncionesC3D {

    crearVariableGlobal(nombre, tipo, nodo) {
        var cadena = "";
        var temp = 0;
        var s = new Simbolo();
        s = tabla.buscarSimbolo(nombre, tipo, null, null, null, null);
        //   if (s.ambito === "global") {
        if (s !== null) {
            var t = codigo.generaTemp();
            cadena = t + " = P\n";
            temp = H;
            if (s.tipo !== "str" && s.tipo !== "num" && s.tipo !== "bool") {
                var elemento = new Simbolo();
                elemento = tabla.buscarElemento(s.tipo);
                if (elemento !== null)
                {
                    cadena += "P = P + " + elemento.tamanio + "\n";
                    H = H + elemento.tamanio;
                }
            } else {
                cadena += "P = P + 1\n";
                H = H + 1;

                cadena += codigo.generaTemp() + " = " + t + " + " + s.posicion + "\n";
                temp = temp + s.posicion;
                cadena += "Stack[" + "] = -1\n\n";

            }
        }
        //} 

        codigo.agregarC3D(cadena);

    }

    crearVariable(nombre, tipo, asignar) {
        var cadena = "";
        var s = new Simbolo();
        var nodo = asignar;
        s = tabla.buscarSimbolo(nombre, tipo, null, null, null, null);
        if (s !== null) {
            if (s.tipo !== "str" && s.tipo !== "num" && s.tipo !== "bool") {
                var elemento = new Simbolo();
                elemento = tabla.buscarElemento(s.tipo);
                if (elemento !== null)
                {
                    var t = codigo.generaTemp();
                    cadena = t + " = P + " + s.posicion + "\n";
                    cadena += "Stack[" + t + "] = " + nodo.cadena + "   //Declaracion de elemento " + nombre + " \n";
                    if (nodo.cadena === "create") {
                      //  cadena += "P = P + " + elemento.tamanio + "\n";
                    }
                }
            } else {
                var t = codigo.generaTemp();
                cadena = t + " = P + " + s.posicion + "\n";
                cadena += "Stack[" + t + "] = " + nodo.cadena + "   //Declaracion de " + nombre + " \n";
            }
        }
        codigo.agregarC3D(cadena);
    }

    asignarVariable(nombre, asignar) {
        var cadena = "";
        var nodo = asignar;
        for (var i = 0; i < listaSimbolo.length; i++) {
            var s = listaSimbolo[i];
            if (s.nombre === nombre) {
                var t = codigo.generaTemp();
                cadena = t + " = P + " + s.posicion + "\n";
                cadena += "Stack[" + t + "] = " + nodo.cadena + "   //Asignacion de " + nombre + " \n";
            }
        }
        codigo.agregarC3D(cadena);
    }

    llamarMetodo(nombre) {
        var cadena = "";
        for (var i = 0; i < listaSimbolo.length; i++) {
            var s = listaSimbolo[i];
            if (s.nombre === nombre && s.rol === "metodo") {
                cadena = "P = P + " + s.tamanio + "\n";
                // P = P + s.tamanio;
                cadena += "call " + nombre + "()\n";
                cadena += "P = P - " + s.tamanio + "\n";
            }
        }
        codigo.agregarC3D(cadena);
    }

}
