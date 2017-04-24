/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



class TablaSimbolo {

    agregarSimbolo(nombre, tipo, rol, ambito, tamanio, posicion, lista) {
        console.log(nombre + " - " + tipo + " - " + rol + " - " + ambito + " - " + tamanio+ " - " + posicion);
        var s = new Simbolo(nombre, tipo, rol, ambito, tamanio, posicion);
        lista.push(s);
    }
}


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