let lastmenuopen = 0,oaogofoaj = -1,get2 = null
function decode2(s)
{
    return decodeURIComponent(atob(s)).replaceAll('\"', "'")
}
function lpad(num)
{
    num = parseInt(num)
    return (num < 10) ? "0" + String(num) : num
}
function gerarPdfListar(title, th, fields, widths)
{
    th = th.split(",")
    let d = new Date()
    d = d.getDate() + " de " + getMesNome(parseInt(d.getMonth())) + " de " + d.getFullYear()

    let array = []
    let aux1 = []
    for (let i of th)
        aux1.push({style: ["th"], text: i})
    array.push(aux1)

    for (let i of listadados)
    {
        aux1 = []
        for (let j of fields)
            if (typeof j == "string")
                aux1.push(i[j])
            else
            {
                if (j.tipo == 0)
                    aux1.push(i[j.nome] ? j.info[0] : j.info[1])
                if (j.tipo == 1)
                    aux1.push("R$ " + i[j.nome].replace(".",","))
            }
        array.push(aux1)
    }

    let estilos = {
        th: {
            alignment: 'center',
            color: "white",
            fillColor: "#4e73df",
            fontSize: 12
        },
        header: {
            bold: true,
            fontSize: 18,
            alignment: "center",
            margin: [0, 10, 0, 5]
        },
        header2: {
            bold: true,
            fontSize: 13,
            alignment: "center",
            margin: [0, 3, 0, 3]
        }
    }
    tabela = {
        table:
        {
            widths: widths,
            body: array
        }
    }
    montarPdf([], tabela, estilos)
}
function lerGetParaPdf(get)
{
    let subf1 = (a,b) => {
        let c = []
        for (let i of b)
            c.push(i.text)
        return c[a].toLowerCase()
    }
    let subf2 = a => ((a == 2) ? "de todos os resultados" : ("resultados " + (a == 0 ? "desativos" : "ativos")))
    let subf3 = a => a == 0 ? "crescente" : "decrescente"
    let subf4 = (a,b) => "ordernado por " + subf1(a, document.getElementById("order").options) + " de forma " + subf3(b)
    let subf5 = () => (get2 == null) ? subf4(get[3], get[4]) : subf4(get2[1], get2[0])
    let a  = []
    if (get[6] != "")
        a.push({text: "Resultados obtidos por pesquisar " + subf1(get[5], document.getElementById("tipo").options) + "s com "+ get[6], style: "header2"})
    else
        a.push({text: "Resultados obtidos sem nenhum critério", style: "header2"})
    a.push({text: "monstrando " + subf1(get[1], document.getElementById("mostragem").options) + " " + subf2(get[2]) + " da " + get[0] + "ª página, ", style: "header2"})
    a.push({text: subf4(get[3], get[4]), style: "header2"})
    a.push({text: "Resultados sub-" + subf5(), style: "header2"})
    return a
}
function ordenarTabelaDados(a, b)
{
    get2 = [a,b]
    const c = compdados[3]
    let d = (a,b,c) => (a == 0 ? "a" : "b") + "['" + c + "'].localeCompare(" + (a == 1 ? "a" : "b") +"['" +  c + "'])"
    let e = (a,b,c) => (a == 0 ? "a" : "b") + "['" + c + "'] - " + (a == 1 ? "a" : "b") +"['" +  c + "']"
    if (c[0] != compdados[4][b])
        c.unshift(c.splice(b,1)[0])
    let t = ""
    for (let i = 0; i < c.length - 1; i++) 
    {
        if (t != "")
            t += " || "
        t += isNaN(listadados[0][c[i]]) ? d(a,b,c[i]) : e(a,b,c[i])
    }
    t = "listadados.sort((a,b) => " + t + ")"
    eval(t)
    ddb(b)
    compdados[2] = [b,a]
    // console.log(listadados)
    montarTabelaDados()
}
function montarTabelaDados()
{    
    // console.log(maininfo)
    let css = compdados[0]
    let nomes = compdados[1]
    let get = compdados[2]
    let interesse = compdados[4]
    let t = '', c = 0, d = get, e = "up2,down2,barra2".split(",")

    let g = (a, b) => "<img src='../icons/" + e[a].substring(0, e[a].length-1) + ".PNG' alt='' onclick='ordenarTabelaDados("+ a + "," + b + ")'>"

    let f = (a,b) => (a == 2) ? g(0,b) + g(1,b) : (a == 0) ? g(1,b) : g(0,b)

    for (let i = 0; i < interesse.length -1; i++) 
        t += "<div class='" + css[i] + "'><div class='menudotable'><div>" + nomes[i] + "</div><div><img src='../icons/" + e[d[0] == i ? d[1] : 2] + ".PNG' onclick='dda(" + i +")'><div class='dropdownmenu hidden' id='dropdownmenu" + i + "'>" + f(d[0] == i ? d[1] : 2, i)  + "</div></div></div></div>"
    t += "<div class='" + css[css.length-1] + "'><div>" + nomes[nomes.length-1] + "</div></div>"
    t += "<div class='t99'></div>"
    document.getElementById("thtable").innerHTML = t
    t = ""
    for (let i of listadados)
    {
        t += "<div class='linha'>"
        for (let j = 0; j < interesse.length - 1; j++) 
            t += "<label class='" + css[j] + "'>" + (isNaN(i[interesse[j]]) ? i[interesse[j]] : i[interesse[j]].replace(".", ",")) + "</label>"

        t += "<div class='direita last flex flex-row " + css[css.length-1] + "'>"
        t += "<a href='/pousada/" + maininfo + "/consultar/" + i[interesse[interesse.length-1]] + "'><img src='../icons/ver.png' alt='ver'></a>"
        t += "<a href='/pousada/" + maininfo + "/editar/" +i[interesse[interesse.length-1]] + "'><img src='../icons/pencil.png' alt='edit'></a>"
        t += "</div></div>"
    }
    document.getElementById("lista").innerHTML = t
}
function redirecionador(opcao)
{
    if (opcao == 1)
        history.back()
    if (opcao == 2)
        history.go(-2)
}
function key2array(a,b)
{
    let c = []
    for (let i of a)
        c.push(i[b])
    return c
}
function ddnavbtn(a)
{
    dda("nav" + a)
    if (document.getElementById("icon" + a).src.indexOf("right") != -1)
        document.getElementById("icon" + a).src = document.getElementById("icon" + a).src.replace("right","down")
    else
        document.getElementById("icon" + a).src = document.getElementById("icon" + a).src.replace("down","right")
}
function v(a)
{
    if (typeof a == "string")
        a = a.split(",")
	for (let i of a)
	{
		if (document.getElementById(i).value == "")
		{
			alert("Campo obrigatório em branco.\ncampo de " + document.getElementById(i).previousElementSibling.innerHTML.substring(0,document.getElementById(i).previousElementSibling.innerHTML.length - 1).toLowerCase() + " vazio.")
			return false
		}
	}
	return true
}
function checarVazio(a)
{
    return v(a)
}
function showmenu(id)
{
	
	if (lastmenuopen == 0)
	{
		document.getElementById(id).style.setProperty("display", "block", "important")
		lastmenuopen = id
		return
	}
	if (lastmenuopen != id)
	{
		document.getElementById(lastmenuopen).style.setProperty("display", "none", "important")
		document.getElementById(id).style.setProperty("display", "block", "important")
		lastmenuopen = id
	}
	else
	{
		document.getElementById(id).style.setProperty("display", "none", "important")
		lastmenuopen = 0
	}
	
}
function getEstadoByNum(num)
{
	return ",AC,AL,AP,AM,BA,CE,DF,ES,GO,MA,MT,MS,MG,PA,PB,PR,PE,PI,RJ,RN,RS,RO,RR,SC,SP,SE,TO".split(",")[num]
}
function getEstadoByName(estado)
{
	let nomes = ",AC,AL,AP,AM,BA,CE,DF,ES,GO,MA,MT,MS,MG,PA,PB,PR,PE,PI,RJ,RN,RS,RO,RR,SC,SP,SE,TO".split(",")
	for (let i = 0; i < nomes.length; i++) 
		if (nomes[i] == estado)
			return i
}
function decode(s)
{
    return JSON.parse(decodeURIComponent(atob(s)).replaceAll("+"," "))
}
function montarEstados()
{
    let estados = "Estados,AC,AL,AP,AM,BA,CE,DF,ES,GO,MA,MT,MS,MG,PA,PB,PR,PE,PI,RJ,RN,RS,RO,RR,SC,SP,SE,TO".split(",")
	let t = ""
	let c = 0
    for (let i of estados)
        t += "<option value='" + c++  + "'>" + i + "</option>"
    document.getElementById("estado").innerHTML = t
}
function getMesNome(i)
{
    console.log(i)
	return "Janeiro,Fevereiro,Março,Abril,Maio,Junho,Julho,Agosto,Setembro,Outubro,Novembro,Dezembro".split(",")[i]
}
function getMesNumByNome(nome)
{
    let meses = "Janeiro,Fevereiro,Março,Abril,Maio,Junho,Julho,Agosto,Setembro,Outubro,Novembro,Dezembro".split(",")
    for (let i = 0; i < meses.length; i++)
        if (meses[i].toUpperCase().substring(0,3) == nome.toUpperCase())
            return parseInt(i)
}
function validarDiaStatus(a)
{
    if (a.i == 2)
        if (a.f <= a.i || a.f == 3)
            return 2
    if (a.i == 3 || a.i == 4)
        if (a.f <= a.i)
            return a.i
    return a.f
}
function checarHidden(a)
{
    let b = a.split(";")[0].split(",")
    let c = a.split(";")[1].split(",")
    for (let i of b)
        enableHidden(i, true)    
    for (let i of c)
        enableHidden(i, false)    
}
function enableHidden(i, h)
{
    let id = document.getElementById(i).classList
    if (h)
    {
        id.add("hidden")
        id.remove("block")
    }
    else
    {
        id.add("block")
        id.remove("hidden")
    }
}
function montarMeses()
{
	let nomes = "Janeiro,Fevereiro,Março,Abril,Maio,Junho,Julho,Agosto,Setembro,Outubro,Novembro,Dezembro".split(",")
	let c = 0, t = ""
    for (let i of nomes)
		t += "<option value='" + c++  + "'>" + i + "</option>"
	return t
}
function formatarData(data)
{
	let d = data.split('-')
	return d[2] + "/" + d[1] + "/" + d[0]
}
function converterData(data)
{
    return data.getFullYear() + "-" + lpad(data.getMonth()+1) + "-" + lpad(data.getDate()) 
}
function pesquisar()
{
    let p = aojfoakf.split(",")[location.href.split("/")[5].split("&")[5]] == 0 ? document.getElementById("pesq").value : (document.getElementById("pesqparte1").value + "~" + document.getElementById("pesqparte2").value)
    if (aojfoakf.split(",")[oaogofoaj])
        p = ""
    let tipo = document.getElementById("tipo").selectedIndex
    let mostragem = document.getElementById("mostragem").selectedIndex
    let status = document.getElementById("status").selectedIndex
    let order = document.getElementById("order").selectedIndex
    let ordem = (document.getElementById("rb0").checked == true) ? 0 : 1
    location.href = "/pousada/" + maininfo +"/" + concatLink([get[0], mostragem, status, order, ordem, tipo, p], "&", 7)
}
function mudarPesqPlaceholder(e)
{
    document.getElementById("pesq").placeholder = "Pesquisar por " + e.target[e.target.selectedIndex].innerText
    pesquisar()
}
function configPesqBar()
{
    document.getElementById("tipo").addEventListener("focus", event => oaogofoaj = event.target.value)
    let get = location.href.split("/")[5].split("&")
            document.getElementById("status").selectedIndex = get[2]
            document.getElementById("mostragem").selectedIndex = get[1]
            document.getElementById("order").selectedIndex = get[3]
            document.getElementById("rb0").checked = (get[4] == 0) ? true : false
            document.getElementById("rb1").checked = (get[4] == 1) ? true : false
            document.getElementById("tipo").selectedIndex = get[5]
            if (aojfoakf.split(",")[get[5]] != 0)
            {
                document.getElementById("pesqparte1").value = (decodeURI(get[6]).indexOf("~") == -1) ? "" : decodeURI(get[6]).split("~")[0]
                document.getElementById("pesqparte2").value = (decodeURI(get[6]).indexOf("~") == -1) ? "" : decodeURI(get[6]).split("~")[1]
            }
            else
                document.getElementById("pesq").value = ((decodeURI(get[6]).indexOf("~") != -1) ? "" : decodeURI(get[6]))

}
function mergeArrays(array1, array2)
{	
    const result_array = [];
    const arr = array1.concat(array2);
    let len = arr.length;
    const assoc = {};

    while(len--) {
        const item = arr[len];

        if(!assoc[item]) 
        { 
            result_array.unshift(item);
            assoc[item] = true;
        }
    }

    return result_array;
}
function ascchoose(a)
{
    
    document.getElementById("ordem").value = a
    pesquisar()
}
function montarPdf(comeco, tabela, estilos)
{
    comeco.push(tabela)
	let conteudo = [
        comeco
    ]
    var pdf1 = {
        content: conteudo,
        styles: estilos
    }
    let a = pdfMake.createPdf(pdf1)
    a.open()
    a.download('pdf')
}
function getJSON(url)
{
	let respost = $.ajax({
		type: "GET",
		url: url,
		async: false
    }).responseText
	  console.log(url)
    console.log(respost)
    // console.log(JSON.parse(respost))
	return JSON.parse(respost)
}
function lerDataAtual()
{
    let d = new Date()
    return d.getFullYear() + "-" + lpad(d.getMonth() + 1) + '-' + lpad(d.getDate())
}
function lerDataAtualForDateInput()
{
    let d = new Date()
    return d.getFullYear() + "-" + lpad(d.getMonth()) + '-' + lpad(d.getDate())
}
function formatarData2(d)
{
    return d.getFullYear() + "-" + lpad(d.getMonth() + 1) + '-' + lpad(d.getDate())
}
function getCep()
{
    let cep = document.getElementById("cep").value
    if (cep.length != 9)
        return
    cep = cep.split("-")[0] + cep.split("-")[1]
    // console.log(cep)
    $("#endereco").val("");
    $("#bairro").val("");
    $("#cidade").val("");
    $("#estado").val("");

    //Consulta o webservice viacep.com.br/
    $.getJSON("https://viacep.com.br/ws/"+ cep +"/json/?callback=?", function(dados) {
    // console.log(dados)
        if (!("erro" in dados)) {
            //Atualiza os campos com os valores da consulta.
            $("#endereco").val(dados.logradouro);
            $("#bairro").val(dados.bairro);
            $("#cidade").val(dados.localidade);
            document.getElementById("estado").selectedIndex = getEstadoByName(dados.uf)
        } //end if.
        else 
            alert("CEP não encontrado.");
    });
}
function concatGrupo(a)
{
    let t = ""
    for (let i of a)
    {
        if (t != "") t += "&"
        t += document.getElementById(i).value
    }
    return t
}
function paginacao(pgAtual, lastpage, pedaco, resto)
{
    let a = [1, pgAtual - 1, pgAtual - 2, pgAtual - 1, pgAtual, pgAtual + 1, pgAtual + 2, pgAtual + 1, lastpage]
    pgAtual = parseInt(pgAtual)
    for (let i = 0; i < a.length; i++) 
        a[i] += "&" + resto
    let t = ""
    t += "<img src='" + pedaco + "/icons/first.png' alt='first' onclick='redirector(`" + a[0] + "`)'>";           
    if ((pgAtual - 1) >= 1)
        t += "<img src='" + pedaco + "/icons/back.png' alt='first' onclick='redirector(`" + a[1] + "`)'>";
    if ((pgAtual - 2) > 0)
        t += "<button type='button' onclick='redirector(`" + a[2] + "`)'>" + (pgAtual - 2) + "</button>";
    if ((pgAtual - 1) > 0)
        t += "<button type='button' onclick='redirector(`" + a[3]  + "`)'>" + (pgAtual - 1) + "</button>";
    t += "<button type='button' onclick='redirector(`" + a[4] + "`)'>" + pgAtual  + "</button>";
    if ((pgAtual + 1) <= lastpage)
        t += "<button type='button' onclick='redirector(`" + a[5] + "`)'>" + (pgAtual + 1) + "</button>";
    if ((pgAtual + 2) <= lastpage)
        t += "<button type='button' onclick='redirector(`" + a[6] + "`)'>" + (pgAtual + 2) + "</button>";  
    if (pgAtual <= lastpage - 1)
        t += "<img src='" + pedaco + "/icons/next.png' alt='next' onclick='redirector(`" + a[7] + "`)'>";
    t += "<img src='" + pedaco + "/icons/last.png' alt='last' onclick='redirector(`" + a[8] + "`)'>";
    return t
}
function redirector(resto)
{
    location.href = location.href.substring(0, location.href.lastIndexOf("/")) + "/" + resto
}
function getLastPage(total)
{
    let a = parseInt(location.href.split("/")[5].split("&")[1])
    switch(a)
    {
        case 0: a = 15; break;
        case 1: a = 20; break;
        case 2: a = 30; break;
        case 3: a = 50; break;
    }
    return parseInt((total % a == 0) ? total/a : total/a + 1)
}
function concatLink(a, b, c)
{
    let d = ""
    for (let i = 0; i < c; i++)
    {
        if (d != "")
            d += b
        d += a[i]
    }
    return d
}
function getMonthDayLimit(a,b)
{
    if (a != 1)
        return "31,28,31,30,31,30,31,31,30,31,30,31".split(",")[a]
    else
        if (b % 400 == 0)
            return 29
        else
            return (b % 100 != 0 && b % 4 == 0) ? 29 : 28            
}
function getMonthNumByText(a)
{
    let contador = 0
    for (let i of "Janeiro,Fevereiro,Março,Abril,Maio,Junho,Julho,Agosto,Setembro,Outubro,Novembro,Dezembro".split(","))
    {
        if (new RegExp(a, "i").test(i))
            return contador
        else
            contador++
    }
}
function avancarMes(data, total)
{
    // data = new Date(data)
    let dia = data.getDate()
    let mes = data.getMonth()
    let ano = data.getFullYear()   
    data = new Date(ano, mes, dia)
    // console.log(data)
    let meses = [0,1,2,3,4,5,6,7,8,9,10,11] 
    if (mes + total > 12)
        ano += 1
    if (mes + total < 0)
        ano -= 1
    if (total < 0)
        mes = meses[meses.length + total]
    else
        mes = meses[total]
    mes++
        // console.log(mes)
        // console.log(ano)
        data = new Date(ano + "-" + mes + "-01")
        // console.log(data)
    return data
}
function gerarCalendario(a, b)
{
    a = a.split(",")
    // console.log(b)
    let d = b;
    let aux = d
    let w = new Date(aux.setDate(1)).getDay()
    let contador = 0
    let t = "<div id='calendarioNome'>" + "Janeiro,Fevereiro,Março,Abril,Maio,Junho,Julho,Agosto,Setembro,Outubro,Novembro,Dezembro".split(",")[d.getMonth() ].substring(0,3) + "/" +  d.getFullYear() +"</div>"
    t += "<div id='calendarioSingle'>"
    for (let i of "D,S,T,Q,Q,S,S".split(","))
        t += createDayBlock(i, "")
    if (w != 0)
        for (let i = 0; i < 7; i++)
            if (i >= w)
                t += createDayBlock((contador + 1), (a[contador++] == 0) ? "green" : "red")
            else
                t += createDayBlock("", "")
    
    for (let i = contador; i < getMonthDayLimit(parseInt(d.getMonth()), parseInt(d.getFullYear())); i++)
        t += createDayBlock((contador + 1), (a[contador++] == 0) ? "green" : "red")
    return t + "</div>"
}
function getLimitDay(a)
{
    return ("31," + ((a % 400 == 0 || a % 4 == 0 && a % 100 != 0) ? 29 : 28) + ",31,30,31,30,31,31,30,31,30,31").split(",")
}
function gerarCalendario2(a, b)
{
    a = a.split(",")
    // console.log(b)
    let d = b;
    let aux = d
    let w = new Date(aux.setDate(1)).getDay()
    let contador = 0
    let t = "<div id='calendarioNome'>" + "Janeiro,Fevereiro,Março,Abril,Maio,Junho,Julho,Agosto,Setembro,Outubro,Novembro,Dezembro".split(",")[d.getMonth() ].substring(0,3) + "/" +  d.getFullYear() +"</div>"
    t += "<div id='calendarioSingle'>"
    for (let i of "D,S,T,Q,Q,S,S".split(","))
        t += createDayBlock(i, "")
    if (w != 0)
        for (let i = 0; i < 7; i++)
            if (i >= w)
                t += createDayBlock((contador + 1), getColor(a[contador++]))
            else
                t += createDayBlock("", "")
    
    for (let i = contador; i < getMonthDayLimit(parseInt(d.getMonth()), parseInt(d.getFullYear())); i++)
        t += createDayBlock((contador + 1), getColor(a[contador++]))
    return t + "</div>"
}
function toMoney(a)
{
    // console.log(a)
    a = a.toString()
    // console.log()
    // console.log(a)
    if (a.indexOf(",") == -1 && a.indexOf(".") == -1)
        return a + ",00"
    if ((a.indexOf(".") != -1))
        a = a.replace(".", ",")
        // console.log(a)
    if (a.indexOf(",") != -1)
        a = a.split(",")
    if (a[1].length == 2)
        return a[0] + "," + a[1]
    if (a[1].length > 2)
        return a[0] + "," + a[1].substring(0,2)
    if (a[1].length == 1)
        return a[0] + "," + a[1] + "0"
    

}
function checarDinheiro(e, x)
{
    let a = e.target
    let c = a.value[a.value.length - 1]
    if (/^[0-9]$/.test(c) === false)
    {
        a.value = a.value.substring(0, a.value.length - 1)
        return
    }
    if (a.value.length == 1 && a.value != ",")
        a.value += ",00"
    else
        if (a.value.indexOf(","))
        {
            let d = a.value.split(",")
            if (a.value.length > 11)
            {
                d[1] = d[1].substring(0, 2)
                if (d[1] == "00")
                    d[1] = "0" + c
                else
                    d[1] = parseInt(d[1]) * 10 + c
                a.value = d.join(",")

            }
            else
            {
                d[0] += c
                d[1] = "00"
                a.value = d.join(",")

            }
        }
}
function getColor(i)
{
    switch (i)
    {
        case "0": return "gray"
        case "1": return "orange"
        case "2": return "red"
        case "3": return "blue"
        case "4": return "darkblue"
        case "5": return "black"
        case "6": return "green"
        default: return "gray"
    }
}
function createDayBlock(a,b)
{
    return "<div class='dias " + b + "'>" + (a) + "</div>"
}
function lpad(s,width,what)
{
    s = s.toString()
    if (s.length >= width)
        return s
    let t = ""
    for (let i = 0; i < width - s.length; i++)
        t += what

    return t + s

}