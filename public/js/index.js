$(document).ready(() => {

  let pass;
  $("input[type=password]").on("keyup", () => {
    pass = $("#pw.form-control").val();
    let repass = $("#pw2.form-control").val();
    let largo = $("#pw2.form-control").val().length;

    // condicion contraseñas iguales y espacio no en blanco
    if (pass === repass && largo > 1) {
      $("#btn-registro-enviar").removeAttr("disabled");
    }
  });

  $("#btn-si").on("click", () => {
    window.location.href = "sobre";
  });

  $("#btn-password").on("click", () => {
    window.location.href = "registro";
  });

  $("#btn-team").on("click", () => {
    firstTime = false;
    window.open("https://www.papita.org", '_blank');
  });

});
