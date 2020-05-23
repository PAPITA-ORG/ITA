$(document).ready(function () {
  //initialize swiper     
  var mySwiper = new Swiper ('.swiper-container', {

    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },

    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    // And if we need scrollbar
    scrollbar: {
      el: '.swiper-scrollbar',
    },
  });
  $("#btn-finish").on("click", () => {
    window.location.href = "start";
  });
  
});
  