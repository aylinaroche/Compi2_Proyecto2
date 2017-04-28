
/* global segundo, ambito */

class GenerarC3D {

    Recorrer(raiz) {
        var result = null;
        
        if (raiz !== null) {
            //   console.log(raiz.nombre+":"+raiz.hijos.length);
            switch (raiz.nombre) {
                case "ENTRADA":
                    ambito.add("global");
                    switch (raiz.hijos.length) {
                        case 1:
                            result = segundo.Recorrer(raiz.hijos[0]);
                            break;
                        case 2:
                            result = segundo.Recorrer(raiz.hijos[0]);
                            result = segundo.Recorrer(raiz.hijos[1]);
                            break;
                    }
                    break;
                case "INSTRUCCIONES":
                    switch (raiz.hijos.length) {
                        case 1:
                            result = segundo.Recorrer(raiz.hijos[0]);
                            break;
                    }
                    break;
                case "VARIABLE":
                    switch (raiz.hijos.length) {
                        case 3:
                            var tipo = segundo.Recorrer(raiz.hijos[0]);
                            var mas = [];
                            mas = segundo.Recorrer(raiz.hijos[1]);
                         //   var asignar = segundo.Recorrer(raiz.hijos[2]);
//                     //       for (var i = 0; i < mas.length; i++) {
//                                tabla.agregarSimbolo(mas[i], tipo, 'variable', 'global', 0, raiz.posicion, listaSimbolo);
//                            }
//                            break;
                        case 6:
                            //var tipo = segundo.Recorrer(raiz.hijos[5]);
                           // var tam = segundo.Recorrer(raiz.hijos[3]);
//                            tabla.agregarSimbolo(raiz.hijos[2].token, tipo, 'arreglo', 'global', tam, raiz.posicion, listaSimbolo);
//                            break;
                    }
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
                            var variables = segundo.Recorrer(raiz.hijos[0]);
                            variables.push(raiz.hijos[2].token);
                            result = variables;
                            break;
                    }
                    break;
                case "DIMEN":
                    switch (raiz.hijos.length) {
                        case 3:
                            result = segundo.Recorrer(raiz.hijos[1]);
                            break;
                        case 4:
                            var num1 = segundo.Recorrer(raiz.hijos[0]);
                            var num2 = segundo.Recorrer(raiz.hijos[2]);
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
                case "ELEMENTO":
//                    result = segundo.Recorrer(raiz.hijos[0]);
//                    tabla.agregarSimbolo(raiz.hijos[2].token, "-", 'elemento', 'global', tam, raiz.posicion, listaSimbolo);

                    break;
                case "PRINCIPAL":
//                    result = segundo.Recorrer(raiz.hijos[0]);
//                    tabla.agregarSimbolo("Principal", "vacio", 'metodo', 'global', tam, raiz.posicion, listaSimbolo);
//                    break;
                case "METODO":
//                    switch (raiz.hijos.length) {
//                        case 9:
//                            result = segundo.Recorrer(raiz.hijos[0]);
//                            tabla.agregarSimbolo(raiz.hijos[2].token, result, 'metodo', 'global', 0, raiz.posicion, listaSimbolo);
//                            break;
//                        case 10:
//                            result = segundo.Recorrer(raiz.hijos[0]);
//                            var dimen = segundo.Recorrer(raiz.hijos[1]);
//                            tabla.agregarSimbolo(raiz.hijos[3].token, result, 'metodo', 'global', 0, raiz.posicion, listaSimbolo);
//                            break;
//                    }
//                    break;
                case "TIPO":
                    result = raiz.hijos[0].token;
                    break;
                case "OP":
                    result = segundo.Recorrer(raiz.hijos[0]);
                    break;
                case "E":
                    if (raiz.hijos.length === 1) {
                        console.log("1: " + raiz.nombre);
                    } else if (raiz.hijos.length === 2) {
                        console.log("2: " + raiz.nombre);
                    } else if (raiz.hijos.length === 3) {
                        console.log("3: " + raiz.nombre);
                        result = segundo.Recorrer(raiz.hijos[0]);
                        result = segundo.Recorrer(raiz.hijos[2]);
                    } else if (raiz.hijos.length === 0) {
                        console.log("0: " + raiz.nombre);
                    }


                    break;
                case "numero":
                    result = segundo.Recorrer(raiz.hijos[0]);
                    window.alert("Entro");
                    break;

            }
        }
        return result;
    }

}