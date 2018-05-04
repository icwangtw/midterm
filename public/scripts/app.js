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
    success:
    inputOrder
  });
}

function grabOrder(myOrder){
  console.log(myOrder);
}
