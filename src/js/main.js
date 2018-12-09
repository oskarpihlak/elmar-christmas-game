const scriptURL = 'https://script.google.com/macros/s/AKfycbywQgZReY5g2N19B_BTeuWPDGFjHmWoXovyUvWNV4elXMotgFAS/exec';
const boxesCount = 7;
const winningBox = Math.floor(Math.random() * (boxesCount + 1));
let selectedBoxes = [];
let boxes = '';

Number.prototype.pad = function (n) {
  return new Array(n).join('0').slice((n || 2) * -1) + this;
};


const form = document.forms['submit-to-google-sheet'];
form.addEventListener('submit', e => {
  e.preventDefault();
  const hasAgreedToTerms = document.querySelector('#validateAgreement').checked;
  if (hasAgreedToTerms) {
    let formData = new FormData(form);
    const moment = new Date;
    const time = `${moment.getDate() + 1}.${moment.getMonth()}.${moment.getFullYear()} ${moment.getHours()}:${moment.getMinutes().pad(2)}`;
    formData.append('timestamp', time);
    formData.append('winning_box', winningBox.toString());
    fetch(scriptURL, {method: 'POST', body: formData})
      .then(response => {
        document.querySelector(`.elmar-christmas-form-core`).style.flexDirection = 'column';
        document.querySelector(`.elmar-christmas-form-core`).innerHTML = `
         <div>
            <img src="img/thumbs_up.png"/>
        </div>
        <b class="elmar-christmas-form-sent-title">Sinu andmed on saadetud!</b>
        <p class="elmar-christmas-form-sent-subtext">Now that we know who you are, I know who I am. I'm not a mistake! It all makes sense!</p>
      `;
      })
      .catch(error => console.error('Error!', error.message));
  } else {
    alert('Palun nõustuge kampaania tingimustega.');
    return false;
  }
});


function closeModal() {
  document.querySelector('.elmar-christmas-form').classList.add('hidden');
  document.querySelector('.elmar-christmas-heading').classList.remove('hidden');
  document.querySelector('.christmas-gift-container').classList.remove('hidden');
  document.querySelector('.elmar-christmas-heading-subtitle').classList.remove('hidden');
}

function evaluateBox(boxId) {
  console.log('triggered' + boxId);
  if (boxId === winningBox) {
    document.querySelector(`#box-${boxId}`).innerHTML += `<img class="christmas-gift-element-status-checked" src="img/green-check.png" alt="d">`;
    setTimeout(() => {
      document.querySelector('.elmar-christmas-heading-subtitle').classList.add('hidden');
      document.querySelector('.elmar-christmas-heading').classList.add('hidden');
      document.querySelector('.elmar-christmas-form').classList.remove('hidden');
      document.querySelector('.christmas-gift-container').classList.add('hidden');
    }, 1500);
  } else {
    if (!selectedBoxes.includes(boxId)) {
      selectedBoxes.push(boxId);
      document.querySelector(`#box-${boxId}`).innerHTML += `<img class="christmas-gift-element-status-crossed" src="img/red_x.png" alt="d">`;
    }
  }
}

for (let i = 0; i < boxesCount; i++) {
  boxes += `
      <div id="box-${i}" class="christmas-gift" onclick="evaluateBox(${i})">
        <img class="christmas-gift-element" src="img/${Math.floor(Math.random() * (5 - 1 + 1)) + 1}.png">
      </div>`;
}
document.querySelector('.christmas-gift-container').innerHTML = boxes;
