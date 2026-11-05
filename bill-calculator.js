let i=1;
let billAmount = Number(prompt("Bill amount (yen):"));
while (!Number.isFinite(billAmount) || billAmount <= 0 && i<3){
    billAmount = Number(prompt("That's not a valid amount. Bill amount in JPY, more than 0!"));
    i=i+1;
}
if (i=>3){
    console.log("Please try again later!");
} else {
    const taxPercent = Number(prompt("Tax percent:", "10"));
    const tipPercent = Number(prompt("Tip percent:", "15"));
    const people = Number(prompt("Number of people:", "1"));
    const discountPercent = 10;
    const exchangeRate = 100; // yen per USD, practice value
    const billOk = Number.isFinite(billAmount) && billAmount > 0;
    const taxOk = Number.isFinite(taxPercent) && taxPercent >= 0 && taxPercent <= 100;
    const tipOk = Number.isFinite(tipPercent) && tipPercent >= 0;
    const peopleOk = Number.isInteger(people) && people >= 1;
    if (!billOk) {
        console.log("Please enter a bill amount greater than 0.");
    } else if (!taxOk) {
        console.log("Tax percent must be between 0 and 100.");
    } else if (!tipOk) {
        console.log("Tip percent can't be negative.");
    } else if (!peopleOk) {
        console.log("Number of people must be a whole number, 1 or more.");
    } else {
        const discount = Math.round(billAmount * discountPercent / 100);
        const discountedBill = billAmount - discount;
        const tax = Math.round(discountedBill * taxPercent / 100);
        const tip = Math.round(discountedBill * tipPercent / 100);
        const total = discountedBill + tax + tip;
        const perPerson = Math.ceil(total / people);
        const perPersonUsd = perPerson / exchangeRate;

        console.log(`Bill: ${billAmount} yen`);
        console.log(`Discount (${discountPercent}%): -${discount} yen`);
        console.log(`Tax (${taxPercent}%): ${tax} yen`);
        console.log(`Tip (${tipPercent}%): ${tip} yen`);
        console.log(`Total: ${total} yen`);
        console.log(`Each of ${people} pays: ${perPerson} yen (about $${perPersonUsd.toFixed(2)})`);
    }
}