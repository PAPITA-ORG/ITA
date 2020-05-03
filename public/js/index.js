$(document).ready(() => {
  $("#btn-si").on("click", () => {
    window.location.href = "sobre";
  });

  $("#btn-team").on("click", () => {
    firstTime = false;
    window.location.href = "team";
  });
});
