console.log(document);
const title = document.querySelector("#title");
const firstNote = document.querySelector(".note");
const notes = document.querySelectorAll(".note");
const items = document.querySelectorAll("#list li");
const names = [...notes].map(note => note.textContent);
const link = document.createElement("a");
const list = document.querySelector("#list");
function capitalize(word) {
    if (typeof word !== "string") return "";
    return word.charAt(0).toUpperCase() + word.slice(1);
}
function renderList(listElement, items) {
    listElement.replaceChildren();
    items.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        listElement.append(li);
    });
}
function foodMessage(output) {
    return `You have ${favFoods.length} ${favFoods.length === 1 ? "food" : "foods"}`;
}
//1
title.textContent = "Munhuu"
//2
document.querySelectorAll(".note")[1].classList.add("bold");
//3
document.querySelectorAll("#list li").forEach((item, index) => {
    item.textContent = `${index + 1}. ${item.textContent}`;
});
//4
const favFoods = ["burger", "hotdog", "tacos", "ramen", "udon"];
list.replaceChildren();
favFoods.forEach(food => {
    const li = document.createElement("li");
    li.textContent = capitalize(food);
    list.append(li);
});
//5
const output = document.querySelector("#output");
favFoods.push("Tortillas");
renderList(list, favFoods);
output.textContent = foodMessage(output);
//6
link.href="https://developer.mozilla.org";
link.target = "_blank"
link.rel = "noopener noreferrer"
link.textContent = "Learn more on MDN";
const linkLine = document.createElement("p");
linkLine.append(link);
output.append(linkLine);