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
  Number(totalPrice);
  totalPrice = (totalPrice*100).toFixed(2);
  totalPrice = Number(totalPrice) + (Number(price)*Number(qty));
  totalPrice = (totalPrice/100).toFixed(2);
  $("#total").text(totalPrice);
}


$(function() {
  let myOrder = [];

  //adds items to sidebar
   $(".submitButton").on("click", function(event){
    event.preventDefault();
    let $button = $(this);
    let inputAmount = $button.siblings(".quantity").val();
    let foodName = $button.siblings(".myFoodName").val();
    foodName = foodName.replace("_", " ");
    let foodPrice = $button.siblings(".myFoodPrice").val();
    let foodId = $button.siblings(".myFoodId").val();
    if(isNaN(inputAmount)){
      alert("You to enter a number");
    } else{
      renderSidebar(inputAmount, foodName, foodPrice);

      //storing data for checkout
      myOrder.push({
        id: foodId,
        qty:inputAmount
      });
    }
  });

   //sends cart items to server
  $('.checkoutButton').on("click", function(event){
    event.preventDefault();
    let $button = $(this);
    console.log('amount', $button.siblings(".checkoutName").val());
    console.log('number' ,$button.siblings(".checkoutPhone").val());
    console.log('cart', myOrder);
    console.log('amount', $button.parentsUntil(".body").find("#total").text());
    $.ajax({
      method: 'POST',
      url: '/confirm',
      timeout: 1500,
      data: {
        name:$button.siblings(".checkoutName").val(),
        phone:$button.siblings(".checkoutPhone").val(),
        orderId:$button.siblings("#orderId").text(),
        cart:myOrder,
        total:$button.parentsUntil("#body").find("#total").text(),
      },
      success: console.log("responsed"),
      error: function (jqXHR, textStatus, errThrown) {
        console.log("oh god, error!", textStatus);
      },
    });
  });
});
