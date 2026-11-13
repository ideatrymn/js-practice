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
    const rows = sortedByAmount(expenses).map(expense => {
        const row = document.createElement("tr");
        row.append(
            createEl("td", expense.item, "item"),
            createEl("td", capitalize(expense.category), "category"),
            createEl("td", formatYen(expense.amount), "amount"),
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

function renderEmpty(expenses) {
    document.querySelector("#empty-message").classList.toggle("hidden", expenses.length > 0);
    document.querySelector("#expense-table").classList.toggle("hidden", expenses.length === 0);
}

function renderReport(expenses) {
    const report = document.querySelector("#report");
    report.textContent = buildReport(expenses);
}

function render(expenses) {
    renderEmpty(expenses);
    renderSummary(expenses);
    renderTable(expenses);
    renderCategories(expenses);
    renderReport(expenses);
}

render(expenses);

render([]);