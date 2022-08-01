function i()
{
    let t = ""
    let f1 = a => {
        console.log(a)
        a = parseInt(a)/25.4
        console.log(a)
        a = String(a)
        console.log(a)
        a = a.substring(0, a.indexOf(".")+3)
        console.log(a)
        return a
    }
    let l = troca(JSON.parse(lista))
    t = "<div class='linha th'><div>Modelo</div><div>Marca</div><div>Tamanho(mm)</div><div>Tamanho(pol)</div></div>"
    for (let i of l)
        t += "<div class='linha'><div>" + i.nome + "</div><div>" + "Samsung,Motorola,Iphone,Xiaomi,LG".split(",")[i.marca] + "</div><div>" + i.comprimento + "x" + i.largura + "x" + i.altura +"</div><div>" + f1(i.comprimento) + "x" + f1(i.largura) + "x" + f1(i.altura) +"</div></div>"
    document.getElementById("lista").innerHTML = t
}
function troca(l)
{
    let aux = null
    for (let i = 0; i < l.length - 1; i++)
        for (let j = i + 1; j < l.length; j++)
            if (l[i] > l[j])
            {
                aux = l[i]
                l[i] = l[j]
                l[j] = aux
            }
    return l
}