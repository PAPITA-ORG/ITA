console.log("hello");
$(document).ready(function() {
  let currentTab = 0;

  showTab(currentTab);

  $(".prevNext").on("click", e => {
    e.preventDefault();
    nextPrev($(e.target).val());
  });

  function showTab(n) {
    let tabs = $(".tab");
    let prevBtn = $(".prevBtn");
    let nextBtn = $(".nextBtn");
    let finishBtn = $(".finishBtn");

    $(tabs[n]).show();

    if (n === 0) {
      prevBtn.hide();
    } else {
      prevBtn.show();
    }

    if (n === tabs.length - 1) {
      nextBtn.hide();
      finishBtn.show();
    } else {
      nextBtn.show();
      finishBtn.hide();
    }
  }

  function nextPrev(n) {
    let tabs = $(".tab");
    $(tabs[currentTab]).hide();

    currentTab = currentTab + Number(n);
    showTab(currentTab);
  }
});
