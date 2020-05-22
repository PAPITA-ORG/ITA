$(document).ready(() => {

  var $myFuelGauge;

  let startContainer = $("#start-main-container");
  let startTopContainer = $("#start-top-container");
  let startBottomContainer = $("#start-bottom-container");

  let fuelGauge = $("<div>", {
    class: "fuel-gauge"
  });
  
  let fuelGaugeControl = $("<div>", {
    class: "fuel-gague-control"
  });
  
  const startDashboard = () => {

    startTopContainer.empty();
    startBottomContainer.empty();
    
    let efficacyStart = $("<div>", {
      class: "form-group row",
      id: "form-efficacies"
    });

    let efficacyStartLabel = $(`<label>`, {
      class: "col-sm-6 col-form-label"
    }).text("Cual es tu energia ahora?");

    let formInputDiv = $(`<div>`, { class: "col-sm-6" });

    let formInput = $("<input>", {
      type: "range",
      val: "0",
      min: "0",
      max: "100",
      class: "form-control",
    }).css("margin-bottom", "10px");
            
    formInputDiv.append(formInput);
    efficacyStart.append(efficacyStartLabel);
    efficacyStart.append(formInputDiv);
    fuelGauge.append(fuelGaugeControl);
    startTopContainer.append(fuelGauge);
    startTopContainer.append(efficacyStart);

    let tituloContainer = $("<h5>", {
    }).text('Que quieres hacer hoy?');
    let parrafContainer = $("<p>", {
    });
    let btnmind = $("<a>", {
      href:'/',
      id: "btn-mind"
    });
    let img1 = $("<img>", {
      src: "/images/personaje-08.svg",
      width:"200",
      height:"200"
    });

    let btndiet = $("<a>", {
      href:'/',
      id: "btn-diet"
    });
    let img2 = $("<img>", {
      src: "/images/personaje-07.svg",
      width:"160",
      height:"216"
    });

    let btnbody = $("<a>", {
      href:'/',
      id: "btn-body"
    });
    let img3 = $("<img>", {
      src: "/images/personaje-06.svg",
      width:"150",
      height:"150"
    });

    let btnstats = $("<a>", {
      href:'/',
      id: "btn-stats"
    });
    let img4 = $("<img>", {
      src: "/images/stats.png",
      width:"140",
      height:"140"
    });
    
    btnstats.append(img4);
    parrafContainer.append(btnstats);
    btnbody.append(img3);
    parrafContainer.append(btnbody);
    btndiet.append(img2);
    parrafContainer.append(btndiet);
    btnmind.append(img1);
    parrafContainer.append(btnmind);
    startBottomContainer.append(tituloContainer);
    startBottomContainer.append(parrafContainer);

  };

  $( function () {

    $myFuelGauge = $("#fuel-gauge").dynameter({
      width: 200,
      label: '',
      value: 80,
      min: 0.0,
      max: 100.0,
      unit: '',
      regions: { // Value-keys and color-refs
        0: 'error',
        25: 'warn',
        60: 'normal',
      }
    });

    // jQuery UI slider widget

    $('#fuel-gauge-control').slider({
      min: 0.0,
      max: 100.0,
      value: 37.5,
      step: .1,
      slide: function (evt, ui) {
        $myFuelGauge.changeValue((ui.value).toFixed(1));
      }
    });
    
  });

  startDashboard();

  $("#btn-stats").on("click", e => {
    e.preventDefault();
    stats();
  });

  $("#btn-body").on("click", e => {
    e.preventDefault();
    loading();
    setTimeout(function(){
      body();
    }, 1000);
    setTimeout(function(){
      startEndSurvey();
    }, 1000);   
  });

  $("#btn-diet").on("click", e => {
    e.preventDefault();
    loading();
    setTimeout(function(){
      diet();
    }, 10000);
    setTimeout(function(){
      startEndSurvey();
    }, 15000);
  });

  $("#btn-mind").on("click", e => {
    e.preventDefault();
    loading();
    setTimeout(function(){
      mind();
    }, 10000);
    setTimeout(function(){
      startEndSurvey();
    }, 15000);    
  });
 
  function startEndSurvey() {
    
    startContainer.empty();
    
    startTopContainer.empty();

    // create a form
    let startForm = $("<form>", {
      id: "start-form"
    });

    // create a div with class form-group
    let formGroup = $("<div>", {
      class: "form-group"
    });

    let formLabel = $("<label>", {
      for: "form-group"
    }).text("Cuentame tu experiencia");

    // user rating
    
    let starsRating = [1,2,3,4,5];

    let rateUserDiv = $("<div>", {
      id: "rate-user-div",
    });
    
    let rateUserLabel = $("<label>", {
      for: "rate-user-div"
    }).text("Te gusto la actividad?");

    let rateUser = $("<div>", {
      id: "rate-user",
      class: "starrating risingstar d-flex justify-content-center flex-row-reverse"
    });
    
    rateUserDiv.append(rateUserLabel)
    
    starsRating.map((stars, i) => {

      let starUserInput = $(`<input>`, {
        type: "radio",
        value: i+1,
        id: `staruser${i+1}`,
        name: "ratingUser"
      });

      let starUserInputLabel = $(`<label>`, {
        for: `staruser${i+1}`,
      });
              
      rateUser.append(starUserInput);
      rateUser.append(starUserInputLabel);      
    });

    rateUserDiv.append(rateUser);

    // child rating
    
    let rateChildDiv = $("<div>", {
      id: "rate-child-div",
    });
    
    let rateChildLabel = $("<label>", {
      for: "rate-child-div"
    }).text("Te gusto la actividad a tu niño o niña?");

    let rateChild = $("<div>", {
      id: "rate-child",
      class: "starrating risingstar d-flex justify-content-center flex-row-reverse"
    });
    
    rateChildDiv.append(rateChildLabel)
    
    starsRating.map((stars2, i) => {

      let starChildInput = $(`<input>`, {
        type: "radio",
        value: i+1,
        id: `starchild${i+1}`,
        name: "ratingChild"
      });

      let starChildInputLabel = $(`<label>`, {
        for: `starchild${i+1}`,
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

    $("#start-form-btn").on("click", e => {
      e.preventDefault();
      //window.location.href="start";
      //PUSH END SURVEY
    });

  }; 

  const selector = () => {
    
    startBottomContainer.empty();
    
    let startSelector = $("<div>", {
      style: "margin-top: 20px",
      class: "col-sm-12 form-group justify-center center",
      id: "start-selector"
    });

    let startIta = $("<img>", {
      src: "/images/ita3d_1.png",
      class: "center"
    }).width(200).height(240);

    let startSelectorLabel = $("<label>", {
      for: "start-selector"
    }).text("Quieres hacer esta actividad? (haz clic abajo)");

    let startButton1 = $("<button>", {
      //type: "submit",
      class: "btn btn-success",
      style: "margin-top: 5px",
      id: "start-choice-btn-1"
    }).text("1) Aprende actividades saludables con ITA");

    let startButton2 = $("<button>", {
      //type: "submit",
      class: "btn btn-success",
      style: "margin-top: 5px",
      id: "start-choice-btn-2"
    }).text("2) Prueba ITA hoy para un mejor mañana");

    let startRandom = $("<div>", {
      style: "margin-top: 10px",
      class: "col-sm-12 form-group justify-center center",
      id: "start-selector"
    });

    let startRandomLabel = $("<label>", {
      for: "start-random-selector"
    }).text("Prefieres otra?  ");

    let startRandomButton = $("<button>", {
      //type: "submit",
      class: "btn btn-success",
      id: "start-random-btn"
    }).text("Prueba de nuevo");

    startSelector.append(startIta);  
    startSelector.append(startSelectorLabel);
    startSelector.append(document.createElement('br'));
    startSelector.append(startButton1);
    startSelector.append(document.createElement('br'));
    startSelector.append(startButton2);

    startRandom.append(startRandomLabel);
    startRandom.append(startRandomButton);

    startBottomContainer.append(startSelector);
    startBottomContainer.append(startRandom);
    
    $("#start-choice-btn-1").on("click", e => {
      e.preventDefault();
      window.open("https://youtu.be/lGxNjqAjfkc");
      // Buttons not connecting (no log on console), idk why 
      //setTimeout(function(){
      //  startEndSurvey();
      //}, 15000);
    });
  
    $("#start-choice-btn-2").on("click", e => {
      e.preventDefault();
      window.open("https://youtu.be/lGxNjqAjfkc"); 
      //setTimeout(function(){
      //  startEndSurvey();
      //}, 15000);
    });
  
    $("#start-btn-random").on("click", e => {
      e.preventDefault();
      window.open("https://youtu.be/lGxNjqAjfkc");
      // setTimeout(function(){
      //  startEndSurvey();
      // }, 15000);
    });

  }; 

  const mind = () => {
    
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
    }).text("What is mind?"); 

    mindRow.append(mindLabel);

    mindRow.append(mindLabel);
    startTopContainer.append(mindRow);
    selector();
    startContainer.append(startTopContainer);
    startContainer.append(startBottomContainer);

  };

  const diet = () => {
    
    startContainer.empty();

    startTopContainer.empty();
    startBottomContainer.empty();
     
    let dietRow = $("<div>", {
      style: "margin-top: 20px",
      class: "col-sm-12 form-group justify-center center",
      id: "diet-row"
    });

    let dietLabel = $("<label>", {
      for: "start-potatostat"
    }).text("What is diet?"); 

    dietRow.append(dietLabel);

    dietRow.append(dietLabel);
    startTopContainer.append(dietRow); 
    selector();
    startContainer.append(startTopContainer);
    startContainer.append(startBottomContainer);

  };

  const body = () => {

    startContainer.empty();

    startTopContainer.empty();
    startBottomContainer.empty();
     
    let bodyRow = $("<div>", {
      style: "margin-top: 20px",
      class: "col-sm-12 form-group justify-center center",
      id: "body-row"
    });

    let bodyLabel = $("<label>", {
      for: "start-potatostat"
    }).text("What is body?"); 

    bodyRow.append(bodyLabel);

    bodyRow.append(bodyLabel);
    startTopContainer.append(bodyRow);
    selector();
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
    }).text("No stats yet, here is a potato"); 

    let potatoStat = $("<img>", {
      src: "/images/papitacorp.jpg",
      class: "center"
    }).width(300).height(300);

    statsRow.append(potatoStat);
    statsRowLabel.append(potatoStatLabel);

    startContainer.append(statsRowLabel);
    startContainer.append(statsRow); 

  };
  
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
    }).width(200).height(240);

    let startRandomMessage = $("<label>", {
      for: "start-random-message"
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
