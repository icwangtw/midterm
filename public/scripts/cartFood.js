//errors and inputs
$(function() {
   $(".submitButton").on("click", function(event){
    event.preventDefault();
    let $button = $(this);
    let orderId = 22;       // TODO: make this not be insanely wrong
    $.ajax({
      method: 'POST',
      url: '/orders',
      timeout: 1500,
      data: {
        amount:$button.siblings(".inputAmount").serialize(),
        id:$button.siblings(".myFoodId").serialize(),
      },
      success: grabOrder(orderId),
      error: function (jqXHR, textStatus, errThrown) {
        console.log("oh god, error!", textStatus);
      },
    });
  });
});
