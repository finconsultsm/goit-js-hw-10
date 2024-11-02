import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let userSelectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    onDateTimePickerChange(selectedDates);
  },
};

flatpickr('#datetime-picker', options);

const startBtn = document.querySelector('button[data-start]');
const daysRef = document.querySelector('span[data-days]');
const hoursRef = document.querySelector('span[data-hours]');
const minsRef = document.querySelector('span[data-minutes]');
const secsRef = document.querySelector('span[data-seconds]');

startBtn.disabled = true;

function onDateTimePickerChange(selectedDates) {
  if (selectedDates[0] < new Date()) {
    iziToast.error({
      title: 'Error',
      message: 'Please choose a date in the future',
      position: 'topRight',
    });
    startBtn.disabled = true;
    return;
  }

  startBtn.disabled = false;

  userSelectedDate = selectedDates[0];
}

startBtn.addEventListener('click', () => {
  startBtn.disabled = true;
  startTimer();
});

function startTimer() {
  const targetDate = userSelectedDate.getTime();

  const timerId = setInterval(() => {
    const currentDate = Date.now();
    const time = targetDate - currentDate;

    if (time <= 0) {
      clearInterval(timerId);
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(time);

    daysRef.textContent = days.toString().padStart(2, '0');
    hoursRef.textContent = hours.toString().padStart(2, '0');
    minsRef.textContent = minutes.toString().padStart(2, '0');
    secsRef.textContent = seconds.toString().padStart(2, '0');
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);

  const hours = Math.floor((ms % day) / hour);

  const minutes = Math.floor(((ms % day) % hour) / minute);

  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
