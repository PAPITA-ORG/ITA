$(document).ready(() => {
  let indexContainer = $("#index-container");

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

  function passwordChange() {
    indexContainer.empty();
    
    // create a form
    let sobreForm = $("<form>", {
      id: "sobre-form"
    });

    // create a div with class form-group
    let formGroup = $("<div>", {
      class: "form-group"
    });

    // create a label
    let emailLabel = $("<label>", {
      for: "sobre-form-email"
    }).text("Ingresa tus datos");

     let passwordLabel = $("<label>", {
      for: "sobre-form-password"
    }).text("Contrasena"); 

    // create email input tag
    let emailInput = $("<input>", {
      type: "email",
      class: "form-control",
      id: "sobre-form-email",
      placeholder: "correo"
    });

    // create password input
    let passwordInput = $("<input>", {
      type: "password",
      class: "form-control",
      id: "sobre-form-password",
      placeholder: "contraseña"
    });
  }

  // $("#btn-registro-enviar").on("click", e => {
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

  $("#btn-si").on("click", () => {
    window.location.href = "sobre";
  });

  $("#btn-password").on("click", () => {
    passwordChange();
  });

  $("#btn-team").on("click", () => {
    firstTime = false;
    window.open("https://www.papita.org", '_blank');
  });

});
