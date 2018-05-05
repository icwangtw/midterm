function updateTime(time) {
  $("h2").empty()
  $("h2").append("Thank you for your order! Your order will be ready in" + time + "minutes.")
  console.log("sucess!")
}
exports.updateTime = updateTime

 var source = new EventSource('/stream');

  source.addEventListener('message', function(e) {
    console.log(e.data);
  }, false);
