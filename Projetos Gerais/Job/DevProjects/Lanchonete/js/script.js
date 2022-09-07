const header = document.querySelector("#header");
var altura = header.clientHeight;

const menuItems = document.querySelectorAll('.navegacao a');
const headerHeight = document.querySelector('#header').offsetHeight;

menuItems.forEach(item => {
    item.addEventListener('click', scrollToIdOnClick);
});

function scrollToIdOnClick(event){
    event.preventDefault();

    const element = event.target;
    const id = element.getAttribute('href');
    const to = document.querySelector(id).offsetTop;
    
    window.scroll({
        top: to - headerHeight,
        behavior: 'smooth',
    });
}

var pedido = 0;
var comanda = "";
var pedidos = new Map();

var valores = new Map();

var endereco = "";
var alteracoes = "Nenhuma";
var pagamento = "";
var entrega = "";
var taxa = 0;
var troco = 0;

var linkWhats =  "";

requestLayout.open('GET', layoutURL);
requestLayout.responseType = 'json';
requestLayout.send();

requestLayout.onload = function() {
  var layout = requestLayout.response;

  linkWhats = 'https://wa.me/'+layout.whatsapp;
}

function mensagemConfirma(){
	var toastLive = document.getElementById('liveToast');
    var toast = new bootstrap.Toast(toastLive);

    toast.show();
};

function mensagemApaga(){
	var toastLiveApaga = document.getElementById('apagaToast');
    var toastApaga = new bootstrap.Toast(toastLiveApaga);

    toastApaga.show();
};
//função responsável por atualizar o valor total no carrinho de compras
function total(nome, qtd, preco){
	pedido = 0;

	valor = qtd * preco;

	if (qtd != 0 || qtd != '') {
		valores.set(nome, valor);
	}

	if (qtd == 0 || qtd == '') {
		valores.delete(nome);
	}

	for (var [key, value] of valores) {
		pedido += value;
	}

	var valorTotal = document.getElementById('valorTotal');
	valorTotal.innerHTML = "R$"+pedido.toFixed(2);
}

function pedidoCli(nome, qtd, valor){	
	comanda = "";

	if (qtd != 0 || qtd != '') {
		pedidos.set(nome, qtd);
	}

	if (qtd == 0 || qtd == '') {
		pedidos.delete(nome);
	}
	
	total(nome, qtd, valor);

	for (var [key, value] of pedidos) {
		if(value > 0){
			comanda += value + " " + key + " -- ";
		}
	}

	var dados = document.getElementById('dados');
	dados.innerHTML = "Pedido: " + comanda + "<br>";
}

//Dinâmica do design do Cabeçalho
$('#menu').css('margin-top', altura);

$(".navCarrinho").click(function(){
	$("#header").removeClass("fixed-top");
	$('#menu').css('margin-top', 0);
});
$(".fechaModal").click(function(){
	$("#header").addClass("fixed-top");
	$('#menu').css('margin-top', altura);
});
$("#cancelar1").click(function(){
	$("#header").addClass("fixed-top");
	$('#menu').css('margin-top', altura);
});
$("#cancelar2").click(function(){
	$("#header").addClass("fixed-top");
	$('#menu').css('margin-top', altura);
});

$("#bebidas").click(function() {
	$("#collapseLanches img").removeClass("show");
	$("#collapseLanches").collapse("hide");
	
	$("#collapseBebidas img").css("opacity", 1);
	$("#collapseLanches img").css("opacity", 0);

	$("#bebidas").addClass("ativado");
	$("#lanches").removeClass("ativado");
});

$("#lanches").click(function() {
	$("#collapseBebidas").removeClass("show");
	$("#collapseBebidas").collapse("hide");
	
	$("#collapseBebidas img").css("opacity", 0);
	$("#collapseLanches img").css("opacity", 1);

	$("#lanches").addClass("ativado");
	$("#bebidas").removeClass("ativado");
});

// ------------------------- Adiciona ao Carrinho ------------------------- //
var carrinho = [];

$(".addCarrinho").click(function(){
	var cd = $(this).val();

	var tag = "#" + $(this).val();
	var nome = tag + " .nome";
	var valor = tag + " .valor";
	var qtd = tag + " #qtd";
	var preco = tag + " .real"
			
	var infoNome = $(nome).html();
	var infoValor = $(valor).html();
	var infoQtd = $(qtd).val();
	var infoPreco = $(preco).html();

	var tagTabela = cd + "Car";
	var tagTabela2 = "." + tagTabela;

	var item = carrinho.indexOf(cd);

	if (item === -1) {	
		if (infoQtd != 0 || infoQtd != '') {
			carrinho.push(cd);
			$("tbody").append('<tr class="'+tagTabela+'"> <td>'+infoNome+'</td> <td id="quant">'+infoQtd+'</td> <td>'+infoValor+'</td> </tr>');
			mensagemConfirma();
		}

	} else if (item > -1) {
		if (infoQtd == 0 || infoQtd == '') {
			$(tagTabela2).remove();
			carrinho[item] = "";
			mensagemApaga();
		}
		else{
			$(tagTabela2).html('<td>'+infoNome+'</td> <td id="quant">'+infoQtd+'</td> <td>'+infoValor+'</td>');
			mensagemConfirma();
		}
	}
	pedidoCli(infoNome, infoQtd, infoPreco);
});

