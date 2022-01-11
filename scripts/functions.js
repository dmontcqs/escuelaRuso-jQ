contadorA = 0; //contador de renderizeInfo

// función que imprime inputs de usuario
function renderizeInfo() {
  if (contadorA == 0) {
    //if para detener el renderizado

    $("#divDetalleCompra").append(`<div>

                                      <h2>DETALLE DE TU CURSO </h2>
                                      <p><strong>Nombre:</strong> ${$("#nombre").val()}</p>
                                      <p><strong>correo:</strong> ${$("#correo").val()}</p>
                                      <p><strong>Producto:</strong>Curso de Ruso ${$("#nivelElegido").val()}</p>
                                      <p><strong>Aplica descuento:</strong> ${$("#respuestaEstudiante").val()}</p>
                                      <p><strong>Precio:</strong> ${costoNivel()}</p>
  
                                      <div>
                                        <br/>
                                        <label for="">Ingresa dinero</label>
                                      </div>
                                        <br />
                                      <input type="number" required="required" id="inputDineroFinal" />
                                          <div id="DivBotonInscripcion">
                                            <button type="button" id="btnInscripcion">Inscribete</button>
                                          </div>
                                          
                                   </div>`);

    $("#btnInscripcion").on("click", mensajeInscripcion);
    contadorA++;
  } else {
    alert("Está lista la información de tu curso");
  }
}

// BOTON INSCRIPCIÓN

contadorB = 0;

function mensajeInscripcion() {
  let dineroIngresado = $("#inputDineroFinal").val();
  let dineroNumber = parseInt(dineroIngresado);

  if (contadorB == 0) {
    if (dineroNumber !== precioFinal) {
      $("#DivBotonInscripcion").append(
        `<p>Ingresa correctamente la cantidad de ${precioFinal}</p>`
      );
    } else {
      $("#DivBotonInscripcion").append(
        `<p>Te has inscrito exitosamente a tu curso de Ruso ${$(
          "#nivelElegido"
        ).val()}</p>`
      );
      contadorB++;
      guardarCurso();
    }
  } else {
    alert("Ya te has inscrito exitosamente");
  }
}

// función para checar nivel elegido en input y valorar el descuento para imprimir su precio final

function costoNivel() {
  for (const nivel of cursos) {
    if ($("#nivelElegido").val() === nivel.nombreNivel) {
      if ($("#respuestaEstudiante").val() == "no") {
        precioFinal += nivel.costo;
        return precioFinal;
      } else if ($("#respuestaEstudiante").val() == "si") {
        precioFinal += nivel.costo * nivel.descuento;
        return precioFinal;
      }
    }
  }
}

function guardarCurso() {
  let cursoPagado = {};
  for (const curso of cursos) {
    if ($("#nivelElegido").val() === curso.nombreNivel) {
      cursoPagado = {
        alumno: $("#nombre").val(),
        correo: $("#correo").val(),
        nivel: $("#nivelElegido").val(),
        descuento: $("#respuestaEstudiante").val(),
        costoInicial: $("#curso").val(),
        costoConDescuento: precioFinal,
      };
    }
  }

  // STORAGE

  let guardarLocal = (clave, valor) => {
    localStorage.setItem(clave, valor);
  };
  guardarLocal("listaInscritos", JSON.stringify(cursoPagado));

  let almacenados = JSON.parse(localStorage.getItem("listaInscritos"));
  console.log(almacenados);
}
