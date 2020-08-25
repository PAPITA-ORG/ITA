let start_data;
$(document).ready(() => {
  // Initialize some variables
  let mainContainer;

  let af_0 = $("#activity-efficacy").val();
  let hijos = [];

  let avatar_opacity = $("img.avatar").css("opacity");
  let is_clicked = false;

  // Click Handlers
  var intro = new Anno([
    //pasos del tour
    {
      target: "#activity-efficacy",
      content: "En este tutorial te explicaremos brevemente las funciones de los botones que ves",
      position: "center-bottom",
      arrowPosition: "center-bottom",
      className: "anno-width-250",
      buttons: [
        {
          text: "Sgte",
          click: function(anno, evt) {
            anno.switchToChainNext();
          }
        },
        {
          text: "Fin",
          click: function(anno, evt) {
            anno.hide();
            axios
              .put(`/api/usuarios/${userId}`, { tutorial: 0 })
              .then(res => {
              })
              .catch(err => {});
          }
        }
      ]
    },
    {
      target: "#activity-efficacy",
      content: "Selector de nivel de energia para hacer actividades",
      position: "center-bottom",
      arrowPosition: "center-top",
      className: "anno-width-250",
      buttons: [
        {
          text: "Atras",
          click: function(anno, evt) {
            anno.switchToChainPrev();
          }
        },
        {
          text: "Sgte",
          click: function(anno, evt) {
            anno.switchToChainNext();
          }
        },
        {
          text: "Fin",
          click: function(anno, evt) {
            anno.hide();
            axios
              .put(`/api/usuarios/${userId}`, { tutorial: 0 })
              .then(res => {

              })
              .catch(err => {

              });
          }
        }
      ]
    },
    {
      target: "#avatar-text",
      content: "Selector de hijas/hijos que participaran de la actividad",
      position: "center-bottom",
      arrowPosition: "center-top",
      className: "anno-width-250",
      buttons: [
        {
          text: "Atras",
          click: function(anno, evt) {
            anno.switchToChainPrev();
          }
        },
        {
          text: "Sgte",
          click: function(anno, evt) {
            anno.switchToChainNext();
          }
        },
        {
          text: "Fin",
          click: function(anno, evt) {
            anno.hide();
            axios
              .put(`/api/usuarios/${userId}`, { tutorial: 0 })
              .then(res => {

              })
              .catch(err => {

              });
          }
        }
      ]
    },
    {
      target: "#activity-3",
      content: "Muestra misiones relacionados a actividades fisicas",
      position: "top",
      arrowPosition: "center-bottom",
      className: "anno-width-250",
      buttons: [
        {
          text: "Atras",
          click: function(anno, evt) {
            anno.switchToChainPrev();
          }
        },
        {
          text: "Sgte",
          click: function(anno, evt) {
            anno.switchToChainNext();
          }
        },
        {
          text: "Fin",
          click: function(anno, evt) {
            anno.hide();
            axios
              .put(`/api/usuarios/${userId}`, { tutorial: 0 })
              .then(res => {

              })
              .catch(err => {

              });
          }
        }
      ]
    },
    {
      target: "#activity-2",
      content: "Muestra misiones relacionados a actividades alimentarias",
      position: "top",
      arrowPosition: "center-bottom",
      className: "anno-width-250",
      buttons: [
        {
          text: "Atras",
          click: function(anno, evt) {
            anno.switchToChainPrev();
          }
        },
        {
          text: "Sgte",
          click: function(anno, evt) {
            anno.switchToChainNext();
          }
        },
        {
          text: "Fin",
          click: function(anno, evt) {
            anno.hide();
            axios
              .put(`/api/usuarios/${userId}`, { tutorial: 0 })
              .then(res => {

              })
              .catch(err => {

              });
          }
        }
      ]
    },
    {
      target: "#activity-1",
      content: "Muestra misiones relacionados a actividades para la mente",
      position: "top",
      arrowPosition: "center-bottom",
      className: "anno-width-250",
      buttons: [
        {
          text: "Atras",
          click: function(anno, evt) {
            anno.switchToChainPrev();
          }
        },
        {
          text: "Sgte",
          click: function(anno, evt) {
            anno.switchToChainNext();
          }
        },
        {
          text: "Fin",
          click: function(anno, evt) {
            anno.hide();
            axios
              .put(`/api/usuarios/${userId}`, { tutorial: 0 })
              .then(res => {

              })
              .catch(err => {

              });
          }
        }
      ]
    },
    {
      target: ".navbar",
      content: "Muestra la pestaña de perfil de usuario",
      position: "top",
      className: "anno-width-250",
      onShow: function(anno, $target, $annoElem) {
        let iconTour = $("<i>", {
          class: "fa fa-user icon-3x",
          style: "color:red;font-size: 1.5rem;"
        });
        $(".anno-content").append(iconTour);
      },
      buttons: [
        {
          text: "Atras",
          click: function(anno, evt) {
            anno.switchToChainPrev();
          }
        },
        {
          text: "Sgte",
          click: function(anno, evt) {
            anno.switchToChainNext();
          }
        },
        {
          text: "Fin",
          click: function(anno, evt) {
            anno.hide();
            axios
              .put(`/api/usuarios/${userId}`, { tutorial: 0 })
              .then(res => {

              })
              .catch(err => {

              });
          }
        }
      ]
    },
    {
      target: ".navbar",
      content: "Muestra las estadisticas obtenidas al realizar actividades",
      position: "top",
      className: "anno-width-250",
      onShow: function (anno, $target, $annoElem) {
        let iconTour = $("<i>", {
          class: "fa fa-chart-line icon-3x",
          style: "color:red;font-size: 1.5rem;"
        });
        $( ".anno-content" ).append(iconTour);
      },
      buttons: [
        {
          text: "Atras",
          click: function(anno, evt) {
            anno.switchToChainPrev();
          }
        },
        {
          text: "Sgte",
          click: function(anno, evt) {
            anno.switchToChainNext();
          }
        },
        {
          text: "Fin",
          click: function(anno, evt) {
            anno.hide();
            axios
              .put(`/api/usuarios/${userId}`, { tutorial: 0 })
              .then(res => {

              })
              .catch(err => {

              });
          }
        }
      ]
    },
    {
      target: ".navbar",
      content: "Salir de la sesión actual ",
      position: "top",
      className: "anno-width-300",
      onShow: function (anno, $target, $annoElem) {
        let iconTour = $("<i>", {
          class: "fa fa-door-open icon-3x",
          style: "color:red;font-size: 1.3rem;"
        });
        $( ".anno-content" ).append(iconTour);
      },
      buttons: [
        {
          text: "Atras",
          click: function(anno, evt) {
            anno.switchToChainPrev();
          }
        },
        {
          text: "Sgte",
          click: function(anno, evt) {
            anno.switchToChainNext();
          }
        },
        {
          text: "Fin",
          click: function(anno, evt) {
            anno.hide();
            axios
              .put(`/api/usuarios/${userId}`, { tutorial: 0 })
              .then(res => {

              })
              .catch(err => {

              });
          }
        }
      ]
    },
    {
      target: ".navbar",
      content: "LLeva al selector de actividades inicial",
      position: "top",
      className: "anno-width-250",
      onShow: function (anno, $target, $annoElem) {
        let iconTour = $("<i>", {
          class: "fa fa-hiking icon-3x",
          style: "color:red;font-size: 1.5rem;"
        });
        $( ".anno-content" ).append(iconTour);
      },
      buttons: [
        {
          text: "Atras",
          click: function(anno, evt) {
            anno.switchToChainPrev();
          }
        },
        {
          text: "Fin",
          click: function(anno, evt) {
            anno.hide();
            axios
              .put(`/api/usuarios/${userId}`, { tutorial: 0 })
              .then(res => {

              })
              .catch(err => {

              });
          }
        }
      ]
    }
  ]);

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
    af_0 = $("#activity-efficacy").val();
  }

  if (tutorial_on && tutorial_on === 1) {
    intro.show();
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
      class: "mt-4 col-sm-12 justify-center center"
    });

    data.activities.map(activity => {
      let activityCard = $("<div>", {
        class: "activity-card card mt-5"
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
