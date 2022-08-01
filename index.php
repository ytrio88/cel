<?php 
include_once("control.php");
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
    <script src="base.js"></script>
    <link rel="stylesheet" href="main.css">
</head>
<body onload="i()">
samsung/motorola/iphone/xiaomi/lg
//g42;1;160;73;8;0;3;3-100;3x2;0,3;1
//nome;marca;comprimento;largura;altura;pos-biometria;totalcamera;configcamera;disposicaocamera;nrobotaoesquerdo-nrobotaodireito;poscamerafrontal
    <form action="index.php" method="post" class="size2a ">
        <input type="text"name="1", id="1">
        <input type="submit" value="Add">
    </form>
    <div id="lista" class="lista"></div>
    <!-- <fieldset>
        <div class="size2a grid">
            <div>
                <div>Modelo:</div>
                <input name="1"type="text" id="1">
            </div>
            <div>
                <div>Marca:</div>
                <select name="2" id="2">
                    <option value="0">Samsung</option>
                    <option value="1">Motorola</option>
                    <option value="2">LG</option>
                    <option value="3">Xiaomi</option>
                    <option value="4">Iphone</option>
                </select>
            </div>
        </div>
        <div class="s2 grid">

            <fieldset class="s4 grid">
                <legend>Dimensão</legend>
                <div>
                    <div>Altura:</div>
                    <input name="3"type="text" id="3">
                </div>
                <div>
                    <div>Largura:</div>
                    <input name="4"type="text" id="4">
                </div>
                <div>
                    <div>Comprimento:</div>
                    <input name="5"type="text" id="5">
                </div>
                <div>
                    <div>Biometria:</div>
                    <select name="6" id="6">
                        <option value="0">Traseira</option>
                        <option value="1">Esquerda</option>
                        <option value="2">Diretia</option>
                        <option value="3">Frontal</option>
                    </select>
                </div>
            </fieldset>
            <fieldset class="s3 grid">
                <legend>Camera</legend>
                <div>
                    <div>Número:</div>
                    <input name="7"type="text" id="7">
                </div>
                <div>
                    <div>Disposição:</div>
                    <select name="8" id="8">
                        </select>
                    </div>
                    <div>
                        <div>Local:</div>
                        <select name="9" id="9">
                            <option value="0">Esquerda</option>
                            <option value="1">Meio</option>
                            <option value="2">Direito</option>
                        </select>
                    </div>
            </fieldset>
        </div>
    </fieldset> -->
</body>
</html>