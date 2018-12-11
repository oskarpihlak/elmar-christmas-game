const scriptURL = 'https://script.google.com/macros/s/AKfycbywQgZReY5g2N19B_BTeuWPDGFjHmWoXovyUvWNV4elXMotgFAS/exec';
let selectedModalTitle = '';
let modalOpen = false;

Number.prototype.pad = function (n) {
  return new Array(n).join('0').slice((n || 2) * -1) + this;
};

const giftData = [
  {
    title: 'Alkomeeter Alcoscan Secret',
    titleUrl: '//pood.alkomeeter.com/',
    subTitle: 'Turvalised sõidud tagab jõuluhinnaga Alcoscan Secret - vaata ruttu: alkomeeter.com',
    image: 'alko.jpg',
    textUnderImage: 'Rovico ettevõtted said alguse juba 1992.aastal.Tänaseks oleme kasvanud Eesti suurimaks alkomeetrite müüjaks ja hooldajaks ning ainsaks tootjaks. Iga 5.autojuht Eestis kasutab meie alkomeetrit, mis tõstab Eesti alkomeetri kasutuse populaarsuselt esikohale kogu maailmas.'
  },
  {
    title: 'Roosa Kvarts küünlaalus',
    titleUrl: '//retreat4relief.com/',
    subTitle: 'Roosa Kvarts on ülim armastusekristall, mis kannab endaga kaasas tundeid ja suhteid tervendavat väge. Kristallküünlaalus aitab perekonda ja koju tuua armastuseõnne. Väeese, mis aitab pereliikmetel omavahel hästi läbi saada ja parandada suhteid igal erineval tasandil.',
    image: 'kvarts.jpg',
    textUnderImage: 'LA TENE on selgeltnägija Tene Laulu kristallipood ja portaal, kus leiad väga palju põnevat ning müstilist. Naturaalsed poolvääriskivid, viirukid, küünlad ja eeterlikud õlid on parimaks alternatiivteraapiaks sinu kehale ja hingele.'
  },
  {
    title: '30€ Kaubamajaka kinkekaart',
    titleUrl: '//kaubamajakas.ee/',
    subTitle: 'Pärnu suurim ostukeskus Kaubamajakas on Pärnu lahe ääres asetsev kaubanduskeskus, kelle eesmärgiks on pakkuda lihtsat, kvaliteetset ja lõbusat poodlemiskogemust. \n' +
      'Kaubamajakas ostlemine on eelkõige mugav just seetõttu, et käeulatuses võib leida mitmeid erinevaid kaupu. Mitmed erinevad tehnikakauplused, raamatupoed, ilu- ja tervisekaubad, jalanõud ja kotid, rõivad, lastekaubad, ehted, kellad ja kingad. Ausalt öeldes on Kaubamajakal miskit kõigile!',
    image: 'kaubamajakas.jpg',
    textUnderImage: 'Kaubamajakasse on lihtne ligi pääseda. Kauplemispind asub esimesel korrusel ning on samal tasapinnal, mis parkla. Oled ostukäru, suure perekonna või on Sul hoopis liikumisraskused, siis meie juures ei pea tundma muret pikkade treppide või keerukate koridoride pärast.'
  },
  {
    title: '2 kasti Valge Klaar vahujooki',
    titleUrl: '//www.alecoq.ee/',
    subTitle: 'Valge Klaari vahujooki armastavad nii väikesed kui ka suured. Tuttava maitsega mullijook sisaldab 10% õunamahla ning teeb oma uues ja pidulikus kuues iga tähtpäeva meeldejäävaks ning magusaks.',
    image: 'valgeklaar.png',
    textUnderImage: 'A. Le Coq on Eesti vanim ja suurim joogitootja, kelle tootevalikust leiab 11 erinevat tootegruppi. Ettevõte seisab hea Eesti joogikultuuri säilimise ja arendamise eest, hoides au sees nii vanu joogitootmise traditsioone kui ka uuendades pidevalt oma tooteportfelli pakkumaks tarbijatele üha uusi ja tervislikke maitsekombinatsioone.'
  },
  {
    title: 'Korralik jõululaud Kartulisalvelt',
    titleUrl: '//kartulisalv.ee/',
    subTitle: 'Kartulisalv OÜ pakub kvaliteetset, kodumaist ning hoole ja armastusega kasvatatud talutoodangut Lõuna-Eesto põldudelt, juba alates aastast 2010.',
    image: 'kartulisadu.jpg',
    textUnderImage: 'Peamiselt tegeleme, meie koostööpartneri, Kartuliait OÜ toodangu edasimüügiga, aga lisaks näiteks mesi jõuab Teie lauale Tartumaalt Läänisetest - Soo talu mesitarudest ning küüslauk ja sibul tulevad otse meie enda Põlvamaa põldudelt.'
  },
];
const giftBoxes = giftData.map((data, index) => {
  return `
    <div id="box-${index}" class="christmas-gift" onclick="openModal(${index}, '${data.title}')">
      <img class="christmas-gift-element" src="img/${Math.floor(Math.random() * (5 - 1 + 1)) + 1}.png">
    </div>
    <div id="gift-${index}" class="elmar-christmas-form hidden">
    <img class="elmar-christmas-form-logo" src="img/elmar.png" alt="">
    <img class="elmar-christmas-form-exit" src="img/ristialus.png" alt="cross">
    <img class="elmar-christmas-form-exit-btn" src="img/x.png" alt="cross-btn" onclick="closeModal(${index})">
    <a class="elmar-christmas-form-title-link" target="_blank" href="${data.titleUrl}"><b class="elmar-christmas-form-title">${data.title}</b></a>
    <div class="elmar-christmas-form-title-subtext">${data.subTitle}</div>
    <div class="elmar-christmas-form-core-${index}">
      <div class="elmar-christmas-form-core-prize">
        <img class="elmar-christmas-form-core-img scale-down" src="img/gifts/${data.image}" alt="">
      </div>
      <form name="submit-to-google-sheet" id="gift-form-${index}" class="elmar-christmas-form-core-fields">
        <input id="personName" class="elmar-christmas-form-core-input" placeholder="Nimi" name="name">
        <input id="personEmail" class="elmar-christmas-form-core-input" placeholder="e-post" name="email">
        <div class="elmar-christmas-form-core-checkbox">
          <input id='validateAgreement-${index}' class="elmar-christmas-form-core-checkbox-confirm" type="checkbox" name="checkbox" id="checkbox_id">
          <label class="elmar-christmas-form-core-checkbox-text">Nõustun <span class="elmar-christmas-form-core-checkbox-label" onclick="openTermsAndConditions()">kampaania tingimustega</span></label>
        </div>
        <button type="submit" id="submit-form" class="elmar-christmas-form-submit">SAADA</button>
      </form>
    </div>
    <div class="elmar-christmas-form-text-under-image"><p>${data.textUnderImage}</p></div>
    <div class="elmar-christmas-form-footer-text">
      Kampaaniat korraldab AS Eesti Meedia, registreeritud asukoht Tallinn, Maakri 23a, registrikood 10184643, e-post reklaam@eestimeedia.ee, telefon +3726662350. <span class="terms-and-conditions-ref" onclick="openTermsAndConditions()">Kampaania reegleid näed siit</span>
    </div>
  </div>
`
});
document.querySelector('.christmas-gift-container').innerHTML = giftBoxes;

