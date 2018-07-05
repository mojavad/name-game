var letter = "";
var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var time = 10;
const INPUT = document.getElementById("entry");
const OKBUTTON = document.getElementById("submit");
const RESETBUTTON = document.getElementById("reset");
var enteredNames = [" "];
var timerVar;
var timerRunning = false;
var refresher;
var audio = true;


letter += possible.charAt(Math.floor(Math.random() * possible.length));

document.getElementById("currentLetter").innerHTML = letter;

var recordCount = 0;

function checker(name) {
  $.get("names.txt", function(contents){
     //contents variable now contains the contents of the textfile as string
     //check if file contains the word Hello
     var hasName = contents.includes(name);

     if(name.charAt(0) != letter) {
       document.getElementById("output").style.color = "#d19a56"
       document.getElementById("output").innerHTML = "Wrong Letter!"
       INPUT.value = "";
     }
     else{
       if (hasName) {
         if(enteredNames.includes(name)) {
           document.getElementById("output").style.color = "#d19a56"
           document.getElementById("output").innerHTML = "Repetitive Name!"
           INPUT.value = "";

         }
         else {
           document.getElementById("output").style.color = "#69b779"
           document.getElementById("output").innerHTML = "Correct!"
           if (audio) {
             var incAudio = new Audio('sounds/correct.mp3');
             incAudio.play();
           }
           recordCount++;
           document.getElementById("counter").innerHTML = "Correct Number is: <b>" + recordCount + "</b>";
           letter = name.substr(name.length -1).toUpperCase();
           document.getElementById("currentLetter").innerHTML = letter;
           enteredNames.push(name);
           INPUT.value = "";
           time = 10;
         }


       }
       else {
         document.getElementById("output").style.color = "#d19a56"
         document.getElementById("output").innerHTML = "Name doesn't exist!"
         INPUT.value = "";
       }
     }
     //outputs true if contained, else false

  })
}

function lose() {
  document.getElementById("seconds").style.visibility = "hidden";
  recordCount = 0;
  time = 0;
  enteredNames = [" "];
  timerRunning = false;
  clearInterval(timerVar);
  clearInterval(refresher);
  INPUT.disabled = "disabled";
  OKBUTTON.style.visibility = "hidden";
  RESETBUTTON.style.visibility = "visible";
  if (audio) {
    var incAudio = new Audio('sounds/incorrect.mp3');
    incAudio.play();
  }
  document.getElementById("output").style.color = "#e06c75"
  document.getElementById("output").innerHTML = "You have lost!"


}

document.getElementById("submit").addEventListener('click', function() {
    var textField = document.getElementById('entry').value;
    var tempName = textField.charAt(0).toUpperCase() + textField.substr(1,textField.length).toLowerCase();
    checker(tempName);


});

function startCounter () {

    if (!timerRunning) {
      document.getElementById("seconds").style.visibility = "visible";
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

    refresher = setInterval(function() {
      document.getElementById("seconds").innerHTML = "You have " + time + " seconds left."
      if (time>7) {
        document.getElementById("seconds").style.color = "#69b779";
      }
      else if (4<=time&&time<=7) {
        document.getElementById("seconds").style.color = "#d19a56";
      }
      else {
        document.getElementById("seconds").style.color = "#e06c75";

      }
    }, 250);

}


INPUT.addEventListener("keypress", startCounter ,false)
RESETBUTTON.addEventListener('click', function(e) {

});

document.getElementById("reset").addEventListener('click', function() {
    document.getElementById("seconds").innerHTML = ""
    document.getElementById("counter").innerHTML = "Correct Number is: " + recordCount;
    letter = "";
    time = 10;
    document.getElementById("seconds").innerHTML = " ";
    letter += possible.charAt(Math.floor(Math.random() * possible.length));
    document.getElementById("currentLetter").innerHTML = letter;
    INPUT.removeAttribute("disabled");
    timerRunning = false;
    INPUT.value = "";
    OKBUTTON.removeAttribute("disabled");
    RESETBUTTON.style.visibility = "hidden";
    document.getElementById("output").innerHTML = ""
    OKBUTTON.style.visibility = "visible";



});

document.getElementById("sound-image").addEventListener("click", function() {
    if (audio) {
        document.getElementById("sound-image").src = "no-sound.png";
        audio = false;
    }
    else {
      document.getElementById("sound-image").src = "sound.png";
      audio = true;

    }
});

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
