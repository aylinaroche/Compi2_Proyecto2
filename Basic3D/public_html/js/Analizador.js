
/* global gramatica */

//var parser = require("./gramatica").parser;

function prueba() {
//    gramatica.parse(
//            "element : Nodo {"
//            + "    num valor : 0;"
//            + "    Nodo siguiente : NULL;"
//            + "}"
//            +"%% Variables globales"
//            + "num max , min :5;"
//            + "Nodo inicio : NULL;"
//            + "Nodo final : NULL;"
//            + ""
//            + "array : vector [ 5 .. 20 ] of str ;"
//            + "array : estados [ 5 ][ 3 ] of bool ;"
//            + "array : casillas [ 1 .. 5 ][ 4 ][ 1 .. 3 ] of num ;"
//
////            + "%% Programa"
//            + "void : InsertarAlInicio (num valor) {"
//            + "	Nodo nuevo : CrearNodo(valor);"
//            + "	if (inicio == NULL) then {"
//            + "		inicio = nuevo;"
//            + "		final = nuevo;"
//            + "	} else {"
//            + "		nuevo.siguiente = inicio;"
//            + "		inicio = nuevo;"
//            + "	}"
//            + "	show(\"Al inicio: \" + valor);"
//            + "}"
//            + ""
//            + "void : InsertarAlFinal (num valor) {"
//            + "	Nodo nuevo : CrearNodo(valor);"
//            + "	if (final == NULL) then {"
//            + "		inicio = nuevo;"
//            + "		final = nuevo;"
//            + "	} else {"
//            + "		final.siguiente = nuevo;"
//            + "		final = nuevo;"
//            + "	}"
//            + "	show(\"Al final: \" + valor);"
//            + "}"
//            + "");

    gramatica.parse(
            " num max , min :5*502+30;"
//            + "Nodo inicio : NULL;"
//            + "array : estados [ 5 ][ 3 ] of bool ;"
//            + "Nodo final : NULL;"
            + "element : Nodo { "
            + "     Nodo o1;"
            + "     bool bandera : 10>5 || 5==5; "
            + "     objetoN object : create(objetoN);"
            + "     array : x [1..3][1..4][1..5] of bool;"
            + "}"
//            "element : Nodo {"
//            + "    num valor : 0;"
//            + "    Nodo siguiente : NULL;"
//            + "}"
            + ""
            );

//gramatica.parse(
//        "(b<c) && (a>x)"
//            );

    let nodo = gramatica.arbol.raiz;
    listaSimbolo = [];
    heap = [];
    stack = [];
    listaError = [];
    C3D = "";
    tabla = new TablaSimbolo();
    monticulo = new Heap();
    ambito = new Stack();
    reporte = new Reporte();
    codigo = new ControlC3D();

    if (nodo === null) {
        console.log("nulo");
    }
    primer = new Recorrido();
    primer.Recorrer(nodo);
  //  monticulo.llenarHeap(listaSimbolo, heap);
   // ambito.removeAll();
 //  segundo = new GenerarC3D();
//    segundo.Recorrer(nodo);

    console.log("\n * * * * * * *  " + listaSimbolo.length + "  * * * * * * * *");
    console.log(listaSimbolo);
//    console.log("\n * * * * * * *  " + stack.length + " * * * * * * *");
//    console.log(stack);
    console.log("\n * * * * * * *  " + heap.length + " * * * * * * *");
    console.log(heap);
    console.log("\n\n & & & & & & & & & & & & & & &  & & & & & & & &");
    console.log(codigo.getC3D());
    console.log("\n\n & & & & & & &  " + listaError.length + "  & & & & & & & &");
    console.log(listaError);
}


function Stack() {
    var elements = [];

    this.add = add;
    this.pop = pop;
    this.peek = peek;
    this.hasElements = hasElements;
    this.removeAll = removeAll;
    this.size = size;

    function add(element) {
        elements.push(element);
    }

    function pop() {
        return elements.pop();
    }

    function peek() {
        return elements[elements.length - 1];
    }

    function hasElements() {
        return elements.length > 0;
    }

    function removeAll() {
        elements = [];
    }

    function size() {
        return elements.length;
    }
}