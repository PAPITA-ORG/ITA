let start_data;
$(document).ready(() => {
  // Initialize some variables
  let mainContainer;

  let af_0 = $("#activity-efficacy").val();
  let hijos = [];

  let avatar_opacity = $("img.avatar").css("opacity");
  let is_clicked = false;

  // Click Handlers

  // Logout Icon Handler
  $("img#btn-logout").on("click", logoutHandler);

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
    af_0 = $("#activity-efficacy").val();
  }

  function onChooseActivity(e) {
    e.preventDefault();

    let topicoCod = $(e.target)
      .parent()
      .val();

    $(`img.avatar[style="opacity: 1;"]`).each(function() {
      hijos.push($(this).attr("value"));
    });

    axios
      .post(`/api/usuarios/chooseActivity/${topicoCod}`, {
        af_0: af_0,
        hijos: hijos
      })
      .then(res => {
        // console.log(res.data);
        start_data = res.data;
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

          move(start_data);

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
      class: "mt-4 col-sm-12 justify-center center activity-div"
    });

    data.activities.map((activity, i) => {
      let activityCard = $("<div>", {
        class: "activity-card card mt-5",
        id: `activity-${i}`,
        value: i
      }).html(`
        <h5 class='card-title' data-url=${activity.Link}>
          ${activity.Descriptor}
        </h5>
        <p class='card-text'>Duración: ${activity.Duracion} minutos</p>
        <h6 class='card-subtitle'>Edades: ${activity.Edad_desde}-${activity.Edad_hasta} años</h6>
      `);

      activityDiv.append(activityCard);
    });

    startContainer.prepend(activityDiv);

    // when an activity is clicked...
    $(".activity-card").on("click", function(e) {
      // startContainer.empty();

      let to_do = start_data.activities[Number($(this).attr("value"))].Link;

      let embed = $("<div>", {
        class: "activity-video video mt-5"
      }).html(`

        <iframe src=${to_do} width='100%' height='100%'>
        
        </iframe>

      `);

      let finishButton = $("<button>", {
        class: "btn btn-success"
      }).text("Acabamos nuestra actividad!");

      $(".activity-div").empty();
      $("#random-btn").empty();

      $(".activity-div").append(embed);
      $("#random-btn").append(finishButton);

      finishButton.click(function(e) {
        e.preventDefault();
        axios
          .post(`/endsurvey`, {
            hijos: start_data.hijos
          })
          .then(res => {
            if (res.status === 200) {
              // let newDoc = document.open("text/html", "replace");
              // newDoc.write(res.data);
              // newDoc.close();
              window.location.href = "/endsurvey";
            }
          })
          .catch(err => console.log(err));
      });

      // axios
      //   .post("/api/usuarios/activity/pdf", { pdf: to_do })
      //   .then(res => {
      //     console.log(res.status);
      //   })
      //   .catch(err => console.log(err));
    });
  }
}

$("#start-random-btn").on("click", function() {
  // TODO -- axios post request to /api/usuarios/chooseActivity/:topicoCod
  // then invoke displayActivities passing res.data as argument
  axios
    .post(`/api/usuarios/chooseActivity/${start_data.topicoCod}`, {
      af_0: start_data.af_0,
      hijos: start_data.hijos
    })
    .then(res => {
      // console.log(res.data);
      $(".card-title").each(function(i) {
        $(this).html(`${res.data.activities[i].Descriptor}`);
        $(this).attr("data-url", res.data.activities[i].Link);
        start_data = res.data;
      });
    })
    .catch(err => {
      return err;
    });
  // console.log($(this));
});
