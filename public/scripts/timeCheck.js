//checks for server responds
var myInterval = setInterval(
function getTime() {
  $.ajax({
    url: '/eta',
    method: 'GET',
    success: function(response){
      if(response !== "Not Ready"){
        clearInterval(myInterval);
        $("#status").text("Your food will be ready in "+response+ " mins");
        var readyInterval = setInterval( function getTime() {
          $.ajax({
            url: '/ready',
            method: 'GET',
            success: function(whenReady){
              if(whenReady === "pickup"){
                clearInterval(readyInterval);
                $("#status").text("Your food is ready for pick up");
              }
            },
            error: function (jqXHR, textStatus, errThrown){
              console.log("error found! /ready Get", textStatus);
            }
          });
        }, 3000);
      }
    },
    error: function (jqXHR, textStatus, errThrown){
      console.log("error found on timeCheck.js getTime()!", textStatus);
    }
  });
}, 3000);
