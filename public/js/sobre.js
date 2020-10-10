$(document).ready(() => {
  var dimension = window.innerWidth;
  if (dimension < 720) {
    let smallVideoForm = $("<video class='presentvideo' autoplay controls>", {
      width: "320",
      height: "240",
      class: "video"
    });
    let smallSourceForm = $("<source>", {
      src: "/video/Hola_320x240.mp4",
      type: "video/mp4"
    });
    smallVideoForm.append(smallSourceForm);
    $("#smallVideo").append(smallVideoForm);
  } else {
    let bigVideoForm = $("<video class='presentvideo' autoplay controls>", {
      width: "720",
      height: "480",
      class: "video"
    });
    let bigSourceForm = $("<source>", {
      src: "/video/Hola_720x480.mp4",
      type: "video/mp4"
    });
    bigVideoForm.append(bigSourceForm);
    $("#bigVideo").append(bigVideoForm);
  }
  $(".presentvideo").on("ended", function() {
    $("#btn-sig").removeClass("disabled");
  });
});
