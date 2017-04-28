
/* global reporte, codigo */

var H = 0;

class Heap {

    llenarHeap(listaSimbolo, listaHeap) {
        for (var i = 0; i < listaSimbolo.length; i++) {
            listaSimbolo[i].posicion = H;
            var simbolo = listaSimbolo[i];

            if (simbolo.rol !== "element") {
                if ((simbolo.tipo !== "num" && simbolo.tipo !== "str" && simbolo.tipo !== "bool") || simbolo.rol === "arreglo") {
                    if (simbolo.rol === "arreglo") {
                        listaHeap.push(simbolo);
                        H += simbolo.tamanio;
                    } else {
                        var existe = false;
                        for (var j = 0; j < listaSimbolo.length; j++) {
                            var sim = listaSimbolo[j];
                            if (sim.rol === "elemento") {
                                if (sim.nombre === simbolo.tipo)
                                {
                                    listaHeap.push(simbolo);
                                    H += sim.tamanio;
                                    simbolo.tamanio = sim.tamanio;
                                    existe = true;
                                    break;
                                }
                            }
                        }
                        if (existe===false && sim.tipo !== "elemento") {
                            reporte.agregarError("Error Semantico", simbolo.nombre + "No existe el objeto " + simbolo.tipo, 0, 0)
                        }
                    }
                } else {
                    listaHeap.push(simbolo);
                    H += 1;
                }
            }
        }
    }
    
    iniciarHeap(){
        var ini = codigo.generaTemp();
        var codigo = ini + " = H\n";
        return codigo;
    }
}

