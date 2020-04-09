$(document).ready(() => {
  $("#btn-si").on("click", () => {
    window.location.href = "baseline";
  });

  $("#btn-no").on("click", () => {
    firstTime = false;
  });
});
