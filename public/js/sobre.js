$(document).ready(() => {
  $("#btn-sig").click(e => {
    e.preventDefault();
    // call addForm function
    addForm();
  });

  $("#sobre-form-btn").on("click", e => {
    e.preventDefault();

    console.log("hello");
  });

  function addForm() {
    let sobreContainer = $("#sobre-main-container");
    sobreContainer.empty();

    // create a form
    let sobreForm = $("<form>");

    // create a div with class form-group
    let formGroup = $("<div>", {
      class: "form-group"
    });

    // create a label
    let emailLabel = $("<label>", {
      for: "exampleInputEmail1"
    }).text("Email address");

    // create email input tag
    let emailInput = $("<input>", {
      type: "email",
      class: "form-control",
      id: "exampleInputEmail1",
      placeholder: "Enter verguita"
    });

    // create small tag
    let emailSmall = $("<small>", {
      class: "form-text text-muted"
    }).text("We'll never share your verguita with anyone else");

    // create submit button

    let submitButton = $("<button>", {
      class: "btn btn-primary",
      id: "sobre-form-btn"
    }).text("Submit");

    formGroup.append(emailLabel);
    formGroup.append(emailInput);
    formGroup.append(emailSmall);

    sobreForm.append(formGroup);
    sobreForm.append(submitButton);

    sobreContainer.append(sobreForm);
  }
});
