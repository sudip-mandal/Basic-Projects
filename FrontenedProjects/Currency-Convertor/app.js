const BASE_URL = "https://api.frankfurter.app/latest";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

async function init() {
  for (let select of dropdowns) {
    for (let currCode in countryList) {
      const opt = document.createElement("option");
      opt.value = currCode;
      opt.innerText = currCode;
      if (select.name === "from" && currCode === "USD") opt.selected = true;
      if (select.name === "to" && currCode === "INR") opt.selected = true;
      select.append(opt);
    }
    select.addEventListener("change", e => {
      updateFlag(e.target);
      updateExchangeRate();
    });
    updateFlag(select); // flag init
  }
  btn.addEventListener("click", e => {
    e.preventDefault();
    updateExchangeRate();
  });
  await updateExchangeRate();
}

async function updateExchangeRate() {
  msg.classList.add("fade");
  const amtInput = document.querySelector(".amount input");
  let amount = parseFloat(amtInput.value) || 1;
  amtInput.value = amount;

  const url = `${BASE_URL}?amount=${amount}&from=${fromCurr.value}&to=${toCurr.value}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    const rate = data.rates[toCurr.value];
    const final = (amount * rate).toFixed(4);
    msg.innerText = `${amount} ${fromCurr.value} = ${final} ${toCurr.value}`;
  } catch {
    msg.innerText = "Error fetching rate.";
  } finally {
    setTimeout(() => msg.classList.remove("fade"), 300);
  }
}

function updateFlag(sel) {
  const code = sel.value;
  const country = countryList[code] || code;
  const img = sel.parentElement.querySelector("img");
  img.style.opacity = 0;
  setTimeout(() => {
    img.src = `https://flagsapi.com/${code.slice(0,-1)}/flat/64.png`;
    img.alt = `Flag of ${code}`;
    console.log(code.slice(0,-1));
    img.style.opacity = 1;
  }, 200);
}

window.addEventListener("load", init);
