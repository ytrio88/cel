function i()
{
    let t = ""
    let f1 = a => {
        a = parseInt(a)/25.4
        a = String(a)
        a = a.substring(0, a.indexOf(".")+3)
        return a
    }
    let a = 0
    let l = troca(JSON.parse(lista))
    t = "<div class='linha th'><div>Modelo</div><div>Marca</div><div>Peliculas(P,B,D)</div><div>Capinhas</div><div></div></div>"
    for (let i of l)
        t += "<div class='linha'><div>" + i.nome + "</div><div>" + "Samsung,Motorola,Iphone,Xiaomi,LG".split(",")[i.marca] + "</div><div>" + i.totalpel + "</div><div>" + i.totalcase + "</div><form id='f" + a + "' method='post' name='f" + a + "' class='gforms'><input type='hidden' name='id' value='" + i.id + "'><button type='button' onclick='fa(" + a++ + ")'>-</button></form></div>"
    document.getElementById("lista").innerHTML = t
}
function fa(a)
{
    document.getElementById("f" + a).submit()
}
function sub(e)
{
    console.log(e.target)
}
function fb(a)
{
    console.log(a.keyCode == 13)
        return
}
function s()
{
    console.log(document.activeElement)
    let v = document.getElementById("1").value
    // let b = a => {
    //     let c = ""
    //     if (a.length == 1)
    //         return a + ".0"
    //     let b = a.split("")
    //     for (let i = 0; i < b.length; i++) 
    //     {
    //         if (i == b.length - 1)
    //             c += "."
    //         c += b[i]
    //     }
    //     return c
    // }
    console.log(v.substring(v.indexOf(",")+1))
    for (let i of v.substring(v.indexOf(",")+1).split(","))
        if (isNaN(parseInt(i)))
            console.log(i)
    document.getElementById("1").value = v
    document.form.submit()
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