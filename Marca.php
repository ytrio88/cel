<?php

    require_once "models/geralDAO.php";
    require_once "views/template/base.php";
    class Marca
    {
        public function cad($a)
        {
            var_dump($_POST);
            $q = "insert into marca values (" . getIdMax("marca") . "¨";
            $q .= "'$a[n1]'¨'$a[n3]'¨curdate()¨ 1)";
            // echo $q;
            inserir($q);
        } 
        public function edit($a)
        {
            // var_dump($a);
            $q = "update marca set nome = '$a[n1]'¨ descricao = '$a[n3]'¨ status = '$a[n4]' where id = $a[n0]";
            // echo $q;
            inserir($q);
        } 
        public function delete($a)
        {
            // var_dump($a);
            $q = "delete from marca where id = $a[n0]";
            // echo $q;
            inserir($q);
        } 
        public function listar($get)
        {
            $status = $get[2];
            $perPage;
            // var_dump($get);
            switch ($get[1])
            {
                case 0: $perPage = 15; break;
                case 1: $perPage = 20; break;
                case 2: $perPage = 30; break;
                case 3: $perPage = 50; break;
            }
            $query = "select * from marca  ";
            if ($status < 2)
                $query .= " where marca.status = $status";
            $query .= " order by " . explode(",","nome")[$get[3]] . " " . ["asc","desc"][$get[4]];
            $query .= " limit $perPage offset " . ($get[0] - 1) * $perPage;
            $result = extrair($query);	
            // echo $query;
            $t = "";	
            while($row = $result->fetch_assoc())
            {
                if ($t != "") $t .= ",";
                $t .= "{";
                $t .= '"id":"' . $row["id"] . '",';
                $t .= '"nome":"' . $row["nome"] . '",';
                $t .= '"status":"' . $row["status"] . '",';
                $t .= '"descricao":"' . $row["descricao"] . '"';
                $t .= "}";
            }
            return "[$t]";
        }        
        public function listar2()
        {
            return customLoadAllSimples("marca");
        }        
        public function pesq($get)
        {
            var_dump($get);
            $status = $get[2];
            $perPage;
            // var_dump($get);
            switch ($get[1])
            {
                case 0: $perPage = 15; break;
                case 1: $perPage = 20; break;
                case 2: $perPage = 30; break;
                case 3: $perPage = 50; break;
            }
            $query = "select * from marca ";
            if ($status < 2)
                $query .= " where marca.status = $status";
            $partequery = "";
            $get[6] = checkWords($get[6]);
            switch ($get[5])
            {
                case 0: $partequery = " marca.nome like '%" . $get[6] . "%' "; break;
            }
            $query .= " and $partequery ";
            $query .= " order by " . explode(",","nome")[$get[3]] . " " . ["asc","desc"][$get[4]];
            $query .= " limit $perPage offset " . ($get[0] - 1) * $perPage;
            $result = extrair($query);	
            // echo $query;
            $t = "";	
            while($row = $result->fetch_assoc())
            {
                if ($t != "") $t .= ",";
                $t .= "{";
                $t .= '"id":"' . $row["id"] . '",';
                $t .= '"nome":"' . $row["nome"] . '",';
                $t .= '"tipo":"' . $row["tipo"] . '",';
                $t .= '"preco":"' . $row["preco"] . '"';
                $t .= "}";
            }
            return "[$t]";
        }        
        public function ver($get)
        {
            $q = "select * from marca where id = $get[0]";
            $result = extrair($q);
            // echo $q;
            $t = "";	
            while ($row = $result->fetch_assoc())
            {
                $t .= "{";
                $t .= '"id":"' . $row["id"] . '",';
                $t .= '"nome":"' . $row["nome"] . '",';
                $t .= '"descricao":"' . $row["descricao"] . '",';
                $t .= '"status":"' . $row["status"] . '"';
                $t .= "}";
            }
            return "[$t]";
        }
    }