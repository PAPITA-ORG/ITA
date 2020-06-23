$(document).ready(() => {
  let pass;
  $("input[type=password]").on("keyup", e => {
    pass = $("#pw").val();
    let repass = $("#pw2").val();
    let password_length = $("#pw2").val().length;

    // condicion contraseñas iguales y espacio no en blanco
    if (pass === repass && password_length > 1) {
      $("#btn-registro-enviar").removeAttr("disabled");
    }
  });
});
