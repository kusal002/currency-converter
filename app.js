const BASE_URL = "https://api.currencyapi.com/v3/latest?apikey=cur_live_F3CNXULgpEOLHP7YPX2bYMi3td5Gj4NrhnWQhYfU";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurrTag = document.querySelector(".from-select");
const toCurrTag = document.querySelector(".to-select");
const msg = document.querySelector(".msg")

for (let select of dropdowns) {
    for (currcode in countryList) {
       let newOption = document.createElement('option');
       newOption.innerText = currcode;
       if (select.name === "from" && currcode === "USD") {
        newOption.selected = "selected";
       } else if (select.name === "to" && currcode === "INR"){ 
        newOption.selected = "selected";
       }
       select.append(newOption);  
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if (amtVal === "" || amtVal < 1){
        amtVal = 1;
        amount.value = "1";
    }
    const URL = `${BASE_URL}&base_currency=${fromCurrTag.value}&currencies=${toCurrTag.value}`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data.data[toCurrTag.value];
    rate = rate.value;
    let finalAmount = amtVal * rate;
    console.log(finalAmount);
  msg.innerText = `${amtVal} ${fromCurrTag.value} = ${finalAmount} ${toCurrTag.value}`;
};

const updateFlag = (element) => {
    let currcode = element.value;
    let countrycode = countryList[currcode];
    let newSrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});

window.addEventListener("load", () => {
    updateExchangeRate();
})