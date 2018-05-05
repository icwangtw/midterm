var myInterval = setInterval(
function getTime() {
  $.ajax({
    url: '/eta',
    method: 'GET',
    success: function(response){
      if(response !== "Not Ready"){
        clearInterval(myInterval);
        $("#status").text("Your food will be ready in " + response + "mintues!");
      }
    },
    error: function (jqXHR, textStatus, errThrown){
      console.log("error found on timeCheck.js getTime()!", textStatus);
    }
  });
}, 5000);
