$(document).ready(() => {
  let startContainer = $("#start-main-container");
  $("#btn-stats").on("click", e => {
    e.preventDefault();
    stats();
  });

  let startContainer = $("#start-main-container");
  $("#btn-stats").on("click", e => {
    e.preventDefault();
    stats();
  });

  const exercise = () => {
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
