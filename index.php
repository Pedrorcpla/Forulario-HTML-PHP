<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>Comunicação com PHP</title>
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6" crossorigin="anonymous">
</head>
<style type="text/css">
	.inicio{
		text-align: center;
		animation: inicio 1.3s ease;
	}
	@keyframes inicio{
		0%{
			opacity: 0;
		}
		100%{
			opacity: 1;
		}
	} 
	.topo{
		margin: 3%;
		animation: inicio 1.3s ease;
	}
	p{
		font-size: 20px;
		padding-left: 5%;
	}
	.dados{
		float: right;
		margin-top: -25%;
		margin-right: 8%;
	}
	.inserir{
		margin-left: 5%;
	}
</style>
<body class="bg-light">
	<div class="row text-white" style="background: #40FF00;">
		<div class="col-6 offset-3">
			<h1 class="inicio topo">Comunicação entre HTML e PHP</h1>
		</div>
	</div>
	<div class="col-10 offset-1 bg-white rounded-bottom">
	<form>
		<br>
		<h4 class="titulos inicio">Coleta de Dados:</h4>
		<br>
		<div class="col-5 inserir">
			<p>Informe seu:</p>
			<ul>
				<li>Nome: <input type="text" name="nome" class="form-control"></li>
				<li>E-mail: <input type="email" name="email" class="form-control"></li>
				<li>Nascimento: <input type="date" name="data" class="form-control"></li>
			</ul>
			<center><input type="submit" class="btn col-5 text-white inicio" style="background: #40FF00;"></center>
		</div>
		<div class="col-5 dados border-start">
			<p>Seus dados:</p>
			<?php 
				$nome = $_GET['nome'];
				$email = $_GET['email'];
				$nasc = $_GET['data'];

				echo "<ul>
						<li>Nome: <input type='text' class='form-control' value='$nome' readonly></li>
						<li>E-mail: <input type='email' class='form-control' value='$email' readonly></li>
						<li>Nascimento: <input type='date' class='form-control' value='$nasc' readonly></li>
					  </ul>"
			?>
		</div>
		<br>
	</form>
	</div>
</body>
</html>