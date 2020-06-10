$(document).ready(() => {
  let pass;
  $("input[type=password]").on("keyup", () => {
    pass = $("#controlFormPw").val();
    let repass = $("#controlFormPw2").val();
    let large = $("#controlFormPw2").val().length;

    // condicion contraseñas iguales y espacio no en blanco
    if (pass === repass && large > 1) {
      $("#registroFormBtn").removeAttr("disabled");
    }
  });
  // $("#registroFormBtn").on("click", e => {
  //   let requestBody = {
  //     correo: $("#email").val(),
  //     password: pass
  //   };

  //   axios
  //     .post("/api/usuarios/changePassword", requestBody)
  //     .then(res => {
  //       console.log(res);
  //       // window.location.href = "/";
  //     })
  //     .catch(err => err);
  // });
});
