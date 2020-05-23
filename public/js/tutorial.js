$(document).ready(function () {
  //initialize swiper     
  var mySwiper = new Swiper ('.swiper-container', {

  });
  $("#btn-finish").on("click", () => {
    window.location.href = "start";
  });
  
});
  