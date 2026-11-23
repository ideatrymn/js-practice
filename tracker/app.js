let lastDeleted = null;
let selectedCategory = loadFilter();
let searchText = "";
let sortKey = "amount-desc";
const sortSelect = document.querySelector("#sort-select");
const searchInput = document.querySelector("#search-input");
const filterSelect = document.querySelector("#filter-select");
const form = document.querySelector("#expense-form");
const itemInput = document.querySelector("#item-input");
const amountInput = document.querySelector("#amount-input");
const categoryInput = document.querySelector("#category-input");
const formError = document.querySelector("#form-error");

sortSelect.addEventListener("change", () => {
    sortKey = sortSelect.value;
    render(expenses);
});

searchInput.addEventListener("input", () => {
    searchText = searchInput.value;
    render(expenses);
});
document.querySelector("#reset-btn").addEventListener("click", () => {
    if (!confirm("Replace all your expenses with the sample data?")) return;

    expenses = [...SAMPLE_EXPENSES];
    lastDeleted = null;
    selectedCategory = "all";
    searchText = "";
    searchInput.value = "";
    sortKey = "amount-desc";
    sortSelect.value = sortKey;
    saveFilter("all");
    localStorage.removeItem(STORAGE_KEY);
    render(expenses);
});

document.querySelector("#undo-btn").addEventListener("click", () => {
    if (lastDeleted === null) return;

    expenses = restoreExpense(expenses, lastDeleted);
    lastDeleted = null;
    saveExpenses(expenses);
    render(expenses);
});

form.addEventListener("submit", event => {
    event.preventDefault();

    const result = parseExpenseInput(itemInput.value, amountInput.value, categoryInput.value);

    if (result.error) {
        formError.textContent = result.error;
        return;
    }

    formError.textContent = "";
    expenses = addExpense(expenses, result.value);
    lastDeleted = null;
    saveExpenses(expenses);
    render(expenses);
    form.reset();
    itemInput.focus();
});

document.querySelector("#expense-body").addEventListener("click", event => {
    const button = event.target.closest("button[data-id]");
    if (!button) return;

    const id = Number(button.dataset.id);
    const removed = expenses.find(expense => expense.id === id);
    if (!removed) return;

    lastDeleted = removed;
    expenses = removeExpense(expenses, id);
    saveExpenses(expenses);
    render(expenses);
})

filterSelect.addEventListener("change", () => {
    selectedCategory = filterSelect.value;
    saveFilter(selectedCategory);
    render(expenses);
});

function createEl(tag, text = "", className = "") {
    const element = document.createElement(tag);
    element.textContent = text;
    if (className) element.classList.add(className);
    return element;
}

function renderSummary(expenses) {
    const container = document.querySelector("#summary");
    const stats = summary(expenses);
    const cards = [
        ["Total", formatYen(stats.total)],
        ["Expenses", stats.count],
        ["Average", formatYen(Math.round(stats.average))],
        ["Biggest", stats.largest ?? "None"],
    ].map(([label, value]) => {
        const card = createEl("div", "", "card");
        card.append(
            createEl("p", label, "card-label"),
            createEl("p", value, "card-value"),
        );
        return card;
    });
    container.replaceChildren(...cards);
}

function renderTable(expenses) {
    const body = document.querySelector("#expense-body");
    const biggest = biggestExpense(expenses);
    const rows = expenses.map(expense => {
        const row = document.createElement("tr");

        const deleteBtn = createEl("button", "Delete", "delete-btn");
        deleteBtn.type = "button";
        deleteBtn.dataset.id = expense.id;
        deleteBtn.setAttribute("aria-label", `Delete ${expense.item}`);

        const actionCell = createEl("td");
        actionCell.append(deleteBtn);

        row.append(
            createEl("td", expense.item, "item"),
            createEl("td", capitalize(expense.category), "category"),
            createEl("td", formatYen(expense.amount), "amount"),
            actionCell,
        );

        if (expense.id === biggest?.id) {
            row.classList.add("biggest");
        }

        return row;
    });
    body.replaceChildren(...rows);
}

function renderCategories(expenses) {
    const list = document.querySelector("#category-list");
    const total = totalSpent(expenses);

    const items = Object.entries(totalsByCategory(expenses))
        .sort((a, b) => b[1] - a[1])
        .map(([category, amount]) => {
            const percent = percentOfTotal(amount, total);
            const li = createEl("li", `${capitalize(category)}: ${formatYen(amount)} (${formatPercent(percent)})`);
            const count = countByCategory(expenses, category);
            const badge = createEl("span", `${count} ${count === 1 ? "item" : "items"}`, "badge");
            li.append(" ", badge);
            return li;
        });
    list.replaceChildren(...items);
}

function renderEmpty(expenses, visible) {
    const none = expenses.length === 0;
    const noMatches = !none && visible.length === 0;
    const filtering = selectedCategory !== "all" || searchText.trim() !== "";

    document.querySelector("#filter-status").textContent =
        filtering ? `Showing ${visible.length} of ${expenses.length} expenses` : "";
    document.querySelector("#empty-message").classList.toggle("hidden", !none);
    document.querySelector("#no-matches").classList.toggle("hidden", !noMatches);
    document.querySelector("#expense-table").classList.toggle("hidden", visible.length === 0);
    document.querySelector("#filter-status").textContent =
        selectedCategory === "all" ? "" : `Showing ${visible.length} of ${expenses.length} expenses`;
}

function renderReport(expenses) {
    const report = document.querySelector("#report");
    report.textContent = buildReport(expenses);
}

function renderFilter(expenses) {

    const categories = Object.keys(totalsByCategory(expenses)).sort();

    if (selectedCategory !== "all" && !categories.includes(selectedCategory)) {
        selectedCategory = "all";
        saveFilter(selectedCategory);
    }

    const options = ["all", ...categories].map(category => {
        const option = createEl("option", category === "all" ? "All categories" : capitalize(category));
        option.value = category;
        return option;
    });

    filterSelect.replaceChildren(...options);
    filterSelect.value = selectedCategory;
}

function renderUndo() {
    const bar = document.querySelector("#undo-bar");
    bar.classList.toggle("hidden", lastDeleted === null);

    document.querySelector("#undo-text").textContent =
        lastDeleted === null ? "" : `Deleted "${lastDeleted.item}".`;
}

function render(expenses) {
    const visible = getVisibleExpenses(expenses, {
        category: selectedCategory, query: searchText, sort: sortKey,
    });
    renderFilter(expenses);
    renderEmpty(expenses, visible);
    renderSummary(expenses);
    renderTable(visible);
    renderCategories(expenses);
    renderReport(expenses);
    renderUndo();
}

render(expenses);