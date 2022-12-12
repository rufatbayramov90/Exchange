var BASE_KURS, SYMBOL_KURS;
let basebtns = document.querySelectorAll(".base");
const baseData = document.querySelector(".base.active");
const symbolData = document.querySelector(".symbol.active");

getData(baseData.innerText, symbolData);
basebtns.forEach(button =>{
    button.addEventListener("click", function(e){
        let violet = document.querySelector(".left .btns_1 .active")
        violet.classList.remove("active")
        e.target.classList.add("active")
        const baseCurr = e.target.innerText;
        const symbolCurr = document.querySelector(".symbol.active");

        fetch(`https://api.exchangerate.host/latest?base=${baseCurr}&symbols=${symbolCurr.innerText}`)
        .then(res => res.json())
        .then(res => {
            const kurs = res.rates[symbolCurr.innerText];
            BASE_KURS = kurs
            const inputBase = document.querySelector(".inpt_base");
            const inputSymbol = document.querySelector(".inpt_symbol");
            inputSymbol.value = (+inputBase.value * kurs).toFixed(3);
            let baseInfo = document.querySelector(".baseInfo")
            baseInfo.innerText = `1 ${baseCurr} = ${BASE_KURS.toFixed(3)} ${symbolCurr.innerText}`
            let symbolInfo = document.querySelector(".symbolInfo")
            let result = (1/BASE_KURS).toFixed(3)
            symbolInfo.innerText = `1 ${symbolCurr.innerText} = ${result} ${baseCurr}`
        })
    })
})
let symbolbtns = document.querySelectorAll(".symbol")
symbolbtns.forEach(button => {
    button.addEventListener("click", function (e) {
        let violetright = document.querySelector(".right .btns_2 .active")
        violetright.classList.remove("active")
        e.target.classList.add("active")

        const symbolCurr = e.target.innerText;
        const basCurr = document.querySelector(".base.active");

        fetch(`https://api.exchangerate.host/latest?base=${symbolCurr}&symbols=${baseCurr.innerText}`)
        .then(res  => res.json())
        .then(res => {
            const kurs = res.rates[baseCurr.innerText];
            SYMBOL_KURS = kurs;
            const inputBase = document.querySelector(".inpt_base");
            const inputSymbol = document.querySelector(".inpt_symbol");
            inputBase.value = (+inputSymbol.value * kurs).toFixed(3);
            let symbolInfo = document.querySelector(".symbolInfo")
            symbolInfo.innerText = `1 ${symbolCurr} = ${(SYMBOL_KURS).toFixed(3)} ${baseCurr.innerText}`
            let baseInfo = document.querySelector(".baseInfo")
            let sresult = (1/SYMBOL_KURS).toFixed(3) 
            baseInfo.innerText = `1 ${basCurr.innerText} = ${sresult} ${symbolCurr}`
        })
    })
})

let inptBase = document.querySelector(".inpt_base")
let inptSymbol = document.querySelector(".inpt_symbol")
inptBase.addEventListener("keyup", function () {
    inptSymbol.value = (+inptBase.value * BASE_KURS).toFixed(3);
})
inptSymbol.addEventListener("keyup", function () {
    inptBase.value = (+inptSymbol.value * SYMBOL_KURS).toFixed(3);
})


function getData(baseCurr, symbolCurr) {
    fetch(`https://api.exchangerate.host/latest?base=${baseCurr}&symbols=${symbolCurr.innerText}`)
    .then(res => res.json())
    .then(res => {
        const kurs = res.rates[symbolCurr.innerText];
        BASE_KURS = kurs;
        SYMBOL_KURS = 1 / kurs
    })
}