giftData.forEach((data, index)=>{
  const form = document.querySelector(`#gift-form-${index}`);

  form.addEventListener('submit', e => {
    e.preventDefault();
    const hasAgreedToTerms = document.querySelector('#validateAgreement-'+index).checked;
    if (hasAgreedToTerms) {
      let formData = new FormData(form);
      const moment = new Date;
      const time = `${moment.getDate() + 1}.${moment.getMonth()}.${moment.getFullYear()} ${moment.getHours()}:${moment.getMinutes().pad(2)}`;
      formData.append('timestamp', time);
      formData.append('prize', selectedModalTitle);
      fetch(scriptURL, {method: 'POST', body: formData})
        .then(() => {
          document.querySelector(`.elmar-christmas-form-core-${index}`).style.flexDirection = 'column';
          document.querySelector(`.elmar-christmas-form-core-${index}`).innerHTML = `
         <div class="data-sent-img">
            <img src="img/thumbs_up.png" alt="thumbs up"/>
        </div>
        <b class="elmar-christmas-form-sent-title">Sinu andmed on saadetud!</b>
        <p class="elmar-christmas-form-sent-subtext"></p>
      `;
        })
        .catch(() => {
        });
    } else {
      alert('Palun nõustuge kampaania tingimustega.');
    }
  });

});


function closeModal(boxId) {
  modalOpen = false;
  document.querySelector('.elmar-christmas-heading-subtitle').classList.remove('hidden');
  document.querySelector('.elmar-christmas-heading').classList.remove('hidden');
  document.querySelector(`#gift-${boxId}`).classList.add('hidden');
  document.querySelectorAll('.christmas-gift').forEach(element => element.classList.remove('hidden'))
}

function openModal(boxId, title) {
  if(!modalOpen) {
    selectedModalTitle = title;
    modalOpen = true;
    document.querySelector(`#box-${boxId}`).innerHTML += `<img class="christmas-gift-element-status-checked" src="img/green-check.png" alt="d">`;
    setTimeout(() => {
      document.querySelector('.elmar-christmas-heading-subtitle').classList.add('hidden');
      document.querySelector('.elmar-christmas-heading').classList.add('hidden');
      document.querySelector(`#gift-${boxId}`).classList.remove('hidden');
      document.querySelectorAll('.christmas-gift').forEach(element => element.classList.add('hidden'))
    }, 1500);
  }
}

function openTermsAndConditions() {
  document.querySelector(`.terms-and-conditions-container`).classList.remove('hidden');
}

function closeTermsAndConditions() {
  console.log('clse');
  document.querySelector(`.terms-and-conditions-container`).classList.add('hidden');
}
