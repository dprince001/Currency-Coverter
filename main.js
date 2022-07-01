const currencyEl_one = document.getElementById('currency-one');
const currencyEl_two = document.getElementById('currency-two');
const amountEl_one = document.getElementById('amount-one');
const amountEl_two = document.getElementById('amount-two');

const rateEl = document.getElementById('rate');
const swap = document.getElementById('swap');



// const calculate = () => {

//     const currency_one = currencyEl_one.value;
//     const currency_two = currencyEl_two.value;

//     fetch(`https://v6.exchangerate-api.com/v6/14597ffd6b886e69c1840cfa/latest/${currency_one}`)
//     .then(res => res.json())
//     .then(data => {

//         const rate = data.conversion_rates[`${currency_two}`];
//         console.log(rate);

//         rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;

//         amountEl_two.value = (rate * amountEl_one.value).toFixed(2);

//     })
//     .catch(err => alert('Something went wrong :(')); 
// };

// calculate();



let currency_one;
let currency_two;

const getApiResults = async () => {
    try {
        currency_one = currencyEl_one.value;
        currency_two = currencyEl_two.value;

        const result = await fetch(`https://v6.exchangerate-api.com/v6/14597ffd6b886e69c1840cfa/latest/${currency_one}`);
        const resultJson =  await result.json();
        const data = resultJson.conversion_rates;
        if(data) {
            let rate = data[`${currency_two}`];
            return rate;
        }
    } catch (err) {
        // alert('Something went wrong :(' );
        console.log(err);
    }
};

const calculate = async () => {
    const rate = await getApiResults();
    rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;

    amountEl_two.value = (rate * amountEl_one.value).toFixed(2);
};


// event listeners
currencyEl_one.addEventListener('change', calculate);
currencyEl_two.addEventListener('change', calculate);
amountEl_one.addEventListener('input', calculate);
amountEl_two.addEventListener('input', calculate);


// swap
swap.addEventListener('click', () => {
    swap.classList.toggle('spin');

    const t = currencyEl_one.value;
    currencyEl_one.value = currencyEl_two.value;
    currencyEl_two.value = t;

    calculate();
})