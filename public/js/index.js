$(document).ready(() => {
  let indexContainer = $("#index-container");

  function passwordChange() {
      
    indexContainer.empty();
    
    // create a form
    let indexForm = $("<form>", {
      id: "index-form"
    });

    // create a div with class form-group
    let formGroup = $("<div>", {
      class: "form-group"
    });

    // create a label
    let emailLabel = $("<label>", {
      for: "index-form-email"
    }).text("Ingresa tus datos");

     let pwLabel = $("<label>", {
      for: "index-form-password"
    }).text("Nueva contrasena"); 

    let pw2Label = $("<label>", {
      for: "index-form-password"
    }).text("Repite la contrasena"); 

    // create email input tag
    let emailInput = $("<input>", {
      type: "email",
      class: "form-control",
      sytle: "margin-top: 10px",
      id: "index-form-email",
      placeholder: "correo"
    });

    // create password input
    let pwInput = $("<input>", {
      type: "password",
      class: "form-control",
      sytle: "margin-top: 10px",
      id: "index-form-password",
      placeholder: "contraseña"
    });

    let pw2Input = $("<input>", {
      type: "password",
      class: "form-control",
      sytle: "margin-top: 10px",
      id: "index-form-password2",
      placeholder: "repite contraseña"
    });

    let pwButton = $("<button>", {
      class: "btn btn-success",
      sytle: "margin-top: 10px",
      type: "submit",
      id: "password-btn-enviar",
      disabled: 'disabled'
    }).text("Enviar");

    formGroup.append(emailLabel);
    formGroup.append(emailInput);
    formGroup.append(pwInput);
    formGroup.append(pw2Input);
    formGroup.append(pwButton);
    indexForm.append(formGroup);
    indexContainer.append(indexForm);

    let pass;
    $("input[type=password]").on("keyup", () => {
      pass = $("#index-form-password").val();
      let repass = $("#index-form-password2").val();
      let largo = $("#index-form-password2").val().length;
  
      // condicion contraseñas iguales y espacio no en blanco
      if (pass === repass && largo > 1) {
        $("#password-btn-enviar").removeAttr("disabled");
      }
    });

  }

  $("#password-btn-enviar").on("click", e => {
     let requestBody = {
       correo: emailInput.val(),
       password: pass
     };

     axios
        .post("/api/usuarios/changePassword", requestBody)
        .then(res => {
          console.log(res);
          window.location.href = "/";
        })
        .catch(err => err);
  });

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
