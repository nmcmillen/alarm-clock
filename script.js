let displayDate = document.getElementById('date')
let displayClock = document.getElementById('clock');
let audio = new Audio('https://onlineclock.net/audio/options/default.mp3')
audio.loop = true;
let alarmTime = null;
let alarmTimeout = null;
let clockType = 12;
let timeFormatTwelve = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',minute: 'numeric', second: 'numeric',
});
let timeFormatTwentyFour = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false,
})

let dateFormat = new Intl.DateTimeFormat('en-US', {month: 'long', day: 'numeric', year: 'numeric',
})

function updateDay() {
    let date = new Date();
    displayDate.innerText=(dateFormat.format(date));
}

function updateClock(t) {
    clockType = t
}

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

function setAlarmTime(value) {
    alarmTime = value;
}

function setAlarm() {
    if (alarmTime) {
        let current = new Date();
        let timeToAlarm = new Date(alarmTime);

        if (timeToAlarm > current) {
            let timeout = timeToAlarm.getTime() - current.getTime();
            alarmTimeout = setTimeout(() => audio.play(), timeout);
            alert('Alarm set for ' + alarmTime);
        }
    }
}

function clearAlarm() {
    audio.pause();
    if (alarmTimeout) {
        clearTimeout(alarmTimeout);
        alert('Alarm Cleared');
    } 
}

setInterval(updateTime, 1000);
updateDay();