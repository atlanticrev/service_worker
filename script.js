if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('serviceWorker.js')
        .then(reg => {
          console.log('Service worker has been registered', reg);
        }).catch(err => {
          console.log('Service worker registration failed', err);
        });
    });
}

const btnAdd = document.getElementById('gradient_button');
const audio = document.getElementById('audio');

let buttonState = false;
btnAdd.onclick = (e) => {
    buttonState = !buttonState;
    if (buttonState) {
        e.target.classList.add('animate');
        audio.play();
    } else {
        e.target.classList.remove('animate');
        audio.pause();
    }
};

let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    btnAdd.style.display = 'block';
});

btnAdd.addEventListener('click', (e) => {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
            console.log('user accepted prompt');
        } else {
            console.log('user deferred prompt');
        }
        deferredPrompt = null;
    });
});