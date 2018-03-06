//Variables globales a utilizar en el programa
var edificio = null;
var texto = "";

/*
 * Constructor de Piso
 */
function Piso(propietario, numeroPlanta, numeroPuerta) {
  this.propietario = propietario;
  this.numeroPlanta = numeroPlanta;
  this.numeroPuerta = numeroPuerta;
}

/*
 * Constructor de Edificio
 */
function Edificio(calle, numero, cp) {
  this.calle = calle;
  this.numero = numero;
  this.cp = cp;
  this.numeroPlantas = 0;
  this.numeroPuertas = 0;
  this.plantas = [];
  this.array_control_plantas_puertas = [];

  //Establece el número de plantas y puertas
  this.agregarPlantasyPuertas = function(numplantas, numpuertas) {
    this.numeroPlantas += numplantas;
    this.numeroPuertas += (numplantas * numpuertas);
    for (var i = 0; i < numplantas; i++) {
      this.array_control_plantas_puertas.push(numpuertas);
    }
  }

  //Modifica el número
  this.modificarNumero = function(nuevoNumero) {
    this.numero = nuevoNumero;
  }

  //Modifica la calle
  this.modificarCalle = function(nuevaCalle) {
    this.calle = nuevaCalle;
  }

  //Modifica el código postal
  this.modificarCodigoPostal = function(nuevoCP) {
    this.cp = nuevoCP;
  }

  //Muestra la calle
  this.mostrarCalle = function() {
    var texto = "La calle del edificio es " + this.calle + "</br>";
    return texto;
  }

  //Muestra el número
  this.mostrarNumero = function() {
    var texto = "El número del edificio es el " + this.numero + "</br>";
    return texto;
  }

  //Muestra el CP
  this.mostrarCP = function() {
    var texto = "El edificio está en el Código Postal " + this.cp + "</br>";
    return texto;
  }

  //Agrega un propietario. Para ello se crea un Piso y se añade al array de plantas
  this.agregarPropietario = function(nombre, planta, puerta) {
    var piso = new Piso(nombre, planta, puerta);
    this.plantas.push(piso);
  }

  //Muestra la información almacenada
  //Ordenamos consecutivamente el array de plantas por número de planta
  this.mostrarPlantas = function() {
    var array_ordenado_por_planta = this.plantas.sort(
      function(a, b) {
        return (a.numeroPlanta > b.numeroPlanta) ? 1 : ((b.numeroPlanta > a.numeroPlanta) ? -1 : 0);
      }
    );
    for (var i = 0; i < array_ordenado_por_planta.length; i++) {
      texto += "El propietario del piso " + array_ordenado_por_planta[i].numeroPlanta + "º " +
        array_ordenado_por_planta[i].numeroPuerta + " es " +
        array_ordenado_por_planta[i].propietario + "</br>";
    }
    mostrarLog();
  }
}

/*
 * Guarda un edifico tras realizar las comprobaciones de los datos
 *Muestra la información del guardado por pantalla
 *Los botones de agregar piso y mostrar información todavía no están habilitados
 */
function guardarEdificio() {

  if (document.getElementById("calle").value != null && document.getElementById("calle").value != "" &&
    document.getElementById("numero").value != null && document.getElementById("numero").value != "" &&
    document.getElementById("cp").value != null && document.getElementById("cp").value != "") {

    var calle = document.getElementById("calle").value;
    var numero = document.getElementById("numero").value;
    var cp = document.getElementById("cp").value;

    edificio = new Edificio(calle, numero, cp);
    texto += "<h4>Nuevo Edificio construido en calle: " + edificio.calle + ", nº:" + edificio.numero + " , CP: " + edificio.cp + "</h4>";
    document.getElementById("plantasypuertas").disabled = false;
    document.getElementById("piso").disabled = true;
    document.getElementById("info").disabled = true;
    mostrarLog();
  } else {
    alert("Por favor, especifica los datos del formulario");
  }
}

/*
 * Método que agrega el número de plantas y puertas al edificio
 */
