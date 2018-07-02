var letter = "";
var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var time = 10;
const INPUT = document.getElementById("entry");
var enteredNames = [" "];
var timerVar;
var timerRunning = false;

letter += possible.charAt(Math.floor(Math.random() * possible.length));

document.getElementById("currentLetter").innerHTML = letter;

var recordCount = 0;

function checker(name) {
  $.get("names.txt", function(contents){
     //contents variable now contains the contents of the textfile as string

     //check if file contains the word Hello
     var hasName = contents.includes(name);

     if(name.charAt(0) != letter) {
       alert("Your Name doesn't start with the current letter");
       lose();
     }
     else{
       if (hasName) {
         if(enteredNames.includes(name)) {
           alert("Repetitive Name! Sorry!");
           lose();
         }
         else {
           document.getElementById("output").innerHTML = "Correct!"
           recordCount++;
           document.getElementById("counter").innerHTML = "Correct Number is: " + recordCount;
           letter = name.substr(name.length -1).toUpperCase();
           document.getElementById("currentLetter").innerHTML = letter;
           enteredNames.push(name);
           INPUT.value = "";
           time = 10;
         }


       }
       else {
         document.getElementById("output").innerHTML = "Incorrect!"
         lose();
       }
     }
     //outputs true if contained, else false

  })
}

function lose() {
  recordCount = 0;
  time = 0;
  var enteredNames = [" "];
  document.getElementById("counter").innerHTML = "You have lost :P";
  clearInterval(timerVar);
  INPUT.disabled = "disabled";

}

document.getElementById("submit").addEventListener('click', function() {
    var textField = document.getElementById('entry').value;
    checker(textField);


});

function startCounter () {

    if (!timerRunning) {
        timerRunning = true;
        timerVar = setInterval(function(){
         time--;
         if (time==0) {
           clearInterval(timerVar);
           timerRunning = false;
           time = 10;
           lose();
         }
       }, 1000);

    }

    setInterval(function() {
      document.getElementById("seconds").innerHTML = "You have " + time + " seconds left."
    }, 250);

}


INPUT.addEventListener("keypress", startCounter ,false)


// Execute a function when the user releases a key on the keyboard
INPUT.addEventListener("keyup", function(event) {
  // Cancel the default action, if needed
  event.preventDefault();
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Trigger the button element with a click
    document.getElementById("submit").click();
  }
});
