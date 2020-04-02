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

let deferredPrompt;
let btnAdd = document.getElementById('app_install');

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