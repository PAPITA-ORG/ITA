$(document).ready(() => {
  
  // Condicion de contraseñas iguales
  $("#btn-registro-enviar").on("click", () => {
    if ($("#pw.form-control").val() != $("#pw2.form-control").val()){
      alert("Las contraseñas no coinciden")
    }else{
      window.location.href = "/";
    }
  });
});