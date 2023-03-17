function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
};

const refs = {
    startBtnEl: document.querySelector('button[data-start]'),
    stopBtnEl: document.querySelector('button[data-stop]'),
    body: document.querySelector('body'),
}


refs.startBtnEl.addEventListener('click', startFn);
refs.stopBtnEl.addEventListener('click', stopFn);

refs.stopBtnEl.disabled = true;
refs.startBtnEl.disabled = false;

    

function startFn() {
    refs.stopBtnEl.disabled = false;
    refs.startBtnEl.disabled = true;
    id = setInterval(() => {
        refs.body.style.backgroundColor = getRandomHexColor();
        const color = refs.body.style.backgroundColor;
    }, 1000);


};

function stopFn() {
    refs.stopBtnEl.disabled = true;
    refs.startBtnEl.disabled = false;
    clearTimeout(id);

};

