import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';


const refs = {
    startBtnEl: document.querySelector('button[data-start]'),
    days: document.querySelector('span[data-days]'),
    hours: document.querySelector('span[data-hours]'),
    minutes: document.querySelector('span[data-minutes]'),
    seconds: document.querySelector('span[data-seconds]'),
};



let intervalId = null;
const INTERVAL_DELAY = 1000;


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  
    onClose(selectedDates) {
        if (Date.now() > selectedDates[0]) {
            Notiflix.Notify.failure('Please choose a date in the future');
            refs.startBtnEl.disabled = true;
            return;
        };

        if (Date.now() < selectedDates[0]) {
            Notiflix.Notify.success('Date is correct');
            refs.startBtnEl.disabled = false;
        };

        refs.startBtnEl.addEventListener('click', onClickStartBtnEl);
        
        function onClickStartBtnEl() {
            intervalId = setInterval(() => {
                const deltaTime = selectedDates[0] - Date.now();
                
                if (deltaTime < INTERVAL_DELAY) {
                clearInterval(intervalId);                    
                };
            
                const convertedTime = convertMs(deltaTime);
                
                displayTimer(convertedTime);

                refs.startBtnEl.disabled = true;
            }, INTERVAL_DELAY);
        };
    },
};

 
refs.startBtnEl.setAttribute('disabled', true);


flatpickr('#datetime-picker', options);

function displayTimer({ days, hours, minutes, seconds}) {
  refs.days.textContent = `${days}`;
  refs.hours.textContent = `${hours}`;
  refs.minutes.textContent = `${minutes}`;
  refs.seconds.textContent = `${seconds}`;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};



function addLeadingZero(value) {
    return String(value).padStart(2, "0");
};

