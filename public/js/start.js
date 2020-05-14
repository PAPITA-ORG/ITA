$(document).ready(() => {
  $("#btn-stats").on("click", e => {
    e.preventDefault();
    stats();
  });

  $("#btn-body").on("click", e => {
    e.preventDefault();
    loading();
    move();
    body();
    selector();
  });

  $("#btn-diet").on("click", e => {
    e.preventDefault();
    loading();
    move();
    diet();
    selector();
  });

  $("#btn-mind").on("click", e => {
    e.preventDefault();
    loading();
    move();
    mind();
    selector();
  });

    $("#start-choice-btn-1").on("click", e => {
      e.preventDefault();
      //window.open("https://youtu.be/lGxNjqAjfkc", '_blank'); 
      addForm();
    });

    $("#start-choice-btn-2").on("click", e => {
      e.preventDefault();
      //window.open("https://youtu.be/lGxNjqAjfkc", '_blank'); 
      addForm();
    });
    
    $("#start-form-btn").on("click", e => {
      e.preventDefault();
      window.location.href("/");
    });

  let startContainer = $("#start-main-container");
  let startTopContainer = $("#start-top-container");
  let startBottomContainer = $("#start-bottom-container");

  const mind = () => {
    startTopContainer.empty();
     
    let mindRow = $("<div>", {
      style: "margin-top: 20px",
      class: "col-sm-12 form-group justify-center center",
      id: "mind-row"
    });

    let mindLabel = $("<label>", {
      for: "start-potatostat"
    }).text("What is mind?"); 

    mindRowLabel.append(mindLabel);

    mindRow.append(mindLabel);
    startContainer.append(mindRow); 

  };

  const diet = () => {
    startTopContainer.empty();
     
    let dietRow = $("<div>", {
      style: "margin-top: 20px",
      class: "col-sm-12 form-group justify-center center",
      id: "diet-row"
    });

    let dietLabel = $("<label>", {
      for: "start-potatostat"
    }).text("What is diet?"); 

    dietRowLabel.append(dietLabel);

    dietRow.append(dietLabel);
    startContainer.append(dietRow); 

  };

  const body = () => {
    startTopContainer.empty();
     
    let bodyRow = $("<div>", {
      style: "margin-top: 20px",
      class: "col-sm-12 form-group justify-center center",
      id: "body-row"
    });

    let bodyLabel = $("<label>", {
      for: "start-potatostat"
    }).text("What is body?"); 

    bodyRowLabel.append(bodyLabel);

    bodyRow.append(bodyLabel);
    startContainer.append(bodyRow); 

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
      class: "btn btn-success1",
      id: "start-choice-btn-1"
    }).text("Aprende actividades saludables con ITA");

    let startButton2 = $("<button>", {
      //type: "submit",
      class: "btn btn-success2",
      id: "start-choice-btn-2"
    }).text("Prueba ITA hoy");

    let startRandom = $("<div>", {
      style: "margin-top: 10px",
      class: "col-sm-12 form-group justify-center center",
      id: "start-selector"
    });

    let startRandomLabel = $("<label>", {
      for: "start-random-selector"
    }).text("Prefieres otra?");

    let startRandomButton = $("<button>", {
      //type: "submit",
      class: "btn btn-success",
      id: "start-random-btn"
    }).text("Prueba de nuevo");

    linebreak = document.createElement("br");
  
    startSelector.append(startIta);  
    startSelector.append(startSelectorLabel);
    //startSelector.append(linebreak);
    startSelector.append(startButton1);
    startSelector.append(startButton2);

    startRandom.append(startRandomLabel);
    //startRandom.append(linebreak);
    startRandom.append(startRandomButton);

    startContainer.append(startSelector);
    startContainer.append(startRandom);
     
    
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

  function addForm() {
    startContainer.empty();

    // create a form
    let startForm = $("<form>", {
      id: "start-form"
    });

    // create a div with class form-group
    let formGroup = $("<div>", {
      class: "form-group"
    });

    // create a label
    let emailLabel = $("<label>", {
      for: "start-form-email"
    }).text("Ingresa tus datos");

     let passwordLabel = $("<label>", {
      for: "start-form-password"
    }).text("Contrasena"); 

    // create email input tag
    let emailInput = $("<input>", {
      type: "email",
      class: "form-control",
      id: "start-form-email",
      placeholder: "correo"
    });

    // create password input
    let passwordInput = $("<input>", {
      type: "password",
      class: "form-control",
      id: "start-form-password",
      placeholder: "contraseña"
    });

    // create small tag
    let emailSmall = $("<small>", {
      class: "form-text text-muted"
    }).text("We'll never share your verguita with anyone else");

    // create small tag for password
    let passwordSmall = $("<small>", {
      class: "form-text text-muted"
    }).text("Asegure que su contrasena sea de mas de 6 caracteres");

    // create submit button

    let submitButton = $("<button>", {
      type: "submit",
      class: "btn btn-success",
      id: "start-form-btn"
    }).text("Volver");

    formGroup.append(emailLabel);
    formGroup.append(emailInput);
    //formGroup.append(emailSmall);

    //formGroup.append(passwordLabel);
    formGroup.append(passwordInput);
    //formGroup.append(passwordSmall);
     
    startForm.append(formGroup);
    startForm.append(submitButton);
    
    startContainer.append(startForm);

  }; 

});
