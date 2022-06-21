// Material Select Initialization
$(document).ready(function() {
    $('.mdb-select').materialSelect();
    });


    function myFunction() {
        var checkBox = document.getElementById("dropdownCheck");
        var text = document.getElementById("text");
        if (checkBox.checked == true){
          text.style.display = "block";
        } else {
           text.style.display = "none";
        }
      }