$(document).ready(() => {
  $("#baseline-btn-acepto").on("click", () => {
    $("#baseline-content").empty();
    $("#terminos").empty();
    let screenFieldColumns = [
      ["Edad", "Parentezco", "Genero"],
      ["Numero de ninos", "Comuna", "Edades de ninos"]
    ];
    let efficacies = [
      "Siempre puedo resolver problemas si trato lo suficiente",
      "Es facil lograr mis metas y mantener mis objetivos",
      "Se como manejar situaciones imprevistas",
      "Puedo mantener la calma ante nuevas dificultades",
      "Cuando tengo problemas, logro pensar varias soluciones"
    ];

    let inlineForm = $("<form>", {
      id: "baseline-form",
      class: "form-inline"
    });
    $("#baseline-content").append(inlineForm);

    screenFieldColumns.map((columns, i) => {
      columns.map((field, j) => {
        let formGroupRow = $(`<div>`, { class: "form-group row>" });
        let fieldLabel = $(`<label>`, {
          for: `input${i}-${j}`,
          class: "col-md-8 col-form-label"
        }).text(field);
        let formInputDiv = $(`<div>`, { class: "col-md-4" });
        let formInput = $(`<input>`, {
          type: "text",
          //   class: "form-control",
          id: `input${i}-${j}`
        });

        formInputDiv.append(formInput);
        formGroupRow.append(fieldLabel);
        formGroupRow.append(formInputDiv);
        console.log(formGroupRow);

        $("#baseline-form").append(formGroupRow);
      });
    });
  });
});
