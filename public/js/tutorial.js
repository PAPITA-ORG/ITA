function buildHijo(inputObj) {
  let {
    nombreInput,
    edadInput,
    pesoInput,
    tallaInput,
    frecuenciaInput,
    genero
  } = inputObj;

  let hijo = {
    nombre: nombreInput.val(),
    edad: edadInput.val(),
    genero: Number(genero[0].genero),
    peso: Number(pesoInput.val()),
    talla: Number(tallaInput.val()),
    e1: Number($("#range0").val()),
    e2: Number($("#range1").val()),
    e3: Number($("#range2").val()),
    e4: Number($("#range3").val()),
    e5: Number($("#range4").val()),
    frecuencia_actividad: Number(frecuenciaInput.val()),
    usuario: userId
  };

  return hijo;
}
$(document).ready(function() {
  let tutorialContainer = $("#tutorial-main-container");
  let hijos = [];

  childUserForm();

  function childUserForm() {
    tutorialContainer.empty();

    let childForm = $("<form>", {
      id: "child-form"
    });
    tutorialContainer.append(childForm);

    var generoList = [
      { genero: 1, nombre: "prefiero no decir" },
      { genero: 2, nombre: "otro" },
      { genero: 3, nombre: "mujer" },
      { genero: 4, nombre: "hombre" }
    ];

    // create a label
    let formLabel = $("<label>", {
      for: "childForm"
    }).text("Ingresa los datos de tu niña/o para ayudarte mejor");

    childForm.append(formLabel);

    // create a div with class form-group
    let formGroup = $("<div>", {
      class: "form-group row col-md-12"
    });
    childForm.append(formGroup);

    let formGroupNombre = $(`<div>`, { class: "col-sm-3" });
    let formGroupEdad = $(`<div>`, { class: "col-sm-3" });
    let formGroupGenero = $(`<div>`, { class: "col-sm-3" });
    let formGroupPeso = $(`<div>`, { class: "col-sm-3" });
    let formGroupTalla = $(`<div>`, { class: "col-sm-3" });
    let formGroupFrecuencia = $(`<div>`, { class: "col-sm-3" });

    let nombreLabel = $("<label>", {
      for: "tutorial-form-nombre",
      class: "col-sm-3 col-form-label"
    }).text("Apodo");

    let nombreInput = $("<input>", {
      class: "form-control",
      id: "tutorial-form-nombre"
    }).css("margin-bottom", "10px");

    let edadLabel = $("<label>", {
      for: "tutorial-form-edad",
      class: "col-sm-3 col-form-label"
    }).text("Fecha nacimiento");

    let edadInput = $("<input>", {
      class: "form-control",
      id: "tutorial-form-edad",
      type: "date"
    }).css("margin-bottom", "10px");

    let generoLabel = $("<label>", {
      for: "tutorial-form-genero",
      class: "col-sm-3 col-form-label"
    }).text("Genero");

    let generoInput = $("<select>", {
      type: "text",
      class: "form-control",
      id: "tutorial-form-genero"
    }).css("margin-bottom", "10px");

    generoList.map(list => {
      let option = $("<option>").text(list.nombre);
      generoInput.append(option);
    });

    let tallaLabel = $("<label>", {
      for: "tutorial-form-talla",
      class: "col-sm-3 col-form-label"
    }).text("Talla (mts)");

    let tallaInput = $("<input>", {
      type: "number",
      step: "0.01",
      class: "form-control",
      id: "tutorial-form-talla"
    }).css("margin-bottom", "10px");

    let pesoLabel = $("<label>", {
      for: "tutorial-form-peso",
      class: "col-sm-3 col-form-label"
    }).text("Peso (kgs)");

    let pesoInput = $("<input>", {
      type: "number",
      step: "0.1",
      class: "form-control",
      id: "tutorial-form-peso"
    }).css("margin-bottom", "10px");

    let frecuenciaLabel = $("<label>", {
      for: "tutorial-form-frecuencia",
      class: "col-sm-3 col-form-label"
    }).text("Numero de actividades saludables en la ultima semana");

    let frecuenciaInput = $("<input>", {
      type: "number",
      step: "1",
      class: "form-control",
      id: "tutorial-form-frecuencia"
    }).css("margin-bottom", "10px");

    formGroupNombre.append(nombreInput);
    formGroupEdad.append(edadInput);
    formGroupGenero.append(generoInput);
    formGroupPeso.append(pesoInput);
    formGroupTalla.append(tallaInput);
    formGroupFrecuencia.append(frecuenciaInput);

    formGroup.append(nombreLabel);
    formGroup.append(formGroupNombre);
    formGroup.append(edadLabel);
    formGroup.append(formGroupEdad);
    formGroup.append(generoLabel);
    formGroup.append(formGroupGenero);
    formGroup.append(pesoLabel);
    formGroup.append(formGroupPeso);
    formGroup.append(tallaLabel);
    formGroup.append(formGroupTalla);
    formGroup.append(frecuenciaLabel);
    formGroup.append(formGroupFrecuencia);

    let formGroup2 = $("<div>", {
      class:
        "form-group col-md-12 align-items-center justify-content-center center"
    });
    childForm.append(formGroup2);

    let emotions = [
      "Mantengo mi calma fácilmente ",
      "No soy paciente",
      "Usualmente estoy de mal humor",
      "Me siento calmad@ cuando las cosas son diferentes para mí",
      "Usualmente estoy triste"
    ];

    let emotionsRow = $("<div>", {
      class: "form-group row",
      id: "form-emotions"
    });

    let formInputLabel = $("<label>", {
      for: "formInput"
    }).text("Indique cuan de acuerdo esta con cada frase moviendo la barra");

    formGroup2.append(formInputLabel);
    formGroup2.append(emotionsRow);

    emotions.map((emotions, i) => {
      let emotionsLabel = $(`<label>`, {
        for: `range${i}`,
        class: "col-sm-6 col-form-label"
      }).text(emotions);

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
      emotionsRow.append(emotionsLabel);
      emotionsRow.append(formInputDiv);
    });

    let childFormDiv = $(`<div>`, { class: "text-center" });

    let childFormButton = $("<button>", {
      class: "btn btn-success",
      id: "btn-child-form",
      style: "margin-right: 10px"
    }).text("Ir al menu");

    childFormDiv.append(childFormButton);

    let childFormButton2 = $("<button>", {
      class: "btn btn-success",
      id: "btn-child-form-2",
      style: "margin-left: 10px"
    }).text("Agregar otro");

    childFormDiv.append(childFormButton2);

    childForm.append(childFormDiv);

    // click handler to submit post request with children information
    $("#btn-child-form").on("click", e => {
      e.preventDefault();

      let genero = generoList.filter(d => {
        return d.nombre === generoInput.val();
      });

      let inputObj = {
        nombreInput: nombreInput,
        edadInput: edadInput,
        pesoInput: pesoInput,
        tallaInput: tallaInput,
        frecuenciaInput: frecuenciaInput,
        genero: genero
      };

      let hijo = buildHijo(inputObj);

      hijos.push(hijo);

      let bulkHijos = {
        data: hijos
      };

      axios
        .post(`/api/hijos/${userId}`, bulkHijos)
        .then(res => {
          if (res.staus === 200) window.location.href = "/start";
        })
        .catch(err => err);
    });

    // click handler to add next child
    $("#btn-child-form-2").on("click", e => {
      e.preventDefault();
      let genero = generoList.filter(d => {
        return d.nombre === generoInput.val();
      });

      let inputObj = {
        nombreInput: nombreInput,
        edadInput: edadInput,
        pesoInput: pesoInput,
        tallaInput: tallaInput,
        frecuenciaInput: frecuenciaInput,
        genero: genero
      };

      let hijo = buildHijo(inputObj);

      hijos.push(hijo);

      childUserForm();
    });
  }
});
