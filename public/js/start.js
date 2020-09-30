let start_data;
let randomClicks = 0,
  logintime,
  activityID;
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

  axios
    .get(`/api/usuarios/${userId}`)
    .then(res => {
      const usuario = res.data[0];
      let topicoCod;

      let historial = {
        random: 0,
        usuario: usuario._id,
        loginTime: Date.now()
      };

      let $myFuelGauge;

      let startContainer = $("#start-main-container");
      let startTopContainer = $("#start-top-container");
      let startBottomContainer = $("#start-bottom-container");

      let fuelGauge = $("#fuel-gauge");

      let fuelGaugeControl = $("#fuel-gauge-control");

      $(function() {
        $myFuelGauge = $("div#fuel-gauge").dynameter({
          label: "",
          value: usuario.af_0,
          min: 0.0,
          max: 100.0,
          unit: "",
          regions: {
            // Value-keys and color-refs
            0: "error",
            25: "warn",
            60: "normal"
          }
        });
      });

      startDashboard();

      function startDashboard(){
        startBottomContainer.empty();

        let fuelGaugeDiv = $("#fuel-row");

        let efficacyStart = $("<div>", {
          class: "center col-md-6",
          id: "form-efficacies"
        });

        let efficacyStartLabel = $(`<label>`, {
          class: "col-sm-6 col-form-label"
        }).text("Cual es tu energia ahora?");

        let formInputDiv = $(`<div>`, { class: "col-sm-12 col-md-12" });

        let formInput = $("<input>", {
          type: "range",
          val: usuario.af_0,
          min: "0",
          max: "100",
          class: "form-control",
          id: "slider-af1"
        }).css("margin-bottom", "10px");

        formInputDiv.append(formInput);
        //efficacyStart.append(efficacyStartLabel);
        efficacyStart.append(formInputDiv);

        fuelGauge.append(fuelGaugeControl);
        fuelGaugeDiv.append(fuelGauge);

        startTopContainer.append(fuelGaugeDiv);
        startTopContainer.append(efficacyStart);

        let tituloContainer = $("<h5>", {}).text("Que quieres hacer hoy?");
        let parrafContainer = $("<p>", {});
        let btnmind = $("<a>", {
          href: "/",
          id: "btn-mind",
          "data-value": "3"
        });
        let img1 = $("<img>", {
          src: "/images/personaje-08.png",
          width: "130",
          height: "130"
        });

        let btndiet = $("<a>", {
          href: "/",
          id: "btn-diet",
          "data-value": "2"
        });
        let img2 = $("<img>", {
          src: "/images/personaje-07.png",
          width: "130",
          height: "130"
        });

        let btnbody = $("<a>", {
          href: "/",
          id: "btn-body",
          "data-value": "1"
        });
        let img3 = $("<img>", {
          src: "/images/personaje-06.png",
          width: "130",
          height: "130"
        });

        let btnstats = $("<a>", {
          href: "/",
          id: "btn-stats"
        });
        let img4 = $("<img>", {
          src: "/images/stats.png",
          width: "130",
          height: "130"
        });

        btnstats.append(img4);
        parrafContainer.append(btnstats);
        btnbody.append(img3);
        parrafContainer.append(btnbody);
        parrafContainer.append(document.createElement("br"));
        btndiet.append(img2);
        parrafContainer.append(btndiet);
        btnmind.append(img1);
        parrafContainer.append(btnmind);
        startBottomContainer.append(tituloContainer);
        startBottomContainer.append(parrafContainer);

        // slider and gauge events
        $("#slider-af1").on("change", e => {
          $myFuelGauge.changeValue(e.currentTarget.valueAsNumber);
          historial["af1"] = e.currentTarget.valueAsNumber;
        });
        var tour = new Tour({
          //pasos del tour
          steps: [
          {
            element: "#slider-af1",
            title: "Barra de energía",
            content: "Selector de nivel de energia para hacer actividades"
          },
          {
            element: "#avatar-text",
            title: "Iconos selección hijos",
            content: "Selector de hijas/hijos que participaran de la actividad"
          },
          {
            element: "#btn-stats",
            title: "Estadísticas",
            content: "Muestra las estadísticas obtenidas al realizar actividades"
          },
          {
            element: "#btn-body",
            title: "Actividades físicas",
            content: "Muestra misiones relacionados a actividades fisicas"
          },
          {
            element: "#btn-diet",
            title: "Actividades alimenticias",
            content: "Muestra misiones relacionados a actividades alimentarias"
          },
          {
            element: "#btn-mind",
            title: "Actividades mentales",
            content: "Muestra misiones relacionados a actividades para la mente"
          },
          {
            element: "#user",
            title: "Perfil",
            content: "Muestra la pestaña de perfil de usuario"
          },
          {
            element: "#chart-line",
            title: "Estadísticas",
            content: "Muestra las estadísticas obtenidas al realizar actividades"
          },
          {
            element: "#btn-logout",
            title: "Cerrar sesión",
            content: "Salir de la sesión actual"
          },
          {
            element: "#hiking",
            title: "Ir a inicio",
            content: "LLeva al selector de actividades inicial"
          },
        ]});
        
        // Initialize the tour
        tour.init();
        if(usuario.tutorial===1){
          // Start the tour
          tour.start();
        }
      };

      // loading screen

      const loading = () => {
        startContainer.empty();

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
        startContainer.append(startMessage);
        progressRow.append(barRow);
        startContainer.append(progressRow);
        move();
      };

      // selector

      const selector = (usuario, topicoCod) => {
        startBottomContainer.empty();

        // create container where header for activities will be displayed

        let startSelector = $("<div>", {
          style: "margin-top: 20px",
          class: "col-sm-12 form-group justify-center center",
          id: "start-selector"
        });

        let startIta = $("<img>", {
          src: "/images/ita3d_1.png",
          class: "center"
        })
          .width(150)
          .height(180);

        let startSelectorLabel = $("<label>", {
          for: "start-selector"
        }).text("Prepare estas actividades para ti!");

        startSelector.append(startIta);
        startSelector.append(startSelectorLabel);

        // create container where activity buttons will be displayed
        let activityContainer = $("<div>", {
          style: "margin-top: 20px",
          class: "col-sm-12 justify-center center",
          id: "actividades-container"
        });

        startSelector.append(activityContainer);

        let startRandom = $("<div>", {
          style: "margin-top: 10px",
          class: "col-sm-12 form-group justify-center center",
          id: "start-selector"
        });

        let startRandomLabel = $("<label>", {
          for: "start-random-selector"
        }).text("Prefieres otra?  ");

        let startRandomButton = $("<button>", {
          class: "btn btn-success",
          id: "start-random-btn"
        }).text("Prueba de nuevo");

        startRandom.append(startRandomLabel);
        startRandom.append(startRandomButton);

        startBottomContainer.append(startSelector);
        startBottomContainer.append(startRandom);

        // request actividades and dynamically create ui elements to show them

        axios
          .get(`/api/actividades/${topicoCod}/${usuario.af_0}`)
          .then(res => {
            const displayActivities = () => {
              let randomActivities = [];

              // empty activityContainer startBottomContainer
              $("#actividades-container").empty();

              let i = 0;

              while (i < 2) {
                // find a random number j between 0 and the number of available activities
                let j = Math.floor(Math.random() * res.data.length);
                randomActivities.push(res.data[j]);
                i++;
              }

              randomActivities.map((activity, i) => {
                let activityButton = $("<a>", {
                  href: `${activity.Link}`,
                  target: "_blank",
                  class: `btn btn-success btn-block activity-btn`,
                  id: `activity-${i}`
                }).text(activity.Descriptor);

                activityContainer.append(activityButton);
                $(".activity-btn").on("click", e => {
                  e.currentTarget.id === "activity-0"
                    ? (historial["actividad"] = randomActivities[0]._id)
                    : (historial["actividad"] = randomActivities[1]._id);

                  // TO DO
                  // SEND USER TO /encuesta-actividad

                  let active_hijos =
                    avatar_opacity === "1" ? avatar.attr("value") : "";

                  goToEndSurvey(active_hijos);
                  function goToEndSurvey(active_hijos) {
                    axios
                      .post("/endsurvey", { active_hijos: active_hijos })
                      .then(res => res)
                      .catch(err => err);
                  }
                });
              });
            };

            displayActivities();

            $("#start-random-btn").on("click", e => {
              e.preventDefault();
              historial["random"] = historial["random"] + 1;
              displayActivities();
            });
            
          })
          .catch(err => err);
      };

      function startEndSurvey() {
        startContainer.empty();

        startTopContainer.empty();

        // create a form
        let startForm = $("<form>", {
          id: "start-form"
        });

        // create a div with class form-group
        let formGroup = $("<div>", {
          class: "form-group justify-center"
        });


  if (tutorial_on && tutorial_on === 1) {
    intro.show();
  }

  function onChooseActivity(e) {
    e.preventDefault();

    if ($(`img.avatar[style="opacity: 1;"]`).length === 0) {
      $(".form-err").html(`
      <div class= "alert alert-warning alert-dismissible fade show" role="alert">
        Por favor asegurese de elegir a sus chiquill@s! 
        <button class= "close" type="button" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true"> &times; </span>
        </button>
      </div>
      `);
      return;
    }

    loginTime = Date.now();

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

    // when we click the random button...
    $("#start-random-btn").on("click", e => {
      e.preventDefault();
      randomClicks++;
    });

    // when an activity is clicked...
    $(".activity-card").on("click", function(e) {
      // startContainer.empty();

      activityID = start_data.activities[Number($(this).attr("value"))]._id;
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
            hijos: start_data.hijos,
            loginTime: loginTime,
            logoutTime: Date.now(),
            random: randomClicks,
            actividad: activityID
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
