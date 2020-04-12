$(document).ready(() => {
  // when user clicks...
  $("#btn-enviar").on("click", e => {
    // A larger form is appended to the DOM
    appendUserForm();
  });

  const appendUserForm = () => {
    $("#baseline-content").empty();
    $("#terminos").empty();
    let efficacies = [
      "Tu nivel de energia (eficacia) la ultima vez fue"
    ];

    let inlineForm = $("<form>", {
      id: "baseline-form"
    });
    $("#baseline-content").append(inlineForm);

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
      id: "baseline-btn-siguiente"
    }).text("Siguiente");

    nextButtonDiv.append(nextButton);

    inlineForm.append(nextButtonDiv);

    $("#baseline-btn-siguiente").on("click", e => {
      e.preventDefault();
      window.location.href = "selector";
      // submit a new user
      submitUserInfo();
    });
  };

  const submitUserInfo = () => {
    // console.log("new user!");
    // window.location.href = '/resultado'
  };
});
