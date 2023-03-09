const displayTime = document.querySelector("#displayTime");
const startBtn = document.querySelector("#startBtn");
const pauseBtn = document.querySelector("#pauseBtn");
const resetBtn = document.querySelector("#resetBtn");

let startTime = 0;
let elapsedTime = 0;
let paused = true;
let timerId;
let hrs = 0;
let mins = 0;
let secs = 0;
let milliSecs = 0;

// START BUTTON
startBtn.addEventListener("click", () => {
  if(paused){
    paused = false;

    // calculate the start time - this is in milliseconds.
    startTime = Date.now() - elapsedTime;

    // start timer
    timerId = setInterval(updateTime, 75)

    displayTime.style.color = "#212121";
  }
});


// PAUSE BUTTON
pauseBtn.addEventListener("click", () => {
  if(!paused){
    paused = true;

    // store elapsedTime
    elapsedTime = Date.now() - startTime;

    // clear the setInterval
    clearInterval(timerId);

    displayTime.style.color = "red";
  }
});


// RESET BUTTON
resetBtn.addEventListener("click", () => {
  // resets everything so the timer would start afresh
  paused = true;
  clearInterval(timerId);
  startTime = 0;
  elapsedTime = 0;
  hrs = 0;
  mins = 0;
  secs = 0;
  milliSecs = 0;
  displayTime.style.color = "#212121";
  displayTime.textContent = "00:00:00:00";
});


// FUNCTION TO UPDATE THE TIMER
function updateTime(){
  // calculate the time elapsed - also in milliseconds.
  elapsedTime = Date.now() - startTime;

  /*
  next, format the elapsedTime to secs, mins, and hrs by:
    dividing it by 1000ms to get seconds.
    dividing it by 1000ms * 60secs to minutes.
    dividing it by 1000ms * 60secs * 60mins to hrs.

    rounded down each conversion modules, i.e ((conversion) % 60).
  */

  hrs = Math.floor((elapsedTime / (1000 * 60 * 60)) % 60);
  mins = Math.floor((elapsedTime / (1000 * 60)) % 60);
  secs = Math.floor((elapsedTime / 1000) % 60);
  milliSecs = Math.floor(elapsedTime % 60);

  hrs = pad(hrs);
  mins = pad(mins);
  secs = pad(secs);
  milliSecs = pad(milliSecs);
  
  // display timer
  displayTime.textContent = `${hrs}:${mins}:${secs}:${milliSecs}`;

  // now pad the time with extra zero if the length is 1, using any of the methods below:

    /* function pad(time) {
      time = time.toString();
      return time.length < 2 ? "0" + time : time;
    } */

    //  OR 

    function pad(unit) {
      return (("0") + unit).length > 2 ? unit : "0" + unit;
    }
}