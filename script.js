let displayDate = document.getElementById('date')
let displayClock = document.getElementById('clock');
let audio = new Audio('https://onlineclock.net/audio/options/default.mp3')
audio.loop = true;
let alarmTime = null;
let alarmTimeout = null;
let timeFormat = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
});

function updateDay() {
    let date = new Date();

    let day = formatTime(date.getDay());
    displayDate.innerText=`${day}`;
}

function updateTime() {
    let date = new Date();

    // let hour = formatTime(date.getHours());
    // let minutes = formatTime(date.getMinutes());
    // let seconds = formatTime(date.getSeconds());
    // //`${hour}:${minutes}:${seconds}`

    displayClock.innerText=(timeFormat.format(date));
}

// function formatTime(time) {
//     if (time < 10) {
//         return '0' + time;
//     }
//     return time;
// }

function setAlarmTime(value) {
    alarmTime = value;
    console.log(alarmTime)
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