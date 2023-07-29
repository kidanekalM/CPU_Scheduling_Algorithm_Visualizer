
function drawBarChart(type) {
    let bar = document.getElementById(type+'firstBar')
    bar.style.animationName = "growUp"
    bar.style.height = algorithms['FCFS'][type]+"%"
    bar.firstElementChild.innerText = algorithms['FCFS'][type]
    
    bar = bar.nextElementSibling
    bar.style.animationName = "growUp"
    bar.style.height = algorithms['SJFNP'][type]+"%"
    bar.firstElementChild.innerText = algorithms['SJFNP'][type]


    bar = bar.nextElementSibling
    bar.style.animationName = "growUp"
    bar.style.height = algorithms['SJFP'][type]+"%"
    bar.firstElementChild.innerText = algorithms['SJFP'][type]


    bar = bar.nextElementSibling
    bar.style.animationName = "growUp"
    bar.style.height = algorithms['RR'][type]+"%"
    bar.firstElementChild.innerText = algorithms['RR'][type]


    bar = bar.nextElementSibling
    bar.style.animationName = "growUp"
    bar.style.height = algorithms['PNP'][type]+"%"
    bar.firstElementChild.innerText = algorithms['PNP'][type]


    bar = bar.nextElementSibling
    bar.style.animationName = "growUp"
    bar.style.height = algorithms['PP'][type]+"%"
    bar.firstElementChild.innerText = algorithms['PP'][type]

    
}