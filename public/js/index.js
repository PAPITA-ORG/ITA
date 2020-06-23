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

  $("#indexSiBtn").on("click", () => {
    window.location.href = "sobre";
  });

  $("#indexPasswordBtn").on("click", () => {
    window.location.href = "registro";
  });

  $("#indexTeamBtn").on("click", () => {
    firstTime = false;
    window.open("https://www.papita.org", "_blank");
  });

  // $("#nav-toggle-content").on("show", handleToggleContent);

  // function handleToggleContent() {
  //   $("html, body").animate({ scrollTop: $(document).height() }, "slow");
  // }
});
