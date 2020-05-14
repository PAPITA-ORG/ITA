$(document).ready(() => {
  $("#btn-stats").on("click", e => {
    e.preventDefault();
    stats();
  });

  $("#btn-body").on("click", e => {
    e.preventDefault();
    loading();
    move();
    setTimeout(function (){
      selector();
    }, 3000);
  });

  $("#btn-diet").on("click", e => {
    e.preventDefault();
    loading();
    move();
    setTimeout(function (){
      selector();
    }, 3000); 
  });

  $("#btn-mind").on("click", e => {
    e.preventDefault();
    loading();
    move();
    setTimeout(function (){
      selector();
    }, 3000);
  });

  $("#start-choice-btn").on("click", e => {
    e.preventDefault();
    //window.open("https://youtu.be/lGxNjqAjfkc", '_blank'); 
    end();
  });
  
  $("#start-form-btn").on("click", e => {
    e.preventDefault();
    window.location.href("/");
  });

  let startContainer = $("#start-main-container");
  
  const mind = () => {
    startContainer.empty();
  
    let mindRow = $("<div>", {
      style: "margin-top: 20px",
      class: "col-sm-12 form-group justify-center center",
      id: "mind-row"
    });
  
    let mindRowLabel = $("<div>", {
      style: "margin-top: 20px",
      class: "col-sm-12 form-group justify-center center",
      id: "mind-row"
    });

    let potatoStatLabel = $("<label>", {
      for: "start-potatostat"
    }).text("No mind yet, here is a potato"); 

    let potatoStat = $("<img>", {
      src: "/images/papitacorp.jpg",
      class: "center"
    }).width(300).height(300);

    mindRow.append(potatoStat);
    mindRowLabel.append(potatoStatLabel);

    startContainer.append(mindRowLabel);
    startContainer.append(mindRow); 

  };

  const diet = () => {
    startContainer.empty();
  
    let dietRow = $("<div>", {
      style: "margin-top: 20px",
      class: "col-sm-12 form-group justify-center center",
      id: "diet-row"
    });
  
    let dietRowLabel = $("<div>", {
      style: "margin-top: 20px",
      class: "col-sm-12 form-group justify-center center",
      id: "diet-row"
    });

    let potatoStatLabel = $("<label>", {
      for: "start-potatostat"
    }).text("No diet yet, here is a potato"); 

    let potatoStat = $("<img>", {
      src: "/images/papitacorp.jpg",
      class: "center"
    }).width(300).height(300);

    dietRow.append(potatoStat);
    dietRowLabel.append(potatoStatLabel);

    startContainer.append(dietRowLabel);
    startContainer.append(dietRow); 

  };

  const body = () => {
    startContainer.empty();
  
    let bodyRow = $("<div>", {
      style: "margin-top: 20px",
      class: "col-sm-12 form-group justify-center center",
      id: "body-row"
    });
  
    let bodyRowLabel = $("<div>", {
      style: "margin-top: 20px",
      class: "col-sm-12 form-group justify-center center",
      id: "body-row"
    });

    let potatoStatLabel = $("<label>", {
      for: "start-potatostat"
    }).text("No body yet, here is a potato"); 

    let potatoStat = $("<img>", {
      src: "/images/papitacorp.jpg",
      class: "center"
    }).width(300).height(300);

    bodyRow.append(potatoStat);
    bodyRowLabel.append(potatoStatLabel);

    startContainer.append(bodyRowLabel);
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
    
    startContainer.empty();
    
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
      for: "start-random-selector"
    }).text("Quieres hacer esta actividad? (haz clic abajo)");

    let startButton = $("<button>", {
      type: "submit",
      class: "btn btn-success",
      id: "start-choice-btn"
    }).text("Aprende actividades saludables con ITA");

    linebreak = document.createElement("br");
  
    startSelector.append(startIta);  
    startSelector.append(startSelectorLabel);
    startSelector.append(linebreak);
    startSelector.append(startButton);
    startContainer.append(startSelector); 
    
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

  function end() {
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
