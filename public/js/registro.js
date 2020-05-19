$(document).ready(() => {
  $("input[type=password]").on("keyup", () => {
    var pass = $('#pw.form-control').val();   
    var repass = $('#pw2.form-control').val();
    var largo = $('#pw2.form-control').val().length ; 
    // condicion contraseñas iguales y espacio no en blanco
    if(pass == repass && largo > 1){ 
      $('#btn-registro-enviar').removeAttr('disabled');
    }else{
      $('#btn-registro-enviar').attr('disabled', 'disabled');
    }
  });
  // condicion boton enviar
  $("#btn-registro-enviar").on("click", () => {
    window.location.href = "/";
  });
});