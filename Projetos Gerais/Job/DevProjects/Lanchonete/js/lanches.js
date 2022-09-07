const elementLanche = document.querySelector('.lanchesArea');

const lanchesURL = './js/json/lanches.json';

const requestLanche = new XMLHttpRequest();

requestLanche.open('GET', lanchesURL);
requestLanche.responseType = 'json';
requestLanche.send();

requestLanche.onload = function() {
  var lanches = requestLanche.response;
  listarLanches(lanches);
}

function cardLanche(lanche){  
    var html = "<div class='card' id='"+lanche.tag+"' data-bs-toggle='tooltip' data-bs-placement='right' title='"+lanche.ingredientes+"'>";
    html +=         "<div class='content'>";
    html +=             "<div class='imgBx'>";
    html +=                 "<img src='"+lanche.foto+"'>";
    html +=             "</div>";
    html +=             "<div class='contentBx'>";
    html +=                 "<h3><span class='nome'>"+lanche.nome+"</span><br><span class='valor'>R$<span class='real'>"+lanche.valor+"</span></span></h3>"            
    html +=             "</div>";            
    html +=         "</div>";            
    html +=         "<div class='sci'>";            
    html +=             "<button class='btn addCarrinho' onclick='addCarrinho' id='liveToastBtn' value='"+lanche.tag+"'>Adicionar</button>";            
    html +=         "</div>";        
    html +=         "<div class='sci2'>";                   
    html +=             "<input type='number' class='form-control' id='qtd' min='0' placeholder='Quant.'>";                   
    html +=         "</div>";             
    html +=    "</div>";

    return html;
}

function listarLanches(data){
    const cards = [];
    
    for(var i = 0 ; i < data.length ; i++) {
      cards[i] = cardLanche(data[i]);
      elementLanche.innerHTML += cards[i];
    }
}
