// $(() => {
//   $.ajax({
//     method: "GET",
//     url: "/api/users"
//   }).done((users) => {
//     for(user of users) {
//       $("<div>").text(user.name).appendTo($("body"));
//     }
//   });;
// });

//calls for order
function loadOrder(){
  $.ajax({
    method: 'GET',
    url: '/orders',
    success: inputOrder
  });
}

function grabOrder(orderId){
  console.log("how rude", orderId);
  $.ajax({
    method: 'GET',
    url: '/orders',     // TODO: this isn't right!
    success: renderSidebar,
    error: function(err) {console.log('wtf error wtf', err);},
  });


}

function renderSidebar(orderData){

  // TODO:
  //  1) generate the HTML
  //  2) squoosh it into place
}
