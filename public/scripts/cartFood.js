//errors and inputs
$(function() {
   $("#submitButton").on("click", function(event){
    event.preventDefault();
      $.ajax({
        method: 'POST',
        url: '/orders',
        data:
          {
            amount:$("#inputAmount").serialize(),
            id:$("#myFoodId").serialize()
          },
        success:
          grabOrder
      });

  });
});
