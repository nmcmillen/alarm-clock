//Declared variables
let displayDate = document.getElementById('date')
let displayClock = document.getElementById('clock');
let audio = new Audio('https://onlineclock.net/audio/options/default.mp3')
audio.loop = true;
//Did not know the initial value wanted/needed so set it to null to declare later
let alarmTime = null;
let alarmTimeout = null;
//Variable set to string/number to switch back and forth between 12 hour and 24 hour clock in the updateTime() function
let clockType = 12;
//Used the following time formats to set both the clock time along with the date. Using hour12: false sets to 24 hour clock
let timeFormatTwelve = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',minute: 'numeric', second: 'numeric',
});
let timeFormatTwentyFour = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false,
})
let dateFormat = new Intl.DateTimeFormat('en-US', {month: 'long', day: 'numeric', year: 'numeric',
})

//This function sets a Date Constructor variable to display the inner text in the previously declared displayDate variable for the HTML "clock" element
function updateDay() {
    let date = new Date();
    displayDate.innerText=(dateFormat.format(date));
}

//This function updates the clock using the string variable with parameter "t". I still don't have a full understanding of using "t" as a parameter along with string variable
function updateClock(t) {
    clockType = t
}

//This function updates the time for every second using a set interval of 1000ms (1 second) when it's called at the bottom
//Uses new date constructor with local variable of "str" of empty string that can be filled with either 12 or 24 to update clock
//Pairs with "updateClock" function and the onclick HTML element to format 12 or 24 clock with radio button selection
function updateTime() {
    let date = new Date();
    var str = '';
    if(clockType == 12 ){
        str = timeFormatTwelve.format(date);
    } else {
        str = timeFormatTwentyFour.format(date);
    }
    displayClock.innerText = str;
}

//This function helps set the alarm time value in the "setAlarm" function below
function setAlarmTime(value) {
    alarmTime = value;
}

//Sets the alarm using "alarmTime" variable above paired with the onclick button HTML element
//"current" variable equals current time, 
function setAlarm() {
    if (alarmTime) {
        let current = new Date();
        let timeToAlarm = new Date(alarmTime);

        //'timeToAlarm' has to be greater(later) than the current time otherwise it would not work/make sense. "getTime" pulls the time in milleseconds.
        //"setTimout" is a global function to my understanding. It is linked to play the audio variable when it gets to the selected time.
        //This then will pull an alert at the top of the screen using the 'Alarm set for' string concatenated with the set "alarmTime"
        if (timeToAlarm > current) {
            let timeout = timeToAlarm.getTime() - current.getTime();
            alarmTimeout = setTimeout(() => audio.play(), timeout);
            alert('Alarm set for ' + alarmTime);
        }
    }
}

//Clears the alarm using audio variable with the pause element. Can clear the alarm before it goes off or during with alert popping up it's been cleared
function clearAlarm() {
    audio.pause();
    if (alarmTimeout) {
        clearTimeout(alarmTimeout);
        alert('Alarm Cleared');
    } 
}

setInterval(updateTime, 500);
updateDay();