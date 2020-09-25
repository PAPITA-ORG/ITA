$(document).ready(function() {
  let currentTab = 0;
  let formInput = $("input.tab-input-ratings");

  let userRating;

  $("i").click(function(e) {
    $(this).addClass("rating-score");
    $(this)
      .siblings()
      .removeClass("rating-score");

    $(this)
      .prevAll()
      .addBack()
      .css({ color: "#b10c1a" });

    $(this)
      .nextAll()
      .css({ color: "#409b03" });

    userRating = Number($(this).attr("value"));
    $(formInput[currentTab]).attr("value", userRating);
  });

  $("i").hover(
    function(e) {
      $(this)
        .prevAll()
        .css({ color: "#ffca08" });
    },
    function(e) {
      if (!$(formInput[currentTab]).attr("value")) {
        $(this)
          .prevAll()
          .css({ color: "#409b03" });
      } else {
        $(".rating-score")
          .prevAll()
          .addBack()
          .css({ color: "#b10c1a" });

        $(".rating-score")
          .nextAll()
          .css({ color: "#409b03" });
      }
    }
  );
  showTab(currentTab);

  function showTab(n) {
    let tabs = $(".tab");
    $(tabs[n]).css("display", "block");

    if (n === 0) {
      $(".prevBtn").css("display", "none");
      $(".nextBtn").css("display", "inline");
    } else {
      if (n < tabs.length - 1) {
        $(".finishBtn").css("display", "none");
        $(".nextBtn").css("display", "inline");
      }
      $(".prevBtn").css("display", "inline");
    }

    if (n === tabs.length - 1) {
      $(".nextBtn").hide();
      $(".finishBtn").css("display", "inline");
    } else {
      $(".finishBtn").css("display", "none");
    }
  }

  function adjustProgress(n, tabLength) {
    let percent = n === tabLength - 1 ? "95%" : `${(n / tabLength) * 100 + 5}%`;
    $(".progress-bar-animated").css({
      width: n === 0 ? "10%" : percent
    });
  }

  $(".prevNext").click(e => {
    e.preventDefault();
    let btnValue = Number($(e.target).attr("value"));
    if (btnValue === 1) {
      if (validateInput()) {
        nextPrev(btnValue);
      } else {
        return;
      }
    } else {
      nextPrev(btnValue);
    }

    adjustProgress(currentTab, $(".tab").length);
  });

  function nextPrev(n) {
    let tabHide = $(".tab")[currentTab];
    $(tabHide).css("display", "none");
    currentTab = currentTab + n;
    showTab(currentTab);
  }

  function validateInput() {
    // validate that user has rated the activity in each tab
    if (!$(formInput[currentTab]).attr("value")) {
      $(".form-err").html(`
      <div class= "alert alert-warning alert-dismissible fade show" role="alert">
        Por favor asegurese de valorar esta actividad 
        <button class= "close" type="button" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true"> &times; </span>
        </button>
      </div>
      `);
      return false;
    } else {
      if ($(".alert")) {
        $(".alert").remove();
      }
      return true;
    }
  }

  $(".finishBtn").click(e => {
    e.preventDefault();
    if (!validateInput()) {
      console.log("invalid form");
    } else {
      $("form").submit();
    }
  });
});
