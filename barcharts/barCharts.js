
function drawBarChart(type) {
    let bar = document.getElementById(type+'firstBar')
    bar.style.animationName = "growUp"
    bar.style.height = algorithms['FCFS'][type]+"vh"
    algorithms['FCFS'][type] === undefined ? bar.style.display = "none":bar.style.display = "grid";
    bar.firstElementChild.innerText = algorithms['FCFS'][type]
    
    bar = bar.nextElementSibling
    bar.style.animationName = "growUp"
    bar.style.height = algorithms['SJFNP'][type]+"vh"
    algorithms['SJFNP'][type] === undefined ? bar.style.display = "none":bar.style.display = "grid";
    bar.firstElementChild.innerText = algorithms['SJFNP'][type]


    bar = bar.nextElementSibling
    bar.style.animationName = "growUp"
    bar.style.height = algorithms['SJFP'][type]+"vh"
    algorithms['SJFP'][type] === undefined ? bar.style.display = "none":bar.style.display = "grid";
    bar.firstElementChild.innerText = algorithms['SJFP'][type]


    bar = bar.nextElementSibling
    bar.style.animationName = "growUp"
    bar.style.height = algorithms['RR'][type]+"vh"
    algorithms['RR'][type] === undefined ? bar.style.display = "none":bar.style.display = "grid";
    bar.firstElementChild.innerText = algorithms['RR'][type]


    bar = bar.nextElementSibling
    bar.style.animationName = "growUp"
    bar.style.height = algorithms['PNP'][type]+"vh"
    algorithms['PNP'][type] === undefined ? bar.style.display = "none":bar.style.display = "grid";
    bar.firstElementChild.innerText = algorithms['PNP'][type]


    bar = bar.nextElementSibling
    bar.style.animationName = "growUp"
    bar.style.height = algorithms['PP'][type]+"vh"
    algorithms['PP'][type] === undefined ? bar.style.display = "none":bar.style.display = "grid";
    bar.firstElementChild.innerText = algorithms['PP'][type]

    
}