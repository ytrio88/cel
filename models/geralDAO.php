<?php
	include 'connection.php';
	date_default_timezone_set('America/Sao_Paulo');
	function getMesNome($i)
	{
		return explode(",", "Janeiro,Fevereiro,Março,Abril,Maio,Junho,Julho,Agosto,Setembro,Outubro,Novembro,Dezembro")[$i];
	}
	function getIdMax($tabela)
	{
		$query = "select max(id) as total from $tabela";
		// echo $query;
		$result = extrair($query);		
		while($row = $result->fetch_assoc())
			return intval($row["total"])+1;
	}
	function customLoadAllSimples($tabela)
	{
		$query = "select id, nome from $tabela  ";
			$query .= " where $tabela.status = 1";
		$result = extrair($query);	
		// echo $query;
		$t = "";	
		while($row = $result->fetch_assoc())
		{
			if ($t != "") $t .= ",";
			$t .= "{";
			$t .= '"id":"' . $row["id"] . '",';
			$t .= '"nome":"' . $row["nome"] . '"';
			$t .= "}";
		}
		return "[$t]";
	}        
	function cadHandler($s)
	{
		$a = explode("values (", $s)[1];
		$a = substr($a, 0, strlen($a)-1);
		foreach (explode(",", $a) as $i)
		{
			$c = $i;
			if ($i[0] == "'" && $i[strlen($i)-1] == "'" && strlen($i) > 2)
			{
				$c = substr($i, 1, strlen($i)-2);
				$c = "'" . str_replace(array('\\', "\0", "\n", "\r", "'", '"', "\x1a"), array('\\\\', '\\0', '\\n', '\\r', "\\'", '\\"', '\\Z'), $c) . "'";
			}
			$s = str_replace($i, $c, $s);
			$s = str_replace("¨", ", ", $s);
		}
		return $s;
	}
	function updateHandler($s)
	{
		// echo "<br>";
		$a = explode("set ", $s)[1];
		$a = explode(" where", $a)[0];
		// $a = substr($a, 0, strlen($a)-1);
		// echo $a;
		foreach (explode("¨", $a) as $i)
		{
			// echo $i . "<br>";
			$i = explode(" = ", $i)[1];
			// echo $i . "<br>";
			$c = $i;
			if ($i[0] == "'" && $i[strlen($i)-1] == "'" && strlen($i) > 2)
			{
				$c = substr($i, 1, strlen($i)-2);
				$c = "'" . str_replace(array('\\', "\0", "\n", "\r", "'", '"', "\x1a"), array('\\\\', '\\0', '\\n', '\\r', "\\'", '\\"', '\\Z'), $c) . "'";
			}
			$s = str_replace($i, $c, $s);
			$s = str_replace("¨", ", ", $s);
		}
		// echo $s;
		return $s;
	}
	function inserir($query)	
	{
		if (strpos($query, "insert into") !== false)
			$query = cadHandler($query);
		if (strpos($query, "update") !== false)
			$query = updateHandler($query);
		$connect = conexao();
		$result = $connect->query($query);
		// echo $query;
		if ($result === FALSE)
			echo "<br>" . $connect->error . "<br>";
		$connect->close();
	}
	function extrair($query)
	{		
		$connect = conexao();
		$result = $connect->query($query);
		if ($result === FALSE)
			echo "<br>" . $connect->error . "<br>";
		$connect->close();
		return $result;
	}
	function lerColunas($t)
	{
		$connect = conexao();
		$a = array();
		$sql = "SHOW COLUMNS FROM $t";
		$result = mysqli_query($connect,$sql);
		while($row = mysqli_fetch_array($result)){
			array_push($a, $row['Field']);
		}
		return $a;
	}
	function getTotal($tabela)
	{
		$query = "select max(id) as total from $tabela";
		$result = extrair($query);
		while ($row = $result->fetch_assoc())
			return intval($row["total"])+1;
	}
	function checkWords($s)
	{		
		return urldecode(str_replace("'", "", $s));
	}
?>