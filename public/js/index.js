$(document).ready(() => {
  $("#btn-si").on("click", () => {
    window.location.href = "sobre";
  });

  $("#btn-password").on("click", () => {
    window.location.href = "registro";
  });

  $("#btn-team").on("click", () => {
    firstTime = false;
    window.open("https://www.papita.org", '_blank');
  });
});
