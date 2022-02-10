let displayDate = document.getElementById('date')
let displayClock = document.getElementById('clock');
let audio = new Audio('https://onlineclock.net/audio/options/default.mp3')
audio.loop = true;
let alarmTime = null;
let alarmTimeout = null;
let timeFormatTwelve = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',minute: 'numeric', second: 'numeric',
    //hour12: false (use this to change from 12 hour clock to 24)
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

function updateTime() {
    let date = new Date();
    displayClock.innerText=(timeFormatTwelve.format(date));
}

function updateTime24() {
    let date = new Date();
    displayClock.innerText=(timeFormatTwentyFour.format(date));
}

// function updateTime() {
//     let date = new Date();

//     let 12hour = document.getElementById("12hour");
//     let 24hour = document.getElementById("24hour");

//     if(12hour.checked==true)
//      displayClock.innerText=(timeFormatTwelve.format(date));
//     else(24hour.checked==true)
//      displayClock.innerText=(timeFormatTwentyFour.format(date));
//}

//     // let hour = formatTime(date.getHours());
//     // let minutes = formatTime(date.getMinutes());
//     // let seconds = formatTime(date.getSeconds());
//     // //`${hour}:${minutes}:${seconds}`



//     //displayClock.innerText=(timeFormatTwelve.format(date));
// }

// function formatTime(time) {
//     if (time < 10) {
//         return '0' + time;
//     }
//     return time;
// }

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