function getTime() {
  $.ajax({
    url: '/eta',
    method: 'GET',
    success: function(response){
      console.log(response);
      if(response === "notReady"){
        console.log("Server said Not Readys");
      } else{
        console.log("its ready");
      }
    },
    error: function (jqXHR, textStatus, errThrown){
      console.log("error found on timeCheck.js getTime()!", textStatus);
    }
  });
}


$(function() {
    setInterval(getTime(),5000);
});
