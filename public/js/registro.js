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
  $("#btn-registro-enviar").on("click", e => {
    let requestBody = {
      correo: $("#email").val(),
      password: pass
    };

    axios
      .post("/api/usuarios/changePassword", requestBody)
      .then(res => {
        window.location.href = "/";
      })
      .catch(err => err);
  });
});
