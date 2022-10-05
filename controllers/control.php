<?php
include_once("./models/geralDAO.php");
class con
{
    public function colocar($a)
    {
        if (strpos($a[1], ",") == false)
            $a[1] .= ",0,0,0";
        if ($this->checarExistente(explode(",", $a[1])[0]) != 0)
            return;
        $t = "";
        $a = explode(",", $a[1]);
        $t = "insert into cel values (" . getTotal("cel") . ",'$a[0]', $a[1],'','','','', $a[2], $a[3], 1)";
        echo $t;
        inserir($t);
    }
    public function tirar($a)
    {
        $t = "delete from cel where id='" . $a . "'";
        echo $t;
        inserir($t);
    }
    public function loadAll()
    {
        $q = "select id,nome,marca,totalcase,totalpel from cel";
        
        $result = extrair($q);	
        // echo $query;
        $t = "";	
        while($row = $result->fetch_assoc())
        {
            if ($t != "") $t .= ",";
            $t .= "{";
            foreach (explode(",", "id,nome,marca,totalcase,totalpel") as $i)
                $t .= '"' . $i . '":"' . $row[$i] . '",';
            $t .= '"a":"a"';
            $t .= "}";
        }
        return "[$t]";
    }
    public function checarExistente($modelo)
    {
        $q = "select count(id) as total from cel where nome like '$modelo'";	
        // echo $query;
        $result = extrair($q);	
        while($row = $result->fetch_assoc())
            return  $row["total"];
    }
}

?>