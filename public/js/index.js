$(document).ready(() => {
  let firstTime = true;
  let test = "test";
  $("#btn-si").on("click", () => {
    window.location.href = "baseline";
  });

  $("#btn-no").on("click", () => {
    firstTime = false;
    console.log("noo");
  });
});
