console.log(document);
const title = document.querySelector("#title");
const firstNote = document.querySelector(".note");
const notes = document.querySelectorAll(".note");
const items = document.querySelectorAll("#list li");
const names = [...notes].map(note => note.textContent);
const link = document.createElement("a");
const list = document.querySelector("#list");

link.setAttribute("href", "https://developer.mozilla.org");
link.textContent = "MDN";


title.textContent = "Hello from JavaScript";

document.querySelectorAll(".note").forEach((note, index) => {
    note.textContent = `Note number ${index + 1}`;
});

output.innerHTML = "<strong>Bold</strong> text";   // renders bold
output.textContent = "<strong>Bold</strong> text"; // shows the tags as plain text
title.classList.add("highlight");        // add a class
title.classList.remove("highlight");     // remove it
title.classList.toggle("highlight");     // add if missing, remove if present
console.log(title.classList.contains("highlight"));   // true or false
title.style.color = "tomato";
title.style.fontSize = "2.5rem";

const item = document.createElement("li");  //create
item.textContent="Date";                  //fill in
list.append(item);                      //attach to the page
list.prepend(item);                    // at the start of the list
//list.append(item1, item2, item3);      // several at once

const firstItem=document.querySelector("#list li");
firstItem.remove();            //remove

//list.replaceChildren(); //removes everything
//list.replaceChildren(item1,item2); //replace with these

const fruits = ["Apple", "Banana", "Cherry", "Date"];
list.replaceChildren();

fruits.forEach(fruit =>{
    const li = document.createElement("li");
    li.textContent=fruit;
    list.append(li);
});

//const items = fruits.map(fruit => {
//   const li = document.createElement("li");
// //  li.textContent=fruit;
//    return li;});
//list.replaceChildren(...items);