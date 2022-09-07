const elementBebida = document.querySelector('.bebidasArea');

const bebidasURL = './js/json/bebidas.json';

const requestBebida = new XMLHttpRequest();

requestBebida.open('GET', bebidasURL);
requestBebida.responseType = 'json';
requestBebida.send();

requestBebida.onload = function() {
  var bebidas = requestBebida.response;
  listarBebidas(bebidas);
}

function cardBebidas(bebida){  
    var html = "<div class='card' id='"+bebida.tag+"' data-bs-toggle='tooltip' data-bs-placement='right' title='"+bebida.ingredientes+"'>";
    html +=         "<div class='content'>";
    html +=             "<div class='imgBx'>";
    html +=                 "<img src='"+bebida.foto+"'>";
    html +=             "</div>";
    html +=             "<div class='contentBx'>";
    html +=                 "<h3><span class='nome'>"+bebida.nome+"</span><br><span class='valor'>R$<span class='real'>"+bebida.valor+"</span></span></h3>"            
    html +=             "</div>";            
    html +=         "</div>";            
    html +=         "<div class='sci'>";            
    html +=             "<button class='btn addCarrinho' onclick='addCarrinho' id='liveToastBtn' value='"+bebida.tag+"'>Adicionar</button>";            
    html +=         "</div>";        
    html +=         "<div class='sci2'>";                   
    html +=             "<input type='number' class='form-control' id='qtd' min='0' placeholder='Quant.'>";                   
    html +=         "</div>";             
    html +=    "</div>";

    return html;
}

function listarBebidas(data){
    var cards = [];
    
    for(var i = 0 ; i < data.length ; i++) {
      cards[i] = cardBebidas(data[i]);
      elementBebida.innerHTML += cards[i];
    }
}
