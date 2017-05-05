

/* global primer, listaSimbolo, tabla, heap, monticulo, ambito, codigo */
tamanio = 0;
posicion = 0;
posGlobal = 0;
posLocal = 0;
global = false;
class Recorrido {

    Recorrer(raiz) {
        var result = null;

        if (raiz !== null) {
            //  console.log(raiz.nombre+":"+raiz.hijos.length);
            switch (raiz.nombre) {
                case "ENTRADA":
                    switch (raiz.hijos.length) {
                        case 1:
                            result = primer.Recorrer(raiz.hijos[0]);
                            break;
                        case 2:
                            result = primer.Recorrer(raiz.hijos[0]);
                            result = primer.Recorrer(raiz.hijos[1]);
                            break;
                    }
                    break;
                case "INSTRUCCIONES":
                    switch (raiz.hijos.length) {
                        case 1:
                            result = primer.Recorrer(raiz.hijos[0]);
                            break;
                    }
                    break;
                case "PRINCIPAL":
                    result = primer.Recorrer(raiz.hijos[0]);
                    tabla.agregarSimbolo("Principal", "vacio", 'metodo', primer.GenerarAmbito(), 0, raiz.posicion);
                    break;
                case "TIPO":
                    result = raiz.hijos[0].token;
                    break;
                case "VARIABLE":
                    switch (raiz.hijos.length) {
                        case 3:
                            var tipo = primer.Recorrer(raiz.hijos[0]);
                            var mas = [];
                            mas = primer.Recorrer(raiz.hijos[1]);
                            var asignar = primer.Recorrer(raiz.hijos[2]);
                            for (var i = 0; i < mas.length; i++) {
                                var correcto = tabla.agregarSimbolo(mas[i], tipo, 'variable', primer.GenerarAmbito(), 0, primer.ObtenerPosicion());
                                tamanio += 1;
                            }
                            break;
                        case 6:
                            var tipo = primer.Recorrer(raiz.hijos[5]);
                            var tam = primer.Recorrer(raiz.hijos[3]);
                            tabla.agregarSimbolo(raiz.hijos[2].token, tipo, 'arreglo', primer.GenerarAmbito(), tam, primer.ObtenerPosicion());
                            tamanio += 1;

                            break;
                    }
                    posicion += 1;
                    break;
                case "ASIGNAR":
                    switch (raiz.hijos.length) {
                        case 1:
                            break;
                        case 2:
                            break;
                    }
                    break;
                case "MasVARIABLE":
                    switch (raiz.hijos.length) {
                        case 1:
                            var variables = [raiz.hijos[0].token];
                            result = variables;
                            break;
                        case 3:
                            var variables = primer.Recorrer(raiz.hijos[0]);
                            variables.push(raiz.hijos[2].token);
                            result = variables;
                            break;
                    }
                    break;
                case "DIMEN":
                    switch (raiz.hijos.length) {
                        case 3:
                            result = primer.Recorrer(raiz.hijos[1]);
                            break;
                        case 4:
                            var num1 = primer.Recorrer(raiz.hijos[0]);
                            var num2 = primer.Recorrer(raiz.hijos[2]);
                            result = num1 * num2;
                            break;
                    }
                    break;
                case "DIM":
                    switch (raiz.hijos.length) {
                        case 1:
                            result = raiz.hijos[0].token;
                            break;
                        case 3:
                            result = raiz.hijos[2].token - raiz.hijos[0].token;
                            break;
                    }
                    break;
                case "ASIGNACION":
                    break;
                case "ACCESO":
                    break;
                case "ELEMENTO":
                    tamanio = 0;
                    global = false;
                    posLocal = 0;
                    var id = raiz.hijos[2].token;
                    ambito.add(id);
                    result = primer.Recorrer(raiz.hijos[4]);
                    ambito.pop();
                    global = true;
                    tabla.agregarSimbolo(id, "elemento", 'elemento', primer.GenerarAmbito(), tamanio, primer.ObtenerPosicion());
                    break;
                case "METODO":
                    tamanio = 0;
                    global = false;
                    posLocal = 0;
                    switch (raiz.hijos.length) {
                        case 9:
                            var tipo = primer.Recorrer(raiz.hijos[0]);
                            ambito.add(raiz.hijos[2].token);
                            primer.Recorrer(raiz.hijos[4]);
                            primer.Recorrer(raiz.hijos[7]);
                            global = true;
                            tabla.agregarSimbolo(raiz.hijos[2].token, tipo, 'metodo', primer.GenerarAmbito(), tamanio, primer.ObtenerPosicion());
                            break;
                        case 10:
                            var tipo = primer.Recorrer(raiz.hijos[0]);
                            var dimen = primer.Recorrer(raiz.hijos[1]);
                            ambito.add(raiz.hijos[2].token);
                            primer.Recorrer(raiz.hijos[5]);
                            primer.Recorrer(raiz.hijos[8]);
                            global = true;
                            tabla.agregarSimbolo(raiz.hijos[3].token, tipo, 'metodo', primer.GenerarAmbito(), tamanio, primer.ObtenerPosicion());
                            break;
                    }
                    //
                    ambito.pop();
                    break;
                case "PARAMETRO":
                    switch (raiz.hijos.length) {
                        case 2:
                            var tipo = primer.Recorrer(raiz.hijos[0]);
                            tabla.agregarSimbolo(raiz.hijos[1].token, tipo, 'parametro', primer.GenerarAmbito(), 0, primer.ObtenerPosicion());
                            break;
                        case 3:
                            var tipo = primer.Recorrer(raiz.hijos[0]);
                            var tam = primer.Recorrer(raiz.hijos[2]);
                            tabla.agregarSimbolo(raiz.hijos[1].token, tipo, 'parametro', primer.GenerarAmbito(), tam, primer.ObtenerPosicion());
                            break;
                        case 4:
                            primer.Recorrer(raiz.hijos[0]);
                            var tipo = primer.Recorrer(raiz.hijos[2]);
                            tabla.agregarSimbolo(raiz.hijos[3].token, tipo, 'parametro', primer.GenerarAmbito(), 0, primer.ObtenerPosicion());
                            break;
                        case 2:
                            primer.Recorrer(raiz.hijos[0]);
                            var tipo = primer.Recorrer(raiz.hijos[2]);
                            var tam = primer.Recorrer(raiz.hijos[3]);
                            tabla.agregarSimbolo(raiz.hijos[1].token, tipo, 'parametro', primer.GenerarAmbito(), tam, primer.ObtenerPosicion());
                            break;
                    }
                    break;
                case "INSTRUCCION":
                    switch (raiz.hijos.length) {
                        case 1:
                            primer.Recorrer(raiz.hijos[0]);
                            break;
                        case 2:
                            primer.Recorrer(raiz.hijos[0]);
                            primer.Recorrer(raiz.hijos[1]);
                            break;
                    }
                    break;
                case "INST":
                    switch (raiz.hijos.length) {
                        case 1:
                            primer.Recorrer(raiz.hijos[0]);
                            break;
                        case 2:
                            if (raiz.hijos[0].token === "INSTANCIA") {
                                primer.Recorrer(raiz.hijos[0]);
                            }
                            break;
                        case 3:
                            primer.Recorrer(raiz.hijos[1]);
                            break;
                    }
                    break;
                case "SI":
                    switch (raiz.hijos.length) {
                        case 8:
                            primer.Recorrer(raiz.hijos[6]);
                            break;
                        case 12:
                            primer.Recorrer(raiz.hijos[6]);
                            primer.Recorrer(raiz.hijos[8]);
                            break;
                    }
                    break;
                case "SWITCH":
                    switch (raiz.hijos.length) {
                        case 9:
                            primer.Recorrer(raiz.hijos[7]);
                            break;
                        case 10:
                            primer.Recorrer(raiz.hijos[7]);
                            primer.Recorrer(raiz.hijos[8]);
                            break;
                    }
                    break;
                case "MODO":
                    break;
                case "CASO":
                    switch (raiz.hijos.length) {
                        case 4:
                            primer.Recorrer(raiz.hijos[3]);
                            break;
                        case 5:
                            primer.Recorrer(raiz.hijos[0]);
                            primer.Recorrer(raiz.hijos[4]);
                            break;
                        case 6:
                            primer.Recorrer(raiz.hijos[5]);
                            break;
                        case 7:
                            primer.Recorrer(raiz.hijos[0]);
                            primer.Recorrer(raiz.hijos[6]);
                            break;
                    }
                    break;
                case "PUNTUAL":
                    switch (raiz.hijos.length) {
                        case 1:

                            break;
                    }
                    break;
                case "DEFECTO":
                    switch (raiz.hijos.length) {
                        case 3:
                            primer.Recorrer(raiz.hijos[2]);
                            break;
                    }
                    break;
                case "CICLO":
                    switch (raiz.hijos.length) {
                        case 5:
                            primer.Recorrer(raiz.hijos[3]);
                            break;
                        case 6:
                            primer.Recorrer(raiz.hijos[0]);
                            primer.Recorrer(raiz.hijos[1]);
                            break;
                        case 7:
                            primer.Recorrer(raiz.hijos[2]);
                            primer.Recorrer(raiz.hijos[5]);
                            break;
                        case 8:
                            primer.Recorrer(raiz.hijos[2]);
                            primer.Recorrer(raiz.hijos[6]);
                            break;
                        case 9:
                            primer.Recorrer(raiz.hijos[2]);
                            primer.Recorrer(raiz.hijos[6]);
                            break;
                        case 10:
                            primer.Recorrer(raiz.hijos[2]);
                            primer.Recorrer(raiz.hijos[6]);
                            primer.Recorrer(raiz.hijos[8]);
                            break;
                    }
                    break;
                case "FOR":
                    switch (raiz.hijos.length) {
                        case 7:
                            primer.Recorrer(raiz.hijos[2]);
                            primer.Recorrer(raiz.hijos[5]);
                            break;
                        case 9:
                            primer.Recorrer(raiz.hijos[2]);
                            primer.Recorrer(raiz.hijos[3]);
                            primer.Recorrer(raiz.hijos[5]);
                            primer.Recorrer(raiz.hijos[8]);
                            break;
                        case 10:
                            primer.Recorrer(raiz.hijos[2]);
                            primer.Recorrer(raiz.hijos[3]);
                            primer.Recorrer(raiz.hijos[5]);
                            primer.Recorrer(raiz.hijos[8]);
                            break;
                    }
                    break;
                case "INSTANCIA":
                    switch (raiz.hijos.length) {
                        case 4:
                            primer.Recorrer(raiz.hijos[2]);
                            break;
                    }
                    break;
                case "VALOR":
                    switch (raiz.hijos.length) {
                        case 0:
                            break;
                        case 1:
                            primer.Recorrer(raiz.hijos[0]);
                            break;
                        case 3:
                            primer.Recorrer(raiz.hijos[0]);
                            primer.Recorrer(raiz.hijos[2]);
                            break;
                    }
                    break;
                case "BASE":
                    switch (raiz.hijos.length) {
                        case 1:
                            primer.Recorrer(raiz.hijos[0]);
                            break;
                    }
                    break;
                case "OTROS":
                    switch (raiz.hijos.length) {
                        case 1:
                            primer.Recorrer(raiz.hijos[0]);
                            break;
                        case 3:
                            primer.Recorrer(raiz.hijos[0]);
                            primer.Recorrer(raiz.hijos[2]);
                            break;
                        case 4:
                            primer.Recorrer(raiz.hijos[2]);
                            break;
                        case 6:
                            primer.Recorrer(raiz.hijos[2]);
                            primer.Recorrer(raiz.hijos[4]);
                            break;
                        case 8:
                            primer.Recorrer(raiz.hijos[2]);
                            primer.Recorrer(raiz.hijos[4]);
                            primer.Recorrer(raiz.hijos[6]);
                            break;
                    }
                    break;
                case "TROW":
                    switch (raiz.hijos.length) {
                        case 4:
                            primer.Recorrer(raiz.hijos[2]);
                            break;
                    }
                    break;
                case "EXCEPCION":
                    switch (raiz.hijos.length) {
                        case 1:
                            //primer.Recorrer(raiz.hijos[0]);
                            break;
                    }
                    break;
                case "OP":
                    // result = primer.Recorrer(raiz.hijos[0]);
                    break;
                case "E":
                    if (raiz.hijos.length === 1) {
                        console.log("1: " + raiz.nombre);
                    } else if (raiz.hijos.length === 2) {
                        console.log("2: " + raiz.nombre);
                    } else if (raiz.hijos.length === 3) {
                        console.log("3: " + raiz.nombre);
                        result = primer.Recorrer(raiz.hijos[0]);
                        result = primer.Recorrer(raiz.hijos[2]);
                    } else if (raiz.hijos.length === 0) {
                        console.log("0: " + raiz.nombre);
                    }
                    break;
                case "numero":
                    result = primer.Recorrer(raiz.hijos[0]);
                    window.alert("Entro");
                    break;

            }
        }
        return result;
    }

    ObtenerPosicion() {
        if (global) {
            return posGlobal++;
        }
        return posLocal++;
    }

    GenerarAmbito() {
        var auxiliar = new Stack();
        var cadena = ambito.peek();
        var size = ambito.size();
        for (var i = 0; i < size - 1; i++) {
            auxiliar.add(ambito.peek());
            ambito.pop();
            cadena = ambito.peek() + "_" + cadena;
        }
        for (var i = 0; i < auxiliar.size(); i++) {
            ambito.add(auxiliar.peek());
            auxiliar.pop();
        }

        return cadena;
    }

}