function agregarPlantasPuertas() {
  var numPlantas = prompt("Especifica el número de plantas del edificio", "0");
  if (parseInt(numPlantas) > 0) {
    var nPlantas = parseInt(numPlantas);
    var numPuertas = prompt("Especifica el número de puertas de cada planta", "0");
    if (parseInt(numPuertas) > 0) {
      var nPuertas = parseInt(numPuertas);
      edificio.agregarPlantasyPuertas(nPlantas, nPuertas);
      texto += "<h6>Se establecen " + edificio.numeroPlantas + " plantas y " + edificio.numeroPuertas + " puertas</h6>";
      texto += "---------------------------------------------------</br>";
      document.getElementById("piso").disabled = false;
      document.getElementById("info").disabled = true;
      mostrarLog();
    } else {
      alert("Valor no válido. Inténtelo de nuevo");
    }
  } else {
    alert("Valor no válido. Inténtelo de nuevo");
  }
}

/*
 * Función que crea un nuevo piso
 */
function agregarPiso() {
  var nombrePropietario = prompt("Especifica el nombre", "Nombre");
  if (nombrePropietario != null && nombrePropietario != "") {
    var planta = prompt("Especifica la planta", "0");
    if (parseInt(planta) > 0) {
      var plantaPiso = parseInt(planta);
      if (comprobarPlanta(plantaPiso)) {
        var piso = prompt("Especifica la puerta", "0");
        if (parseInt(piso) > 0) {
          var puertaPiso = parseInt(piso);
          if (comprobarPuerta(plantaPiso, puertaPiso)) {
            if (comprobarNoRepetido(plantaPiso, puertaPiso)) {
              edificio.agregarPropietario(nombrePropietario, plantaPiso, puertaPiso);
              texto += "<h6>Se agrega el propietario " + nombrePropietario + " del piso " + plantaPiso + "º " + puertaPiso + "</h6>";
              texto += "---------------------------------------------------</br>";
              //Al agregar un piso ya puedo mostrar el botón de información
              document.getElementById("info").disabled = false;
              mostrarLog();
            } else {
              alert("Valor no válido. El piso está repetido");
            }
          } else {
            alert("Valor no válido. La puerta no existe en la planta");
          }
        } else {
          alert("Valor no válido. Inténtelo de nuevo");
        }
      } else {
        alert("Valor no válido. La planta no existe en el edificio");
      }
    } else {
      alert("Valor no válido. Inténtelo de nuevo");
    }
  } else {
    alert("Valor no válido. Inténtelo de nuevo");
  }
}

/*
 * Mostramos el resumen de la información
 */
function mostrarInfo() {
  texto = "";
  texto += edificio.mostrarCalle();
  texto += edificio.mostrarNumero();
  texto += edificio.mostrarCP();
  edificio.mostrarPlantas();
}

/*
 * función global para ir actualizando las acciones generadas
 */
function mostrarLog() {
  document.getElementById("informacion").innerHTML = texto;
  document.getElementById("informacion").style.color = "#FF0000";
}

/*
* Comprobamos si la planta existe o no
*/
function comprobarPlanta(nPlanta) {
  if (edificio.numeroPlantas >= nPlanta) {
    return true;
  } else {
    return false;
  }
}

/*
* Comprobamos si existe la puerta en la planta
*/
function comprobarPuerta(planta, nPuerta) {
  var existePuerta = true;
  for (var i = 0; i < edificio.array_control_plantas_puertas.length; i++) {
    if (i == planta - 1) {
      if (nPuerta > edificio.array_control_plantas_puertas[i]) {
        existePuerta = false;
        break;
      }
    }
  }

  return existePuerta;
}

/*
* Comprobamos si el piso está repetido o no
*/
function comprobarNoRepetido(planta, nPuerta) {
  var noRepetido = true;
  for (var i = 0; i < edificio.plantas.length; i++) {
    if (edificio.plantas[i].numeroPlanta == planta &&
      edificio.plantas[i].numeroPuerta == nPuerta) {
      noRepetido = false;
      break;
    }
  }

  return noRepetido;
}
