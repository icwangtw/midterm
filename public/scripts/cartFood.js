//errors and inputs
$(function() {
   $(".submitButton").on("click", function(event){
    event.preventDefault();
    let $button = $(this);
      $.ajax({
        method: 'POST',
        url: '/orders',
        data:
          {
            amount:$button.siblings(".inputAmount").serialize(),
            id:$button.siblings(".myFoodId").serialize()
          },
        success:
          grabOrder
    });
  });
});
