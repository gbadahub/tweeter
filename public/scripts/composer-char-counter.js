let max = 140
$(document).ready(function() {
  $('form').find('textarea').keyup(function () {
    // returns array of numbers
    let count = $(this).val().length
    // subtracting the two values
    let charsLeft = max - count

    if (charsLeft < 0){
      // adds neg if value is less than 0
      ["-",count].join("")
      // adds red colour to vlaue if neg
      $("output").addClass("negNum")
      $("output").text(charsLeft)

      // 
    } else {
      // removes class if value is positive
      $("output").removeClass("negNum")
      $("output").text(charsLeft)
    }
  
  });

});