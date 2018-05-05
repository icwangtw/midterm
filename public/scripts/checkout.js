$(function() {
   $(".submitButton").on("click", function(event){
    event.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/orders',
      timeout: 1500,
      data: {
        amount:$button.siblings(".inputAmount").serialize(),
        id:$button.siblings(".myFoodId").serialize(),
      },
      success: renderSidebar,
      error: function (jqXHR, textStatus, errThrown) {
        console.log("oh god, error!", textStatus);
      },
    });
  });
});
