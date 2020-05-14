$(document).ready(() => {
  $("#btn-stats").on("click", e => {
    e.preventDefault();
    stats();
  });

  $("#btn-body").on("click", e => {
    e.preventDefault();
    body();
  });

  $("#btn-diet").on("click", e => {
    e.preventDefault();
    diet();
  });

  $("#btn-mind").on("click", e => {
    e.preventDefault();
    mind();
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

  let startContainer = $("#start-main-container");
  
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

  let startContainer = $("#start-main-container");
  
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

});
