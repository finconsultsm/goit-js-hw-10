import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', formHandler);

function formHandler(evt) {
  evt.preventDefault();
  const formData = new FormData(form);
  const delay = Number(formData.get('delay'));
  const state = formData.get('state');

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(`✅ Fulfilled promise in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise in ${delay}ms`);
      }
    }, delay);
  });

  promise
    .then(message => createToast(message, 'success'))
    .catch(message => createToast(message, 'error'))
    .finally(() => {
      form.reset(); 
    });
}

function createToast(message, type) {
  iziToast[type]({
    message: message,
    position: 'topRight',
    icon: '',
    timeout: 2000,
  });
}
