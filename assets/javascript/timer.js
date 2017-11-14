
$(document).ready(function() {
// run the timer

var number = 60; 
var intervalId;
function run() {
    intervalId = setInterval(decrement, 1000);
    $(".submitbutton").css("visibility", "visible");
};

// set the countdown
function decrement() {
    number--;
    
    $("#timer").text(number);

    if (number === 0) {
        stop();
        
    }
};

// when the countdown timer hits 0, it will stop
function stop() {
    clearInterval(intervalId);
    number = 60;
    $(".submitbutton").css("visibility", "hidden");
}

// start button
$(".startButton").on("click", run);


// stop button
// $(".restartButton").on("click", run);



});




