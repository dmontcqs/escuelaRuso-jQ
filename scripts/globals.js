// ARRAY de objetos-cursos.

const cursos = [
    {
      index: 1,
      nombreNivel: "principiante",
      costo: 1000,
      descuento: 0.9,
      descuentoUsuario: "10%",
    },
    {
      index: 2,
      nombreNivel: "intermedio",
      costo: 2000,
      descuento: 0.8,
      descuentoUsuario: "20%",
    },
];
  
  cursos.push({
    index: 3,
    nombreNivel: "avanzado",
    costo: 3000,
    descuento: 0.9,
    descuentoUsuario: "10%",
  });

let cursosInscritos = []


// let precioFinal = 0
// console.log(precioFinal); 

for(const nivel of cursos){
  $("#infoCursos").append(
                  `<h3> ${nivel.nombreNivel}</h3>
                    <p> precio: $ ${nivel.costo} .00 </p>
                    <p> Descuento estudiantil: ${nivel.descuentoUsuario}</p>
                    `
  )
}

$("#imprimeInfo").on("click", renderizeInfo); //error: renderize info is not defined. 


//llamado AJAX
//podria cambiarlo a clima para no tener que actualizar permanentemente (?) 

$( document ).ready(function() {
    //Declaramos la url del API
    const APIURL = 'http://worldtimeapi.org/api/timezone/Europe/Moscow' ;  
    $.ajax({
            method: "GET",
            url:  APIURL,
            
            success: function imprime (respuesta){
                const hora = respuesta.datetime
                const horaFinal = hora.slice(11,19)
                $(".footer").prepend(`<div class="divHora">
                                      HORA ACTUAL EN MOSCÚ
                                      <br>
                                      ${horaFinal}
                                      </div>`);
            }
    });
   
});



