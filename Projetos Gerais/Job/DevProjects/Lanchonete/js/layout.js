const layoutURL = './js/json/layout.json';

const requestLayout = new XMLHttpRequest();

requestLayout.open('GET', layoutURL);
requestLayout.responseType = 'json';
requestLayout.send();

requestLayout.onload = function() {
  var layout = requestLayout.response;
  carregaLayout(layout);
}

function carregaLayout(data){
    document.documentElement.style.setProperty('--color1', data.background[0].color);
    document.documentElement.style.setProperty('--color2', data.background[1].color);
    document.documentElement.style.setProperty('--color3', data.background[2].color);

    document.documentElement.style.setProperty('--fontColor', data.fontColor);

    const elementLogo = document.querySelector('.logo img');
    elementLogo.setAttribute('src', data.logo);

    const elementLogoRodape = document.querySelector('.logoRodape img');
    elementLogoRodape.setAttribute('src', data.logo);

    const dadoWhats = document.querySelector('.dadoWhats');
    dadoWhats.setAttribute('href', 'https://wa.me/'+data.whatsapp);
    dadoWhats.innerHTML += data.whatsappClean;

    const dadoInsta = document.querySelector('.dadoInsta');
    dadoInsta.setAttribute('href', 'https://www.instagram.com/'+data.instagram);
    dadoInsta.innerHTML += data.instagramClean;

    const dadoMaps = document.querySelector('.dadoMaps');
    dadoMaps.setAttribute('href', data.local);
    dadoMaps.innerHTML += data.localClean;
}