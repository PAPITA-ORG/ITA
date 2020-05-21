$(document).ready(() => {

  $("#btn-stats").on("click", e => {
    e.preventDefault();
    stats();
  });

  $("#btn-body").on("click", e => {
    e.preventDefault();
    loading();
    setTimeout(function(){
      body();
    }, 10000);
    /*setTimeout(function(){
      startEndSurvey();
    }, 15000);*/    
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

  let startContainer = $("#start-main-container");
  let startTopContainer = $("#start-top-container");
  let startBottomContainer = $("#start-bottom-container");
  
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

    // user rating (not working)
    
    let rateUser = $("<div>", {
      id: "rate-user"
    });

    var emotionsArray = ['angry','disappointed','meh', 'happy', 'inLove'];
      
    $("#rate-user").emotionsRating({
      emotions: emotionsArray
    });

    // child rating (not working)
    
    let rateChild = $("<div>", {
      id: "rate-child"
    });    
    
    var emotionsArray = ['angry','disappointed','meh', 'happy', 'inLove'];
    
      $("#rate-child").emotionsRating({
        emotions: emotionsArray
      });
    
    console.log(emotionsRating);
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
    startForm.append(rateUser);
    startForm.append(rateChild);
    startForm.append(efficacyEnd);
    startForm.append(submitButton);
    startTopContainer.append(startForm);
    startContainer.append(startTopContainer);

    $("#start-form-btn").on("click", e => {
      e.preventDefault();
      window.location.href="start";
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
