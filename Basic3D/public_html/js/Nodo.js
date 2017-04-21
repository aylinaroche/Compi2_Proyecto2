/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
cantidadHijos =0;
padre = null;
hijo =[];
raiz = null;

function Nodo(texto) {
    document.write(texto);
    this.texto = texto;
    this.valor = texto;
    this.tipo = texto;
    this.cantidadHijos = 0;
}

function Nodo(texto, tipo) {
    document.write(texto);
    this.texto = texto;
    this.valor = texto;
    this.tipo = tipo;
    this.cantidadHijos = 0;
}

function insertar(nuevo) {
    document.write("</br>"+nuevo+"\n");
    if (nuevo === null) {
        return; //si el nodo nuevo es nulo, no se creo en la gramatica y no debe ser agregado por lo tanto
    }
    document.write(cantidadHijos);
  //  aux = new Nodo[cantidadHijos + 1];
    //se copian los hijos del nodso al auxiliar
    aux = [];
    for (i = 0; i < cantidadHijos; i++) {
        aux[i] = this.hijos[i];
        aux[i].padre = this;
    }
    
    nuevo.padre = this;
    aux[cantidadHijos] = nuevo;
    this.hijos = aux;
    this.cantidadHijos++;
    raiz = aux;
       
}
function ObtenerRaiz(){
     return raiz;
    //E = new Nodo("LISTA");
    //E.insertar(new Nodo("let"));
}