// -------------------------------- Fim Carrinho -------------------------------- //

$("#radioCartao").click(function(){
	$(".troco").html("");
});
$("#radioDinheiro").click(function(){
	$(".troco").html('<input type="number" class="form-control hidden" id="troco" min="0" placeholder="Troco para...">');
});
$("#radioPix").click(function(){
	$(".troco").html("");
});

$("#enviaEndereco").click(function(){
	endereco = $("#endereco").val();  //coleta o endereço digitado pelo usuário
	alteracoes = $("#alteracoes").val(); //coleta o alterações digitadas pelo usuário
	if(alteracoes == ""){
		alteracoes = "Nenhuma";
	}

	if ($("#radioLocal").prop("checked")){
		entrega = "Balcão";
		taxa = 0;
	}
	else if ($("#radioEntrega").prop("checked")){
		entrega = "Entrega (R$ 3,00)";
		taxa = 3.00;
	}

	if($("#radioCartao").prop("checked")){
		pagamento = "Cartão"; //se forma de pagamento for cartão
	}
	else if($("#radioDinheiro").prop("checked")){
		troco = $("#troco").val();
		pagamento = "Dinheiro"; //se forma de pagamento for dinheiro
		if (troco == null || troco == 0) {
			alert("Informe o valor pago em dinheiro!");
		}
	}
	else if($("#radioPix").prop("checked")){
		pagamento = "Pix"; //se forma de pagamento for pix
	}

	$("#dados").append("Alterações: " + alteracoes + "<br>"); //envia alterações do pedido ao Modal
	$("#dados").append("Endereço: " + endereco + "<br>"); //envia o endereço ao Modal
	$("#dados").append("Pagamento: " + pagamento + "<br>"); //envia a forma de pagamento ao Modal
	$("#dados").append("Troco para: R$" + troco + "<br>"); //envia troco ao Modal
	$("#dados").append("Modo de entrega: " + entrega + "<br><br>"); //envia modo de entrega ao Modal

	$("#dados").append("Valor total: R$" + (pedido + taxa).toFixed(2)); //envia o valor total ao Modal
	
	if($("#radioEntrega").prop("checked") && endereco == ""){
		alert("Informe o endereço!");
	}
});

$("#enviar").click(function(){ //função para enviar o pedido e os dados via Whatsapp
	if (comanda != "") {
		if((entrega == "Entrega (R$ 3,00)" && endereco != "") || entrega == "Balcão"){
			mensagemTotal = " *VALOR TOTAL: R$" + (pedido + taxa).toFixed(2) + "*"; //adiciona valor total à variável do pedido

			if(pagamento == "Dinheiro"){
				if(troco != 0 && troco != null && troco != ""){
					var texto = "*Pedido:* " + comanda + " \n*Total:* " + mensagemTotal + " \n\n*Alterações:* " + alteracoes + " \n*Endereço:* " + endereco + " \n*Forma de Pagamento:* " + pagamento + " \n*Troco para:* R$"+ troco +" \n*Modo de entrega:* " + entrega;
					texto = window.encodeURIComponent(texto);

					var mensagem = linkWhats + "?text=" + texto;
					//mensagem que será enviada aos vendedores
					window.open(mensagem, "_blank"); //envia a mensagem
				}
				else{
					alert("Informe o valor pago em dinheiro!");
				}
			}
			else{
				var texto = "*Pedido:* " + comanda + " \n*Total:* " + mensagemTotal + " \n\n*Alterações:* " + alteracoes + " \n*Endereço:* " + endereco + " \n*Forma de Pagamento:* " + pagamento + " \n*Modo de entrega:* " + entrega;
				texto = window.encodeURIComponent(texto);

				var mensagem = linkWhats + "?text=" + texto;
				window.open(mensagem, "_blank");
			}
		}
		else{
			alert("Informe o endereço!");
		}
	}
	else{
		alert("Nenhum item no carrinho!");
	}
})

var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
});

var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
	return new bootstrap.Popover(popoverTriggerEl)
});
var popover = new bootstrap.Popover(document.querySelector('.popover-dismiss'), {
	trigger: 'focus'
});