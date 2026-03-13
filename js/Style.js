const amountInput = document.getElementById("amount");
const fromCurrency = document.getElementById("from-currency");
const fromFlag = document.getElementById("from-flag");
const toCurrency = document.getElementById("to-currency");
const toFlag = document.getElementById("to-flag");
const finalResult = document.getElementById("final-result");
function addCountrysToSelect() {
    Object.keys(COUNTRY_NAMES).forEach(code => {
        const optionFrom = document.createElement("option");
        optionFrom.value = code;
        optionFrom.textContent = `${code} - ${COUNTRY_NAMES[code]}`;
        optionFrom.className = "bg-dark option w-50";
        fromCurrency.appendChild(optionFrom);
        const optionTo = optionFrom.cloneNode(true);
        toCurrency.appendChild(optionTo);
    });
}
addCountrysToSelect();
function updateFlag(selectElement,flagElement) {
    const code = selectElement.value;
    const countryCode = countryList[code];
    flagElement.src = `https://flagsapi.com/${countryCode}/shiny/64.png`;
}
fromCurrency.addEventListener("change", () => {   
    updateFlag(fromCurrency, fromFlag)
});
toCurrency.addEventListener("change", () => { 
    updateFlag(toCurrency, toFlag)
});
function swapCurrencies() {
    [fromCurrency.value, toCurrency.value] = [toCurrency.value, fromCurrency.value];
    updateFlag(fromCurrency, fromFlag);
    updateFlag(toCurrency, toFlag);
    convertCurrency();
}
async function convertCurrency() {
    let amount =amountInput.value || 1;
    let from = fromCurrency.value;
    let to = toCurrency.value;
    if (isNaN(amount) || amount < 0) {
        finalResult.innerHTML="Please enter a valid number";
        return;
    }
    try {
        const res = await fetch(`https://v6.exchangerate-api.com/v6/5d39acbc10d14b58f358995c/latest/USD`);
        const data = await res.json();
        const rate = data.conversion_rates;
        const result = (amount * (rate[to] / rate[from])).toFixed(3);
        finalResult.textContent = `${amount} ${from} = ${result} ${to}`;
    } catch (error) {
        console.error("Error fetching data:", error);
        finalResult.textContent = "Error fetching conversion rates.";
    }
}