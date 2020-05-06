$(document).ready(() => {
  let usuarioRegistro = {};

  let sobreContainer = $("#sobre-main-container");
  $("#btn-sig").click(e => {
    e.preventDefault();
    // call addForm function
    addForm();
  });

  function addForm() {
    sobreContainer.empty();

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
    }).text("Email address");

    let passwordLabel = $("<label>", {
      for: "sobre-form-password"
    }).text("Contrasena");

    // create email input tag
    let emailInput = $("<input>", {
      type: "email",
      class: "form-control",
      id: "sobre-form-email",
      placeholder: "Enter verguita"
    });

    // create password input
    let passwordInput = $("<input>", {
      type: "password",
      class: "form-control",
      id: "sobre-form-password",
      placeholder: "Ingrese su contrasena"
    });

    // create small tag
    let emailSmall = $("<small>", {
      class: "form-text text-muted"
    }).text("We'll never share your verguita with anyone else");

    // create small tag for password
    let passwordSmall = $("<small>", {
      class: "form-text text-muted"
    }).text("Asegure que su contrasena sea de mas de 6 caracteres");

    // create submit button

    let submitButton = $("<button>", {
      type: "submit",
      class: "btn btn-primary",
      id: "sobre-form-btn"
    }).text("Submit");

    formGroup.append(emailLabel);
    formGroup.append(emailInput);
    formGroup.append(emailSmall);

    formGroup.append(passwordLabel);
    formGroup.append(passwordInput);
    formGroup.append(passwordSmall);

    sobreForm.append(formGroup);
    sobreForm.append(submitButton);

    sobreContainer.append(sobreForm);
    

    const appendUserForm = () => {
      let screenFields = [
        "Edad",
        "Parentezco",
        "Genero",
        "Numero de ninos",
        "Comuna",
        "Edades de ninos"
      ];
      let efficacies = [
        "Siempre puedo resolver problemas si trato lo suficiente",
        "Es facil lograr mis metas y mantener mis objetivos",
        "Se como manejar situaciones imprevistas",
        "Puedo mantener la calma ante nuevas dificultades",
        "Cuando tengo problemas, logro pensar varias soluciones"
      ];

      let inlineForm = $("<form>", {
        id: "baseline-form"
      });
      sobreContainer.append(inlineForm);

      let formGroupRow = $(`<div>`, { class: "form-group row" });
      inlineForm.append(formGroupRow);

      screenFields.map((field, i) => {
        let fieldLabel = $(`<label>`, {
          for: `input${i}`,
          class: "col-sm-3 col-form-label"
        }).text(field);
        let formInputDiv = $(`<div>`, { class: "col-sm-3" });
        let formInput = $(`<input>`, {
          type: "text",
          class: "form-control",
          id: `input${i}`
        }).css("margin-bottom", "10px");

        formInputDiv.append(formInput);
        formGroupRow.append(fieldLabel);
        formGroupRow.append(formInputDiv);
        // console.log(formGroupRow);
      });
      let efficaciesRow = $("<div>", {
        class: "form-group row",
        id: "form-efficacies"
      });

      inlineForm.append(efficaciesRow);

      efficacies.map((efficacy, i) => {
        let efficacyLabel = $(`<label>`, {
          for: `range${i}`,
          class: "col-sm-6 col-form-label"
        }).text(efficacy);

        let formInputDiv = $(`<div>`, { class: "col-sm-6" });

        let formInput = $(`<input>`, {
          type: "range",
          val: "0",
          min: "0",
          max: "100",
          class: "form-control",
          id: `range${i}`
        }).css("margin-bottom", "10px");

        formInputDiv.append(formInput);
        efficaciesRow.append(efficacyLabel);
        efficaciesRow.append(formInputDiv);
      });

      let nextButtonDiv = $("<div>", { class: "text-center" });
      let nextButton = $("<button>", {
        class: "btn btn-success",
        id: "selector-btn-registrar"
      }).text("Registrar");

      nextButtonDiv.append(nextButton);

      inlineForm.append(nextButtonDiv);

      $("#selector-btn-registrar").on("click", e => {
        e.preventDefault();

        usuarioRegistro["edad"] = Number($("#input0").val());

        axios
          .post("/api/usuarios/register", usuarioRegistro)
          .then(res => res)
          .catch(err => err);
      });
    };

    $("#sobre-form-btn").click(e => {
      e.preventDefault();
      let formFields = [
        { field: "email", value: $("#sobre-form-email").val() },
        { field: "password", value: $("#sobre-form-password").val() }
      ];

      formFields.forEach(field => {
        usuarioRegistro[field.field] = field.value;
      });

      // se quita el formulario y se agrega el nuevo
      sobreContainer.empty();

      appendUserForm();
    });
  }
});
