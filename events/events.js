function formatYen(amount) {
    return amount.toLocaleString("ja-JP", { style: "currency", currency: "JPY" });
}

const button = document.querySelector("#counter-btn");

button.addEventListener("click", () => {
    console.log("Button clicked!");
});

const counterBtn = document.querySelector("#counter-btn");
const resetBtn = document.querySelector("#reset-btn");
let clicks = 0;

counterBtn.addEventListener("click", () => {
    clicks += 1;
    counterBtn.textContent = `Clicked ${clicks} ${clicks === 1 ? "time" : "times"}`;
});

resetBtn.addEventListener("click", () => {
    clicks *= 0;
    counterBtn.textContent = `Clicked ${clicks} ${clicks === 1 ? "time" : "times"}`;
});

counterBtn.addEventListener("click", event => {
    console.log(event.type);
    console.log(event.target);
});

const nameInput = document.querySelector("#name-input");
const greeting = document.querySelector("#greeting");
const wordCounter = document.querySelector("#word-counter");

nameInput.addEventListener("input", () => {
    const name = nameInput.value.trim();
    const count = name.length;
    const max_length = 50;

    greeting.textContent = name === "" ? "" : `Hello, ${name}!`;
    wordCounter.textContent = `${count}/${max_length} characters`;
    wordCounter.classList.toggle("over-limit", count > max_length);
});

const form = document.querySelector("#demo-form");
const amountInput = document.querySelector("#amount-input");
const formError = document.querySelector("#form-error");
const log = document.querySelector("#log");
const totalEl = document.querySelector("#total");
let total = 0;
form.addEventListener("submit", event => {
    event.preventDefault();   // stop the page reload

    const text = amountInput.value.trim();
    const amount = Number(text);

    if (text === "" || !Number.isFinite(amount) || amount <= 0) {
        console.warn("Enter an amount greater than 0.");
        return;
    }

    const li = document.createElement("li");
    li.textContent = `Added ${amount} yen`;
    total += amount;
    totalEl.textContent = `Total ${formatYen(total)}`
    log.append(li);

    form.reset();
    amountInput.focus();
});
amountInput.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        amountInput.value = "";
    }
});
nameInput.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        nameInput.value = "";
        greeting.textContent = "";
    }
});

const title = document.querySelector("#title");
title.addEventListener("click", () => {
    title.classList.toggle("highlight");
});