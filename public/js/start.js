$(document).ready(() => {
  $("#btn-logout").on("click", () => {
    window.location.href = "/";
  });

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

      const startDashboard = () => {
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
      };

      startDashboard();

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
                  startEndSurvey();
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

        let formLabel = $("<label>", {
          for: "form-group"
        }).text("Cuentame tu experiencia");

        // user rating

        let starsRating = [1, 2, 3, 4, 5];

        let rateUserDiv = $("<div>", {
          id: "rate-user-div"
        });

        let rateUserLabel = $("<label>", {
          for: "rate-user-div"
        }).text("Te gusto la actividad?");

        let rateUser = $("<div>", {
          id: "rate-user",
          class:
            "starrating risingstar d-flex justify-content-center flex-row-reverse"
        });

        rateUserDiv.append(rateUserLabel);

        starsRating.map((stars, i) => {
          let starUserInput = $(`<input>`, {
            type: "radio",
            value: starsRating.length - i,
            id: `staruser${i + 1}`,
            name: "ratingUser",
            class: "rating userRating"
          });

          let starUserInputLabel = $(`<label>`, {
            for: `staruser${i + 1}`
          });

          rateUser.append(starUserInput);
          rateUser.append(starUserInputLabel);
        });

        rateUserDiv.append(rateUser);

        // child rating

        let rateChildDiv = $("<div>", {
          id: "rate-child-div"
        });

        let rateChildLabel = $("<label>", {
          for: "rate-child-div"
        }).text("Te gusto la actividad a tu niño o niña?");

        let rateChild = $("<div>", {
          id: "rate-child",
          class:
            "starrating risingstar d-flex justify-content-center flex-row-reverse"
        });

        rateChildDiv.append(rateChildLabel);

        starsRating.map((stars2, i) => {
          let starChildInput = $(`<input>`, {
            type: "radio",
            value: starsRating.length - i,
            id: `starchild${i + 1}`,
            name: "ratingChild",
            class: "rating childRating"
          });

          let starChildInputLabel = $(`<label>`, {
            for: `starchild${i + 1}`
          });

          rateChild.append(starChildInput);
          rateChild.append(starChildInputLabel);
        });

        rateChildDiv.append(rateChild);

        //  self-efficacy bar

        let efficacyEnd = $("<div>", {
          class: "form-group row",
          id: "form-efficacies"
        });

        let efficacyEndLabel = $(`<label>`, {
          class: "col-sm-6 col-form-label"
        }).text("Cual es tu energia ahora?");

        let formInputDiv = $(`<div>`, { class: "col-sm-6" });

        let formInput = $("<input>", {
          type: "range",
          val: "0",
          min: "0",
          max: "100",
          class: "form-control",
          id: "slider-af2"
        }).css("margin-bottom", "10px");

        formInputDiv.append(formInput);
        efficacyEnd.append(efficacyEndLabel);
        efficacyEnd.append(formInputDiv);

        // create submit button

        let submitButton = $("<button>", {
          type: "submit",
          class: "btn btn-success",
          id: "start-form-btn"
        }).text("Volver");

        formGroup.append(formLabel);

        startForm.append(formGroup);
        startForm.append(rateUserDiv);
        startForm.append(rateChildDiv);
        startForm.append(efficacyEnd);
        startForm.append(submitButton);
        startTopContainer.append(startForm);
        startContainer.append(startTopContainer);
        $(".rating").on("click", e => {
          e.currentTarget.className === "rating userRating"
            ? (historial["disfruta"] = Number(e.currentTarget.value))
            : (historial["disfrutaNino"] = Number(e.currentTarget.value));
        });

        $("#slider-af2").on("change", e => {
          historial["af2"] = e.currentTarget.valueAsNumber;
        });

        $("#start-form-btn").on("click", e => {
          e.preventDefault();
          historial["logoutTime"] = Date.now();

          axios
            .post("/api/historial", historial)
            .then(res => {
              let fieldsToModify = { af_0: historial.af2, tutorial: 0 };
              axios
                .put(`/api/usuarios/${usuario._id}`, fieldsToModify)
                .then(res => {
                  window.location.href = "start";
                });
            })
            .catch(err => err);
        });
      }

      const mind = (usuario, topicoCod) => {
        startContainer.empty();

        startTopContainer.empty();
        startBottomContainer.empty();

        let mindRow = $("<div>", {
          style: "margin-top: 20px",
          class: "col-sm-12 form-group justify-center center",
          id: "mind-row"
        });

        let mindLabel = $("<label>", {
          for: "start-potatostat"
        }).text("Hagamos una actividad saludable juntos!");

        mindRow.append(mindLabel);

        mindRow.append(mindLabel);
        startTopContainer.append(mindRow);
        selector(usuario, topicoCod);
        startContainer.append(startTopContainer);
        startContainer.append(startBottomContainer);
      };

      const diet = (usuario, topicoCod) => {
        startContainer.empty();

        startTopContainer.empty();
        startBottomContainer.empty();

        let dietRow = $("<div>", {
          style: "margin-top: 20px",
          class: "col-sm-12 form-group justify-center center",
          id: "diet-row"
        });

        let dietLabel = $("<label>", {
          for: "diet-row"
        }).text("Cocinemos juntos!");

        dietRow.append(dietLabel);

        dietRow.append(dietLabel);
        startTopContainer.append(dietRow);
        selector(usuario, topicoCod);
        startContainer.append(startTopContainer);
        startContainer.append(startBottomContainer);
      };

      const stats = () => {
        startContainer.empty();

        let statsRow = $("<div>", {
          style: "margin-top: 20px",
          class: "col-sm-12 form-group justify-center center",
          id: "stats-row"
        });

        let statsRowLabel = $("<div>", {
          style: "margin-top: 20px",
          class: "col-sm-12 form-group justify-center center",
          id: "stats-row"
        });

        let potatoStatLabel = $("<label>", {
          for: "start-potatostat"
        }).text("Aun no has hecho suficientes actividades para tener stats :D");

        let potatoStat = $("<img>", {
          src: "/images/logo_papita-01.png",
          class: "center"
        }).height(200);

        let potatoButton = $("<button>", {
          class: "btn btn-success",
          id: "potato-button"
        }).text("Llevame de vuelta!");

        statsRow.append(potatoStat);
        statsRow.append(document.createElement("br"));
        statsRow.append(potatoButton);
        statsRowLabel.append(potatoStatLabel);

        startContainer.append(statsRowLabel);
        startContainer.append(statsRow);

        $("#potato-button").on("click", () => {
          window.location.href = "start";
        });
      };

      const body = (usuario, topicoCod) => {
        startContainer.empty();

        startTopContainer.empty();
        startBottomContainer.empty();

        let bodyRow = $("<div>", {
          style: "margin-top: 10px",
          class: "col-sm-12 form-group justify-center center",
          id: "body-row"
        });

        let bodyLabel = $("<label>", {
          for: "body-row"
        }).text("Hagamos actividad física juntos!");

        bodyRow.append(bodyLabel);

        bodyRow.append(bodyLabel);
        startTopContainer.append(bodyRow);
        selector(usuario, topicoCod);
        startContainer.append(startTopContainer);
        startContainer.append(startBottomContainer);
      };

      $("#btn-stats").on("click", e => {
        e.preventDefault();
        stats();
      });

      $("#btn-body").on("click", e => {
        e.preventDefault();

        topicoCod = e.currentTarget.dataset.value;

        loading();
        setTimeout(function() {
          body(usuario, topicoCod);
        }, 3000);

      });

      $("#btn-diet").on("click", e => {
        e.preventDefault();
        topicoCod = e.currentTarget.dataset.value;
        loading();
        setTimeout(function() {
          diet(usuario, topicoCod);
        }, 3000);
      });

      $("#btn-mind").on("click", e => {
        topicoCod = e.currentTarget.dataset.value;
        e.preventDefault();
        loading();
        setTimeout(function() {
          mind(usuario, topicoCod);
        }, 3000);
      });
    })
    .catch(err => err);

  var i = 0;
  function move() {
    if (i == 0) {
      i = 1;
      var elem = document.getElementById("myBar");
      var width = 10;
      var id = setInterval(frame, 10);
      function frame() {
        if (width >= 100) {
          clearInterval(id);
          i = 0;
        } else {
          width++;
          elem.style.width = width + "%";
          elem.innerHTML = width + "%";
        }
      }
    }
  }
});
