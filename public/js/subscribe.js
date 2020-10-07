$(document).ready(function() {
  $("#sobre-form-btn").click(e => {
    e.preventDefault();
    expandForm();
  });

  function expandForm() {
    $("#expanded-form").removeClass("display-none");
    $("#sobre-form-btn").addClass("display-none");
  }
});
