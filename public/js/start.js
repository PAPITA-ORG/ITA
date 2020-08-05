$(document).ready(() => {
  // Initialize some variables
  let mainContainer;

  let avatar_opacity = $("img.avatar").css("opacity");
  let is_clicked = false;

  // Click Handlers

  // Logout Icon Handler
  $("i#btn-logout").on("click", logoutHandler);

  $("img.avatar").on("click", avatarClickHandler);

  $("#activity-efficacy").on("change", onSliderChange);

  $(".form-activity-btn").on("click", onChooseActivity);

  function logoutHandler() {
    axios
      .post(`/api/usuarios/logout`)
      .then(res => {
        if (res.status === 200) {
          window.location.href = res.data.url;
        }
      })
      .catch(err => err);
  }

  function avatarClickHandler(e) {
    let hijo_id = $(e.target).attr("value");
    let target_id = $(e.target).attr("id");
    let hijo_number = target_id.split("_");

    if (avatar_opacity === "0.5") {
      avatar_opacity = "1";
      $(e.target).css("opacity", avatar_opacity);
      is_clicked = !is_clicked;

      console.log(
        hijo_id,
        hijo_number[hijo_number.length - 1],
        $(`#hijo_${0}`)
      );
      $(`input[type=hidden]#hijo_` + hijo_number[hijo_number.length - 1]).attr(
        "value",
        hijo_id
      );
    } else {
      avatar_opacity = "0.5";
      $(e.target).css("opacity", avatar_opacity);
      is_clicked = !is_clicked;
      $(`input[type=hidden]#hijo_` + hijo_number[hijo_number.length - 1]).attr(
        "value",
        ""
      );
    }
  }

  function onSliderChange(e) {
    $("#eficacia-label").html(e.target.value);
  }

  function onChooseActivity(e) {
    e.preventDefault();

    let topicoCod = $(e.target)
      .parent()
      .val();
    let af_0 = $("#activity-efficacy").val();
    let hijos = [];
    $(`img.avatar[style="opacity: 1;"]`).each(function() {
      hijos.push($(this).attr("value"));
    });

    axios
      .post(`/api/usuarios/chooseActivity/${topicoCod}`, {
        af_0: af_0,
        hijos: hijos
      })
      .then(res => {
        console.log(res.data);
        mainContainer = $("#start-main-container");

        // loading screen
        loading();

        function loading() {
          mainContainer.empty();

          let startMessage = $("<div>", {
            style: "margin-top: 20px",
            class: "col-sm-12 form-group justify-center center",
            id: "start-message"
          });

          let startIta = $("<img>", {
            src: "/images/ita3d_1.png",
            class: "center"
          })
            .width(200)
            .height(240);

          let startRandomMessage = $("<label>", {
            for: "start-random-message"
            //MAKE MESSAGE RANDOM FROM MESSAGES COLLECTION
          }).text("Practica, Practica, Practica");

          let progressRow = $("<div>", {
            //style: "margin-top: 20px",
            //class: "col-sm-12 form-group justify-center center",
            id: "myProgress"
          });

          let barRow = $("<div>", {
            //style: "margin-top: 20px",
            //class: "col-sm-12 form-group justify-center center",
            id: "myBar"
          });

          startMessage.append(startIta);
          startMessage.append(startRandomMessage);
          mainContainer.append(startMessage);
          progressRow.append(barRow);
          mainContainer.append(progressRow);

          move(res.data);

          // TO DO -- append buttons for random activities with appropriate attributes
        }
      })
      .catch(err => console.error(err));
  }
});
var i = 0;
function move(data) {
  if (i == 0) {
    i = 1;
    var elem = document.getElementById("myBar");
    var width = 10;
    var id = setInterval(frame, 10);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
        i = 0;
        setTimeout(displayActivities(data), 800);
      } else {
        width++;
        elem.style.width = width + "%";
        elem.innerHTML = width + "%";
      }
    }
  }
}
function displayActivities(data) {
  let startContainer = $("#start-activity-container");
  $("#start-main-container").fadeOut("slow");
  if (startContainer.hasClass("d-none")) {
    startContainer.delay(700).fadeIn("slow", function() {
      $(this).removeClass("d-none");
    });

    $("#activities").empty();

    if ($("#start-random-btn").hasClass("d-none")) {
      $("#start-random-btn").removeClass("d-none");
    }

    let activityDiv = $("<div>", {
      class: "mt-4 col-sm-12 justify-center center"
    });

    data.activities.map(activity => {
      let activityBtn = $("<button>", {
        class: "activity-btn btn btn-success btn-block",
        "data-url": activity.Link
      }).text(activity.Descriptor);

      activityDiv.append(activityBtn);
    });

    startContainer.prepend(activityDiv);
  }
}

$("#start-random-btn").on("click", function() {
  // TODO -- axios post request to /api/usuarios/chooseActivity/:topicoCod
  // then invoke displayActivities passing res.data as argument
});
