
/* global segundo, ambito, codigo, funcion, reporte */

class GenerarC3D {

    Recorrer(raiz) {
        var result = null;
        if (raiz !== null) {
//  console.log(raiz.nombre+":"+raiz.hijos.length);
            switch (raiz.nombre) {
                case "ENTRADA":
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
                case "PRINCIPAL":
                    ambito.add("Principal");
                    codigo.agregarC3D("Principal(){\n\n");
                    segundo.Recorrer(raiz.hijos[0]);
                    codigo.agregarC3D("\n}\n\n");
                    ambito.pop();
                    break;
                case "TIPO":
                    result = raiz.hijos[0].token;
                    break;
                case "VARIABLE":
                    switch (raiz.hijos.length) {
                        case 3:
                            var tipo = segundo.Recorrer(raiz.hijos[0]);
                            var mas = [];
                            mas = segundo.Recorrer(raiz.hijos[1]);
                            var asignar = segundo.Recorrer(raiz.hijos[2]);
                            for (var i = 0; i < mas.length; i++) {
                                funcion.crearVariable(mas[i], tipo, asignar);
                            }
                            break;
                        case 6:
                            var tipo = segundo.Recorrer(raiz.hijos[5]);
                            var tam = segundo.Recorrer(raiz.hijos[3]);
                            break;
                    }
                    break;
                case "ASIGNAR":
                    switch (raiz.hijos.length) {
                        case 1:
                            result = new NodoC3D("-1", "nulo", "", "");
                            break;
                        case 2:
                            result = segundo.Recorrer(raiz.hijos[1]);
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
                case "ASIGNACION":
                    switch (raiz.hijos.length) {
                        case 3:
                            var nodo = segundo.Recorrer(raiz.hijos[2]);
                            funcion.asignarVariable(raiz.hijos[0].token, nodo);
                            break;
                        case 4:
                            var nodo = segundo.Recorrer(raiz.hijos[3]);
                            break;
                    }
                    break;
                case "ACCESO":
                    break;
                case "ELEMENTO":
                    var id = raiz.hijos[2].token;
                    ambito.add(id);
                    codigo.agregarC3D("\n"+id + "(){\n\n");
                    result = segundo.Recorrer(raiz.hijos[4]);
                    codigo.agregarC3D("\n}\n\n");
                    ambito.pop();
                    break;
                case "METODO":
                    switch (raiz.hijos.length) {
                        case 9:
                            var tipo = segundo.Recorrer(raiz.hijos[0]);
                            ambito.add(raiz.hijos[2].token);
                            codigo.agregarC3D(raiz.hijos[2].token + "(){\n\n");
                            segundo.Recorrer(raiz.hijos[4]);
                            segundo.Recorrer(raiz.hijos[7]);
                            codigo.agregarC3D("\n}\n\n");
                            break;
                        case 10:
                            var tipo = segundo.Recorrer(raiz.hijos[0]);
                            var dimen = segundo.Recorrer(raiz.hijos[1]);
                            ambito.add(raiz.hijos[2].token);
                            codigo.agregarC3D(raiz.hijos[2].token + "(){\n\n");
                            segundo.Recorrer(raiz.hijos[5]);
                            segundo.Recorrer(raiz.hijos[8]);
                            codigo.agregarC3D("\n}\n\n");
                            break;
                    }
//
                    ambito.pop();
                    break;
                case "PARAMETRO":
                    switch (raiz.hijos.length) {
                        case 2:
                            var tipo = segundo.Recorrer(raiz.hijos[0]);
                            break;
                        case 3:
                            var tipo = segundo.Recorrer(raiz.hijos[0]);
                            var tam = segundo.Recorrer(raiz.hijos[2]);
                            break;
                        case 4:
                            segundo.Recorrer(raiz.hijos[0]);
                            var tipo = segundo.Recorrer(raiz.hijos[2]);
                            break;
                        case 2:
                            segundo.Recorrer(raiz.hijos[0]);
                            var tipo = segundo.Recorrer(raiz.hijos[2]);
                            var tam = segundo.Recorrer(raiz.hijos[3]);
                            break;
                    }
                    break;
                case "INSTRUCCION":
                    switch (raiz.hijos.length) {
                        case 1:
                            segundo.Recorrer(raiz.hijos[0]);
                            break;
                        case 2:
                            segundo.Recorrer(raiz.hijos[0]);
                            segundo.Recorrer(raiz.hijos[1]);
                            break;
                    }
                    break;
                case "INST":
                    switch (raiz.hijos.length) {
                        case 1:
                            segundo.Recorrer(raiz.hijos[0]);
                            break;
                        case 2:
                            if (raiz.hijos[0].token === "INSTANCIA") {
                                segundo.Recorrer(raiz.hijos[0]);
                            }
                            break;
                        case 3:
                            segundo.Recorrer(raiz.hijos[1]);
                            break;
                    }
                    break;
                case "SI":
                    switch (raiz.hijos.length) {
                        case 8:
                            segundo.Recorrer(raiz.hijos[6]);
                            break;
                        case 12:
                            segundo.Recorrer(raiz.hijos[6]);
                            segundo.Recorrer(raiz.hijos[8]);
                            break;
                    }
                    break;
                case "SWITCH":
                    switch (raiz.hijos.length) {
                        case 9:
                            segundo.Recorrer(raiz.hijos[7]);
                            break;
                        case 10:
                            segundo.Recorrer(raiz.hijos[7]);
                            segundo.Recorrer(raiz.hijos[8]);
                            break;
                    }
                    break;
                case "MODO":
                    break;
                case "CASO":
                    switch (raiz.hijos.length) {
                        case 4:
                            segundo.Recorrer(raiz.hijos[3]);
                            break;
                        case 5:
                            segundo.Recorrer(raiz.hijos[0]);
                            segundo.Recorrer(raiz.hijos[4]);
                            break;
                        case 6:
                            segundo.Recorrer(raiz.hijos[5]);
                            break;
                        case 7:
                            segundo.Recorrer(raiz.hijos[0]);
                            segundo.Recorrer(raiz.hijos[6]);
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
                            segundo.Recorrer(raiz.hijos[2]);
                            break;
                    }
                    break;
                case "CICLO":
                    switch (raiz.hijos.length) {
                        case 5:
                            segundo.Recorrer(raiz.hijos[3]);
                            break;
                        case 6:
                            segundo.Recorrer(raiz.hijos[0]);
                            segundo.Recorrer(raiz.hijos[1]);
                            break;
                        case 7:
                            segundo.Recorrer(raiz.hijos[2]);
                            segundo.Recorrer(raiz.hijos[5]);
                            break;
                        case 8:
                            segundo.Recorrer(raiz.hijos[2]);
                            segundo.Recorrer(raiz.hijos[6]);
                            break;
                        case 9:
                            segundo.Recorrer(raiz.hijos[2]);
                            segundo.Recorrer(raiz.hijos[6]);
                            break;
                        case 10:
                            segundo.Recorrer(raiz.hijos[2]);
                            segundo.Recorrer(raiz.hijos[6]);
                            segundo.Recorrer(raiz.hijos[8]);
                            break;
                    }
                    break;
                case "FOR":
                    switch (raiz.hijos.length) {
                        case 7:
                            segundo.Recorrer(raiz.hijos[2]);
                            segundo.Recorrer(raiz.hijos[5]);
                            break;
                        case 9:
                            segundo.Recorrer(raiz.hijos[2]);
                            segundo.Recorrer(raiz.hijos[3]);
                            segundo.Recorrer(raiz.hijos[5]);
                            segundo.Recorrer(raiz.hijos[8]);
                            break;
                        case 10:
                            segundo.Recorrer(raiz.hijos[2]);
                            segundo.Recorrer(raiz.hijos[3]);
                            segundo.Recorrer(raiz.hijos[5]);
                            segundo.Recorrer(raiz.hijos[8]);
                            break;
                    }
                    break;
                case "INSTANCIA":
                    switch (raiz.hijos.length) {
                        case 4:
                            result = segundo.Recorrer(raiz.hijos[2]);
                            funcion.llamarMetodo(raiz.hijos[0].token);
                            break;
                    }
                    break;
                case "VALOR":
                    switch (raiz.hijos.length) {
                        case 0:
                            break;
                        case 1:
                            segundo.Recorrer(raiz.hijos[0]);
                            break;
                        case 3:
                            segundo.Recorrer(raiz.hijos[0]);
                            segundo.Recorrer(raiz.hijos[2]);
                            break;
                    }
                    break;
                case "BASE":
                    switch (raiz.hijos.length) {
                        case 1:
                            segundo.Recorrer(raiz.hijos[0]);
                            break;
                    }
                    break;
                case "OTROS":
                    switch (raiz.hijos.length) {
                        case 1:
                            segundo.Recorrer(raiz.hijos[0]);
                            break;
                        case 3:
                            segundo.Recorrer(raiz.hijos[0]);
                            segundo.Recorrer(raiz.hijos[2]);
                            break;
                        case 4:
                            segundo.Recorrer(raiz.hijos[2]);
                            break;
                        case 6:
                            segundo.Recorrer(raiz.hijos[2]);
                            segundo.Recorrer(raiz.hijos[4]);
                            break;
                        case 8:
                            segundo.Recorrer(raiz.hijos[2]);
                            segundo.Recorrer(raiz.hijos[4]);
                            segundo.Recorrer(raiz.hijos[6]);
                            break;
                    }
                    break;
                case "TROW":
                    switch (raiz.hijos.length) {
                        case 4:
                            segundo.Recorrer(raiz.hijos[2]);
                            break;
                    }
                    break;
                case "EXCEPCION":
                    switch (raiz.hijos.length) {
                        case 1:
                            //segundo.Recorrer(raiz.hijos[0]);
                            break;
                    }
                    break;
                case "OP":
                    var nodo = new NodoC3D();
                    nodo = segundo.Recorrer(raiz.hijos[0]);
                    if (nodo !== null) {
                        result = nodo;
                    } else {
                        result = -1;
                        console.log("-> NULO\n");
                    }
                    break;
                case "E":
                    switch (raiz.hijos.length) {
                        case 4: //create
                            result = new NodoC3D("create", "create", "", "");
                            break;
                        case 1:
                            switch (raiz.hijos[0].nombre) {
                                case "numero":
                                    result = new NodoC3D(raiz.hijos[0].token, "num", "", "");
                                    break;
                                case "id":
                                    result = new NodoC3D(raiz.hijos[0].token, "str", "", "");
                                    break;
                                case "cadena":
                                    result = new NodoC3D(raiz.hijos[0].token, "str", "", "");
                                    break;
                                case "cadenaSimple":
                                    result = new NodoC3D(raiz.hijos[0].token, "str", "", "");
                                    break;
                                case "nulo":
                                    result = new NodoC3D(raiz.hijos[0].token, "num", "", "");
                                    break;
                                default:
                                    result = segundo.Recorrer(raiz.hijos[0]);
                            }
                            break;
                        case 2:
                            switch (raiz.hijos[1].nombre) {
                                case '+':
                                    var izq = segundo.Recorrer(raiz.hijos[0]);
                                    if (izq.tipo === "num") {
                                        var temp = codigo.generaTemp();
                                        var c3d = temp + " = " + izq.cadena + " + 1;\n";
                                        codigo.agregarC3D(c3d);
                                        result = new NodoC3D(temp, "num", "", "");
                                    }
                                    break;
                                case '-':
                                    var izq = segundo.Recorrer(raiz.hijos[0]);
                                    if (izq.tipo === "num") {
                                        var temp = codigo.generaTemp();
                                        var c3d = temp + " = " + izq.cadena + " - 1;\n";
                                        codigo.agregarC3D(c3d);
                                        result = new NodoC3D(temp, "num", "", "");
                                    }
                                    break;
                                case 'ACESSO':
                                    var izq = segundo.Recorrer(raiz.hijos[1]);
//                                    if (izq.tipo === "num") {
//                                        var temp = codigo.generaTemp();
//                                        var c3d = temp + " = " + izq.cadena + " + 1;\n";
//                                        codigo.agregarC3D(c3d);
//                                        result = new NodoC3D(temp, "num", "", "");
//                                    }
                                    break;
                            }
                            break;
                        case 3:
                            switch (raiz.hijos[1].nombre) {
                                case '+':
                                    var izq = segundo.Recorrer(raiz.hijos[0]);
                                    var der = segundo.Recorrer(raiz.hijos[2]);
                                    if (izq.tipo === "str" || der.tipo === "str") {
                                        var temp = codigo.generaTemp();
                                        var c3d = temp + " = " + izq.cadena + " + " + der.cadena + ";\n";
                                        codigo.agregarC3D(c3d);
                                        result = new NodoC3D(temp, "str", "", "");
                                    } else {
                                        var temp = codigo.generaTemp();
                                        var c3d = temp + " = " + izq.cadena + " + " + der.cadena + ";\n";
                                        codigo.agregarC3D(c3d);
                                        result = new NodoC3D(temp, "num", "", "");
                                    }
                                    break;
                                case '-':
                                    var izq = segundo.Recorrer(raiz.hijos[0]);
                                    var der = segundo.Recorrer(raiz.hijos[2]);
                                    if (izq.tipo === "str" || der.tipo === "str") {
                                        reporte.agregarError("Error Semantico", "Tipo incorrecto en resta", 0, 0);
                                    } else if (izq.tipo === "bool" && der.tipo === "bool") {
                                        reporte.agregarError("Error Semantico", "Tipo incorrecto en resta", 0, 0);
                                    } else {
                                        var temp = codigo.generaTemp();
                                        var c3d = temp + " = " + izq.cadena + " - " + der.cadena + ";\n";
                                        codigo.agregarC3D(c3d);
                                        result = new NodoC3D(temp, "num", "", "");
                                    }
                                    break;
                                case '*':
                                    var izq = segundo.Recorrer(raiz.hijos[0]);
                                    var der = segundo.Recorrer(raiz.hijos[2]);
                                    if (izq.tipo === "str" || der.tipo === "str") {
                                        reporte.agregarError("Error Semantico", "Tipo incorrecto en multiplicacion", 0, 0);
                                    } else {
                                        var temp = codigo.generaTemp();
                                        var c3d = temp + " = " + izq.cadena + " * " + der.cadena + ";\n";
                                        codigo.agregarC3D(c3d);
                                        result = new NodoC3D(temp, "num", "", "");
                                    }
                                    break;
                                case '/':
                                    var izq = segundo.Recorrer(raiz.hijos[0]);
                                    var der = segundo.Recorrer(raiz.hijos[2]);
                                    if (izq.tipo === "str" || der.tipo === "str") {
                                        reporte.agregarError("Error Semantico", "Tipo incorrecto en division", 0, 0);
                                    } else if (izq.tipo === "bool" && der.tipo === "bool") {
                                        reporte.agregarError("Error Semantico", "Tipo incorrecto en division", 0, 0);
                                    } else {
                                        var temp = codigo.generaTemp();
                                        var c3d = temp + " = " + izq.cadena + " / " + der.cadena + ";\n";
                                        codigo.agregarC3D(c3d);
                                        result = new NodoC3D(temp, "num", "", "");
                                    }
                                    break;
                                case '%':
                                    var izq = segundo.Recorrer(raiz.hijos[0]);
                                    var der = segundo.Recorrer(raiz.hijos[2]);
                                    if (izq.tipo === "str" || der.tipo === "str") {
                                        reporte.agregarError("Error Semantico", "Tipo incorrecto en division", 0, 0);
                                    } else if (izq.tipo === "bool" && der.tipo === "bool") {
                                        reporte.agregarError("Error Semantico", "Tipo incorrecto en division", 0, 0);
                                    } else {
                                        var temp = codigo.generaTemp();
                                        var c3d = temp + " = " + izq.cadena + " % " + der.cadena + ";\n";
                                        codigo.agregarC3D(c3d);
                                        result = new NodoC3D(temp, "num", "", "");
                                    }
                                    break;
                                case '^':
                                    var izq = segundo.Recorrer(raiz.hijos[0]);
                                    var der = segundo.Recorrer(raiz.hijos[2]);
                                    if (izq.tipo === "str" || der.tipo === "str") {
                                        reporte.agregarError("Error Semantico", "Tipo incorrecto en division", 0, 0);
                                    } else if (izq.tipo === "bool" && der.tipo === "bool") {
                                        reporte.agregarError("Error Semantico", "Tipo incorrecto en division", 0, 0);
                                    } else {
                                        var temp = codigo.generaTemp();
                                        var c3d = temp + " = " + izq.cadena + " ^ " + der.cadena + ";\n";
                                        codigo.agregarC3D(c3d);
                                        result = new NodoC3D(temp, "num", "", "");
                                    }
                                    break;
                                case '==':
                                    var izq = segundo.Recorrer(raiz.hijos[0]);
                                    var der = segundo.Recorrer(raiz.hijos[2]);

                                    if (izq.tipo === der.tipo) {
                                        var l1 = codigo.generaL();
                                        var l2 = codigo.generaL();
                                        var cadena = "if " + izq.cadena + "==" + der.cadena + " then go to " + l1 + "\n go to " + l2 + ";\n";
                                        codigo.agregarC3D(cadena);
                                        result = new NodoC3D(temp, "bool", l1, l2);
                                    } else {
                                        reporte.agregarError("Error Semantico", "Tipo incorrecto en ==", 0, 0);
                                    }
                                    break;
                                case '!=':
                                    var izq = segundo.Recorrer(raiz.hijos[0]);
                                    var der = segundo.Recorrer(raiz.hijos[2]);

                                    if (izq.tipo === der.tipo) {
                                        var l1 = codigo.generaL();
                                        var l2 = codigo.generaL();
                                        var cadena = "if " + izq.cadena + "!=" + der.cadena + " then go to " + l1 + "\n go to " + l2 + ";\n";
                                        codigo.agregarC3D(cadena);
                                        result = new NodoC3D(temp, "bool", l1, l2);
                                    } else {
                                        reporte.agregarError("Error Semantico", "Tipo incorrecto en ==", 0, 0);
                                    }
                                    break;
                                case '>':
                                    var izq = segundo.Recorrer(raiz.hijos[0]);
                                    var der = segundo.Recorrer(raiz.hijos[2]);

                                    if (izq.tipo === der.tipo && izq.tipo !== "bool") {
                                        var l1 = codigo.generaL();
                                        var l2 = codigo.generaL();
                                        var cadena = "if " + izq.cadena + ">" + der.cadena + " then go to " + l1 + "\n go to " + l2 + ";\n";
                                        codigo.agregarC3D(cadena);
                                        result = new NodoC3D(temp, "bool", l1, l2);
                                    } else {
                                        reporte.agregarError("Error Semantico", "Tipo incorrecto en >", 0, 0);
                                    }
                                    break;
                                case '<':
                                    var izq = segundo.Recorrer(raiz.hijos[0]);
                                    var der = segundo.Recorrer(raiz.hijos[2]);

                                    if (izq.tipo === der.tipo && izq.tipo !== "bool") {
                                        var l1 = codigo.generaL();
                                        var l2 = codigo.generaL();
                                        var cadena = "if " + izq.cadena + "<" + der.cadena + " then go to " + l1 + "\n go to " + l2 + ";\n";
                                        codigo.agregarC3D(cadena);
                                        result = new NodoC3D(temp, "bool", l1, l2);
                                    } else {
                                        reporte.agregarError("Error Semantico", "Tipo incorrecto en <", 0, 0);
                                    }
                                    break;
                                case '>=':
                                    var izq = segundo.Recorrer(raiz.hijos[0]);
                                    var der = segundo.Recorrer(raiz.hijos[2]);

                                    if (izq.tipo === "num" && der.tipo === "num") {
                                        var l1 = codigo.generaL();
                                        var l2 = codigo.generaL();
                                        var cadena = "if " + izq.cadena + ">=" + der.cadena + " then go to " + l1 + "\n go to " + l2 + ";\n";
                                        codigo.agregarC3D(cadena);
                                        result = new NodoC3D(temp, "bool", l1, l2);
                                    } else {
                                        reporte.agregarError("Error Semantico", "Tipo incorrecto en >=", 0, 0);
                                    }
                                    break;
                                case '<=':
                                    var izq = segundo.Recorrer(raiz.hijos[0]);
                                    var der = segundo.Recorrer(raiz.hijos[2]);

                                    if (izq.tipo === "num" && der.tipo === "num") {
                                        var l1 = codigo.generaL();
                                        var l2 = codigo.generaL();
                                        var cadena = "if " + izq.cadena + "<=" + der.cadena + " then go to " + l1 + "\n go to " + l2 + ";\n";
                                        codigo.agregarC3D(cadena);
                                        result = new NodoC3D(temp, "bool", l1, l2);
                                    } else {
                                        reporte.agregarError("Error Semantico", "Tipo incorrecto en <=", 0, 0);
                                    }
                                    break;
                                case '||':
                                    var izq = segundo.Recorrer(raiz.hijos[0]);
                                    codigo.agregarC3D(izq.f + ":\n");
                                    var der = segundo.Recorrer(raiz.hijos[2]);
                                    if (izq.tipo === der.tipo) {
                                        result = new NodoC3D("-", "bool", izq.v + "," + der.v, der.v);
                                    } else {
                                        reporte.agregarError("Error Semantico", "Tipo incorrecto en <=", 0, 0);
                                    }
                                    break;
                                case '|&':
                                    var izq = segundo.Recorrer(raiz.hijos[0]);
                                    codigo.agregarC3D(izq.f + ":\n");
                                    var der = segundo.Recorrer(raiz.hijos[2]);
                                    if (izq.tipo === der.tipo) {
                                        result = new NodoC3D("-", "bool", izq.v + "," + der.v, der.v);
                                    } else {
                                        reporte.agregarError("Error Semantico", "Tipo incorrecto en <=", 0, 0);
                                    }
                                    break;
                                case '&&':
                                    var izq = segundo.Recorrer(raiz.hijos[0]);
                                    codigo.agregarC3D(izq.f + ":\n");
                                    var der = segundo.Recorrer(raiz.hijos[2]);
                                    if (izq.tipo === der.tipo) {
                                        result = new NodoC3D("-", "bool", izq.v + "," + der.v, der.v);
                                    } else {
                                        reporte.agregarError("Error Semantico", "Tipo incorrecto en <=", 0, 0);
                                    }
                                    break;
                                case '&?':
                                    var izq = segundo.Recorrer(raiz.hijos[0]);
                                    codigo.agregarC3D(izq.f + ":\n");
                                    var der = segundo.Recorrer(raiz.hijos[2]);
                                    if (izq.tipo === der.tipo) {
                                        result = new NodoC3D("-", "bool", izq.v + "," + der.v, der.v);
                                    } else {
                                        reporte.agregarError("Error Semantico", "Tipo incorrecto en <=", 0, 0);
                                    }
                                    break;
                                case '|&':
                                    var izq = segundo.Recorrer(raiz.hijos[0]);
                                    codigo.agregarC3D(izq.f + ":\n");
                                    var der = segundo.Recorrer(raiz.hijos[2]);
                                    if (izq.tipo === der.tipo) {
                                        result = new NodoC3D("-", "bool", izq.v + "," + der.v, der.v);
                                    } else {
                                        reporte.agregarError("Error Semantico", "Tipo incorrecto en <=", 0, 0);
                                    }
                                    break;
                                default:
                                    result = segundo.Recorrer(raiz.hijos[1]);
                                    break;
                            }

                            break;
                    }
                    break;
            }
        }
        return result;
    }

}