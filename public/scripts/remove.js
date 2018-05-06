//remove order Items
$(function() {
function checkTotal(total, minus){
  if(!(total-minus)){
    return "0.00";
  } else{
    return (total - minus).toFixed(2);
  }
}


  $("#itemList").on("click", ".orderItem", function(event){
      let $button = $(this);
      let amountTotal = $button.children(".orderQuanitiy").text().replace("x","");
      let minus =  $button.children(".orderPrice").text().replace("$","");
      let minusTotal = amountTotal*minus;
      let totalPrice = $("#total").text();
      $("#total").text(checkTotal(totalPrice, minusTotal));

      $button.remove();
  });
});
