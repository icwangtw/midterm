setInterval(
function getTime() {
  $.ajax({
    url: '/eta',
    method: 'GET',
    success: function(response){
      console.log(response);
      if(response === "Not Ready"){
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




, 5000);
