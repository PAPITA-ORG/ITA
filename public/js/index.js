$(document).ready(() => {
  $("#btn-si").on("click", () => {
    window.location.href = "sobre";
  });

  $("#btn-no").on("click", () => {
    firstTime = false;
    window.location.href = "start";
  });

  $("#btn-team").on("click", () => {
    firstTime = false;
    window.location.href = "team";
  });
});
