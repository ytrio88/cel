<?php 
include_once("controllers/control.php");
if (isset($_POST["id"]))
    (new con())->tirar($_POST);
else
    if (sizeof($_POST) != 0)
        (new con())->colocar($_POST);
echo "<script>let lista = '" . (new con())->loadAll() . "'</script>"
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="./views/js/base.js"></script>
    <link rel="stylesheet" href="./views/css/main.css">
</head>
<body onload="i()">
index 1 = samsung/motorola/iphone/xiaomi/lg
//g42;1;160;73;8;0;3;3-100;3x2;0,3;1
//nome;marca;comprimento;largura;altura;pos-biometria;totalcamera;configcamera;disposicaocamera;nrobotaoesquerdo-nrobotaodireito;poscamerafrontal
    <form action="index.php" method="post" class="size2a " name="form">
        <input type="text"name="1", id="1">
        <button type="button" onclick='s()'>Add</button>
    </form>
    <div id="lista" class="lista"></div>
</body>
</html>