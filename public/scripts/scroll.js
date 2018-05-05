//scrolls to the correct header
function scrollToElement (clicked, scrollTo){
    $(clicked).click(function() {
      $('html, body').animate({
          scrollTop: $(scrollTo).offset().top -90
      }, 100);
  });
}

$(function() {
scrollToElement(".navEntree", ".entree");
scrollToElement(".navSnack", ".snack");
scrollToElement(".navDrink", ".drink");
});
