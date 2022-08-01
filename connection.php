<?php
	function conexao()
	{
		$connect = new mysqli("localhost", "root", "", "cel");
		$connect->query("SET NAMES 'UTF8'");
		if ($connect->connect_error)
			echo "problema";
		return $connect;
	}
?>