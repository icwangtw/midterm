function renderSidebar(qty, name, price){
  //Insert item to sidebar
  var $name = $("<span/>").attr("class","orderName").text(name);
  var $quantity =  $("<span/>").attr("class","orderQuanitiy").text("x" + qty);
  var $price = $("<span/>").attr("class","orderPrice").text("$"+ (price/100).toFixed(2));
  var $br = $("<br/>")
  var $div = $("<div/>").attr("class","orderItem").append($name, $br, $price, $quantity);

  $("#itemList").append($div);

  //Update TotalPrice
  var totalPrice = $("#total").text();
  totalPrice = (totalPrice*100).toFixed(2);
  totalPrice = Number(totalPrice) + (Number(price)*Number(qty));
  totalPrice = (totalPrice/100).toFixed(2);
  $("#total").text(totalPrice);


}





$(function() {
   $(".submitButton").on("click", function(event){
    event.preventDefault();
    let $button = $(this);
    let inputAmount = $button.siblings(".quantity").val();
    let foodName = $button.siblings(".myFoodName").val();
    let foodPrice = $button.siblings(".myFoodPrice").val();
    if(isNaN(inputAmount)){
      alert("You to enter a number");
    } else{
      renderSidebar(inputAmount, foodName, foodPrice);
    }


  //   $.ajax({
  //     method: 'POST',
  //     url: '/orders',
  //     timeout: 1500,
  //     data: {
  //       amount:$button.siblings(".inputAmount").serialize(),
  //       id:$button.siblings(".myFoodId").serialize(),
  //     },
  //     success: renderSidebar,
  //     error: function (jqXHR, textStatus, errThrown) {
  //       console.log("oh god, error!", textStatus);
  //     },
  //   });
  });
});
