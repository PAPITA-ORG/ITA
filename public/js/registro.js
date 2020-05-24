$(document).ready(() => {
<<<<<<< HEAD
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
  /*  axios
          .post("/api/usuarios/register", usuarioRegistro)
          .then(res => res)
          .catch(err => err);
  */       
    window.location.href = "/";    
  });
=======
  
  // Condicion de contraseñas iguales
  $("#btn-registro-enviar").on("click", () => {
    if ($("#pw.form-control").val() != $("#pw2.form-control").val()){
      alert("Las contraseñas no coinciden")
    }else{
      window.location.href = "/";
    }
  });
>>>>>>> 025fe286c89c18f097bb558e8d87edc0cc0eafd1
});