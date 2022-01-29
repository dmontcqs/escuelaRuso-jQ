contadorA = 0; //contador de renderizeInfo
contadorB= 0; 

// función que imprime inputs de usuario 
//
function renderizeInfo() {
  //if (contadorA == 0) {
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

                                        <select type="number" required="required" id="inputDineroFinal" class="form-select" aria-label="Default select example">
                                        <option selected>Ingresa cantidad indicada</option>
                                        <option value=900>900.00</option>
                                        <option value=1000>$1000.00</option>
                                        <option value=1600>$1600.00</option>
                                        <option value=2000>$2000.00</option>
                                        <option value=2700>$2700.00</option>
                                        <option value=3000>$3000.00</option>
                                      </select>

                                          <div id="DivBotonInscripcion">

                                          <button type="button" id="btnInscripcion" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#exampleModal">PAGAR</button>

                                          </div>
                                          
                                   </div>`);

    $("#btnInscripcion").on("click", mensajeInscripcion);

}

// BOTON INSCRIPCIÓN


let precioFinal = 0;
console.log(precioFinal); 


function mensajeInscripcion(){

  let dineroIngresado = $("#inputDineroFinal").val();  
  let dineroNumber = parseInt(dineroIngresado);  


if (contadorB == 0){

  if (dineroNumber !== precioFinal) {
        alert("Ingresa correctamente la cantidad indicada"); 
        guardarCurso(); 
        }
  else if(dineroNumber === precioFinal){     
        $("#DivBotonInscripcion").append(`
        <p class="message blockquote">FELICIDADES! acabas de inscribirte a tu curso de ruso ${$(
                  "#nivelElegido").val()}. 🎉🎉🎉 <br> Eviaremos la información al correo proporcionado.</p>`);
        guardarCurso();
        contadorB++;
        }
}
else{
  $("#DivBotonInscripcion").append(
            `<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog">
              <div class="modal-content">
               <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">ESCUELA RUSO dice:</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
            <div class="modal-body">
              <p>YA TE INSCRIBISTE A TU CURSO. Revisa tu correo para los pasos a seguir</p>
            </div>
    
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>`)
  }
}; 


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

// ANIMATIONS CON JQUERY


$( ".image-box" ).hover(function() {
  $( "h1" ).animate({
    fontSize: "2.5em",
  }, 2000, "linear", function() {
        $( ".left-box" ).animate(
             { width: "70%"}, 2000);
   });
});


$("#imprimeInfo").click(function(){
    $(".right-box").animate({width: "+=30px"}, 1000, function(){});
    $(".left-box").hide(); 
    $(".center-box").animate({width: "-=50px", border: "10px solid #000;"    }, 3000, function(){})
})

// WEATHER API 

var city =  "moscow";

$.getJSON("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=1a70ad7842bc94ac36c7c185861a0571", function(data)
{
console.log(data);

var icon = "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png";

console.log(icon);

var temp = data.main.temp;

$(".icon").attr("src", icon);
$(".temp").append(temp + " " + "ºC");
$(".cityname").append("Moscú es:")
}); 