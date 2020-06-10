$(document).ready(() => {
  let usuarioRegistro = {};
  let comunasList = {};

  let sobreContainer = $("#sobre-main-container");
  $("#sobreSiguienteBtn").click(e => {
    e.preventDefault();
    axios
    .get("/api/comunas")
    .then((res) => {
      comunasList = res.data;
      // call addForm function
      addForm();   
    })
    .catch(err => err);
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

    // create small tag
    let emailSmall = $("<small>", {
      class: "form-text text-muted"
    }).text("We'll never share your verguita with anyone else");

    // create small tag for password
    let passwordSmall = $("<small>", {
      class: "form-text text-muted"
    }).text("Asegure que su contrasena sea de mas de 6 caracteres");

    // create checkbox

    let checkBoxLabel = $("<label>", {
      for: "sobre-checkbox",
    }).text(" Acepto los ");

    let checkBoxPopup = $("<a />", {
      class: "trigger_popup_fricc",
      text: "terminos y condiciones"
    });

     let checkBox = $("<input>", {
      type: 'checkbox',
      class: "checkbox",
      id: "sobre-checkbox"
     }).prop( "checked", false );
     
    // create submit button

    let submitButton = $("<button>", {
      type: "submit",
      class: "btn btn-success",
      id: "sobre-form-btn"
    }).text("Siguiente");

    formGroup.append(emailLabel);
    formGroup.append(emailInput);
    //formGroup.append(emailSmall);

    //formGroup.append(passwordLabel);
    formGroup.append(passwordInput);
    //formGroup.append(passwordSmall);
    formGroup.append(checkBox)
    formGroup.append(checkBoxLabel)
    formGroup.append(checkBoxPopup);
    
    sobreForm.append(formGroup);
    sobreForm.append(submitButton);
    
    sobreContainer.append(sobreForm);
    

    const appendUserForm = () => {
    
      var generoList = [
        {"genero":1, "nombre":"prefiero no decir"},
        {"genero":2, "nombre":"otro"},
        {"genero":3, "nombre":"mujer"},
        {"genero":4, "nombre":"hombre"}
      ];

      var parentescoList = [
        {"parentesco":1, "nombre":"mama"},
        {"parentesco":2, "nombre":"papa"},
        {"parentesco":3, "nombre":"abuelo"},
        {"parentesco":4, "nombre":"abuela"},
        {"parentesco":5, "nombre":"otro familiar"},
        {"parentesco":6, "nombre":"otro no familiar"}
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

      let formGroupRowLabel = $("<label>", {
        for: "formGroupRow"
      }).text("Cuentanos mas de ti"); 

      inlineForm.append(formGroupRowLabel);  

      let formGroupRow = $(`<div>`, { class: "form-group row" });
      inlineForm.append(formGroupRow);
   
      let fieldLabel0 = $(`<label>`, {
        for: `input0`,
        class: "col-sm-3 col-form-label"
      }).text("Edad");
      let formInputDiv0 = $(`<div>`, { class: "col-sm-3" });
      let formInput0 = $(`<input>`, {
        type: "text",
        class: "form-control",
        id: `input0`
      }).css("margin-bottom", "10px");

      formInputDiv0.append(formInput0);
      formGroupRow.append(fieldLabel0);
      formGroupRow.append(formInputDiv0);

      let fieldLabel1 = $(`<label>`, {
        for: `input1`,
        class: "col-sm-3 col-form-label"
      }).text("Parentesco");
      let formInputDiv1 = $(`<div>`, { class: "col-sm-3" });
      let formInput1 = $(`<select>`, {
        type: "text",
        class: "form-control",
        id: `input1`
      }).css("margin-bottom", "10px");

      parentescoList.map(list => {
        let option = $("<option>").text(list.nombre);
        formInput1.append(option);
      });

      formInputDiv1.append(formInput1);
      formGroupRow.append(fieldLabel1);
      formGroupRow.append(formInputDiv1);

      let fieldLabel2 = $(`<label>`, {
        for: `input2`,
        class: "col-sm-3 col-form-label"
      }).text("Genero");
      let formInputDiv2 = $(`<div>`, { class: "col-sm-3" });
      let formInput2 = $(`<select>`, {
        type: "text",
        class: "form-control",
        id: `input2`
      }).css("margin-bottom", "10px");

      generoList.map(list => {
        let option = $("<option>").text(list.nombre);
        formInput2.append(option);
      });

      formInputDiv2.append(formInput2);
      formGroupRow.append(fieldLabel2);
      formGroupRow.append(formInputDiv2);

      let fieldLabel3 = $(`<label>`, {
        for: `input3`,
        class: "col-sm-3 col-form-label"
      }).text("Comuna");
      let formInputDiv3 = $(`<div>`, { class: "col-sm-3" });
      let formInput3 = $(`<select>`, {
        type: "text",
        class: "form-control",
        id: `input3`
      }).css("margin-bottom", "10px");

      comunasList.map(list => {
        let option = $("<option>").text(list.comuna);
        formInput3.append(option);
      });

      formInputDiv3.append(formInput3);
      formGroupRow.append(fieldLabel3);
      formGroupRow.append(formInputDiv3);
     
      let efficaciesRow = $("<div>", {
        class: "form-group row",
        id: "form-efficacies"
      });
      
      let formInputLabel = $("<label>", {
        for: "formInput",
      }).text("Indique cuan de acuerdo esta con cada frase moviendo la barra"); 

      inlineForm.append(formInputLabel);

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
      }).text("Registrarse");

      nextButtonDiv.append(nextButton);

      inlineForm.append(nextButtonDiv);
      
      $("#selector-btn-registrar").on("click", e => {
        e.preventDefault();

        let af_0 = -1;

        let genero = generoList.filter(d => {
          return d.nombre === $("#input2").val();  
        });

        let parentesco = parentescoList.filter(d => {
          return d.nombre === $("#input1").val();  
        });

        let comuna = comunasList.filter(d => {
          return d.comuna === $("#input3").val();  
        });

        let formFields = [
          {field: "edad", value: Number($("#input0").val())},
          {field: "parentesco", value: parentesco[0].parentesco},
          {field: "genero", value: genero[0].genero},
          {field: "comunaCod", value: comuna[0]._id},
          {field: "i1", value: Number($("#range0").val())},
          {field: "i2", value: Number($("#range1").val())},
          {field: "i3", value: Number($("#range2").val())},
          {field: "i4", value: Number($("#range3").val())},
          {field: "i5", value: Number($("#range4").val())},
          {field: "af_0", value: af_0}, 
          {field: "tutorial", value: 1}
        ];
        
        let formRanges = formFields.filter(field => {
          return (field.field === "i1" ||
          field.field === "i2" ||
          field.field === "i3" ||
          field.field === "i4" ||
          field.field === "i5")  
        });
        
        let totalRanges = 0;

        for(var i = 0; i < formRanges.length; i++) {
          totalRanges += formRanges[i].value;
        }

        af_0 = totalRanges / formRanges.length;

        function replaceByValue( field, oldvalue, newvalue ) {
          for( var k = 0; k < formFields.length; ++k ) {
              if( oldvalue == formFields[k][field] ) {
                  formFields[k][field] = newvalue ;
              }
          }
          return formFields;
        }

        replaceByValue('value','-1',af_0);

        formFields.forEach(field => {
          usuarioRegistro[field.field] = field.value;
        });
        
        //console.log(usuarioRegistro);

        axios
          .post("/api/usuarios/register", usuarioRegistro)
          .then(res => res)
          .catch(err => err);

        window.location.href="/";
      });
    };

    $("#sobre-form-btn").click(e => {
            e.preventDefault();
      let formFields = [
        { field: "correo", value: $("#sobre-form-email").val() },
        { field: "password", value: $("#sobre-form-password").val() }
      ];

      if ($('#sobre-checkbox').is(':checked')) {
          alert('Usted acepta los terminos y condiciones')
      }
      else {
          alert('Por favor acepte los terminos y condiciones')
      }
      
      formFields.forEach(field => {
        usuarioRegistro[field.field] = field.value;
      });

      // se quita el formulario y se agrega el nuevo
      sobreContainer.empty();

      appendUserForm();
    });
  }
});




