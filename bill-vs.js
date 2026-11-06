function percentOf(amount, percent) {
    return Math.round(amount * percent / 100);
}

function splitTotal(total, people) {
    return Math.ceil(total / people);
}

function formatYen(amount) {
    return amount.toLocaleString("ja-JP", { style: "currency", currency: "JPY" });
}

function check(label, actual, expected) {
    const pass = actual === expected;
    console.log(`${pass ? "PASS" : "FAIL"}: ${label}${pass ? "" : ` (got ${actual}, expected ${expected})`}`);
}

function isPositive(n) {
    return Number.isFinite(n) && n > 0;
}

function isPercent(n) {
    return Number.isFinite(n) && n >= 0 && n <= 100;
}

function isValidPeople(n) {
    return Number.isInteger(n) && n >= 1;
}

function askValidNumber(question, defaultValue, isValid, errorMessage) {
    while (true) {
        const answer = prompt(question, defaultValue);

        if (answer === null) {
            return null;
        }

        if (answer.trim() === "") {
            alert(errorMessage);
            continue;
        }

        if (isValid(value)) {
            return value;
        }

        alert(errorMessage);
    }
}

function main() {
    const bill = askValidNumber("Bill amount (yen):", "", isPositive, "Enter an amount greater than 0.");
    if (bill === null) return;

    const discountPercent = askValidNumber("Discount percent:", "0", isPercent, "Enter a percent from 0 to 100.");
    if (discountPercent === null) return;

    const taxPercent = askValidNumber("Tax percent:", "10", isPercent, "Enter a percent from 0 to 100.");
    if (taxPercent === null) return;

    const tipPercent = askValidNumber("Tip percent:", "15", isPercent, "Enter a percent from 0 to 100.");
    if (tipPercent === null) return;

    const people = askValidNumber("Number of people:", "1", isValidPeople, "Enter a whole number, 1 or more.");
    if (people === null) return;

    const discount = percentOf(bill, discountPercent);
    const discountedBill = bill - discount;
    const tax = percentOf(discountedBill, taxPercent);
    const tip = percentOf(discountedBill, tipPercent);
    const total = discountedBill + tax + tip;
    const perPerson = splitTotal(total, people);

    console.log(`Bill: ${formatYen(bill)}`);
    console.log(`Discount (${discountPercent}%): -${formatYen(discount)}`);
    console.log(`Tax (${taxPercent}%): ${formatYen(tax)}`);
    console.log(`Tip (${tipPercent}%): ${formatYen(tip)}`);
    console.log(`Total: ${formatYen(total)}`);
    console.log(`Each of ${people} pays: ${formatYen(perPerson)}`);
}

function clamp(value, min, max) {
    if (Number.isNaN(value)) return min;
    if (value > max) return max;
    if (value < min) return min;
    return value;
}

function average(a, b, c) {
    if (!Number.isFinite(a) || !Number.isFinite(b) || !Number.isFinite(c)) {
        return NaN;
    }
    return (a + b + c) / 3;
}

function capitalize(word) {
    if (typeof word !== "string") return "";
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

function isPalindrome(word) {
    if (typeof word !== "string") return false;
    const text = word.toLowerCase().replace(/[^\p{L}\p{N}]/gu, "");
    return text === text.split("").reverse().join("");
}

function runChecks() {
  check("10% of 8400", percentOf(8400, 10), 840);
  check("percent rounds", percentOf(999, 15), 150);
  check("split 9450 by 4", splitTotal(9450, 4), 2363);
  check("yen has amount", formatYen(1200).endsWith("1,200"), true);
  check("positive 0", isPositive(0), false);
  check("percent 150", isPercent(150), false);
  check("people 2.5", isValidPeople(2.5), false);
  check("clamp high", clamp(15, 0, 10), 10);
  check("clamp low", clamp(-5, 0, 10), 0);
  check("clamp NaN", clamp(NaN, 0, 10), 0);
  check("average", average(1, 2, 3), 2);
  check("average string", Number.isNaN(average("1", 2, 3)), true);
  check("capitalize", capitalize("hELLO"), "Hello");
  check("capitalize empty", capitalize(""), "");
  check("palindrome sentence", isPalindrome("A man, a plan, a canal: Panama"), true);
  check("palindrome japanese", isPalindrome("たけやぶやけた"), true);
  check("palindrome number", isPalindrome(121), false);
}

runChecks();
// main();