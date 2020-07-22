$(document).ready(() => {
  let avatar_opacity = $("img.avatar").css("opacity");
  let is_clicked = false;

  // Logout Icon Handler
  $("i#btn-logout").on("click", logoutHandler);

  $("img.avatar").on("click", avatarClickHandler);

  $("#activity-efficacy").on("change", onSliderChange);

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
    if (avatar_opacity === "0.5") {
      avatar_opacity = "1";
      $(e.target).css("opacity", avatar_opacity);
      is_clicked = !is_clicked;
    } else {
      avatar_opacity = "0.5";
      $(e.target).css("opacity", avatar_opacity);
      is_clicked = !is_clicked;
    }
  }

  function onSliderChange(e) {
    $("#eficacia-label").html(e.target.value);
  }

  axios
    .get(`/api/usuarios/${userId}`)
    .then(res => {
      const usuario = res.data[0];

      let historial = {
        random: 0,
        usuario: usuario._id,
        loginTime: Date.now()
      };

      let startContainer = $("#start-main-container");
      let startTopContainer = $("#start-top-container");

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
        }).text("Le gusto la actividad a tu niño(s) y/o niña(s)?");

        // ALBERTO ME VA A AYUDAR A HACER ESTO EN UNA FUNCION

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
