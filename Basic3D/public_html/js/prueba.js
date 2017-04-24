
//var parser = require("./gramatica").parser;

function prueba() {
    gramatica.parse(
//            "element : Nodo {"
//            + "    num valor : 0;"
//            + "    Nodo siguiente : NULL;"
//            + "}"
            +"%% Variables globales"
            + "num max , min :5;"
            + "Nodo inicio : NULL;"
            + "Nodo final : NULL;"
            + ""
            + "array : vector [ 5 .. 20 ] of str ;"
            + "array : estados [ 5 ][ 3 ] of bool ;"
            + "array : casillas [ 1 .. 5 ][ 4 ][ 1 .. 3 ] of num ;"

//            + "%% Programa"
            + "void : InsertarAlInicio (num valor) {"
            + "	Nodo nuevo : CrearNodo(valor);"
            + "	if (inicio == NULL) then {"
            + "		inicio = nuevo;"
            + "		final = nuevo;"
            + "	} else {"
            + "		nuevo.siguiente = inicio;"
            + "		inicio = nuevo;"
            + "	}"
            + "	show(\"Al inicio: \" + valor);"
            + "}"
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
            + "");

    let nodo = gramatica.arbol.raiz;
    listaSimbolo = [];
    tabla = new TablaSimbolo();
    if (nodo === null) {
        console.log(nulo);
    }
    primer = new Recorrido();
    primer.Recorrer(nodo);

    console.log(" * * * * * * * * * * * * *");
    console.log(listaSimbolo);
}
