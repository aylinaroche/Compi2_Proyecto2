

/* global primer, listaSimbolo, tabla, heap, monticulo, ambito, codigo */
tamanio = 0;

class Recorrido {

    Recorrer(raiz) {
        var result = null;

        if (raiz !== null) {
            //  console.log(raiz.nombre+":"+raiz.hijos.length);
            switch (raiz.nombre) {
                case "ENTRADA":
                    ambito.add("global");
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
                case "VARIABLE":
                    switch (raiz.hijos.length) {
                        case 3:
                            var tipo = primer.Recorrer(raiz.hijos[0]);
                            var mas = [];
                            mas = primer.Recorrer(raiz.hijos[1]);
                            var asignar = primer.Recorrer(raiz.hijos[2]);
                            for (var i = 0; i < mas.length; i++) {
                                var correcto = tabla.agregarSimbolo(mas[i], tipo, 'variable', ambito.peek(), 0, raiz.posicion, listaSimbolo);
                            }
                            
                            break;
                        case 6:
                            var tipo = primer.Recorrer(raiz.hijos[5]);
                            var tam = primer.Recorrer(raiz.hijos[3]);
                            tabla.agregarSimbolo(raiz.hijos[2].token, tipo, 'arreglo', ambito.peek(), tam, raiz.posicion, listaSimbolo);
                            break;
                    }
                    tamanio += 1;
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
                case "ELEMENTO":
                    tamanio = 0;
                    var id = raiz.hijos[2].token;
                    ambito.add(id);
                    result = primer.Recorrer(raiz.hijos[4]);
                    ambito.pop();
                    tabla.agregarSimbolo(id, "elemento", 'elemento', ambito.peek(), tamanio, raiz.posicion, listaSimbolo);

                    codigo.agregarC3D(id + "{\n\n" + result + "\n}\n\n");
                    break;
                case "PRINCIPAL":
                    result = primer.Recorrer(raiz.hijos[0]);
                    tabla.agregarSimbolo("Principal", "vacio", 'metodo', ambito.peek(), 0, raiz.posicion, listaSimbolo);
                    break;
                case "METODO":
                    switch (raiz.hijos.length) {
                        case 9:
                            result = primer.Recorrer(raiz.hijos[0]);
                            tabla.agregarSimbolo(raiz.hijos[2].token, result, 'metodo', ambito.peek(), 0, raiz.posicion, listaSimbolo);
                            break;
                        case 10:
                            result = primer.Recorrer(raiz.hijos[0]);
                            var dimen = primer.Recorrer(raiz.hijos[1]);
                            tabla.agregarSimbolo(raiz.hijos[3].token, result, 'metodo', ambito.peek(), 0, raiz.posicion, listaSimbolo);
                            break;
                    }
                    break;
                case "TIPO":
                    result = raiz.hijos[0].token;
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
                    }
                    break;
                case "OP":
                    result = primer.Recorrer(raiz.hijos[0]);
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

}