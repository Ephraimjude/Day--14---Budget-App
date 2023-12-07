const checkAmountButton = document.getElementById("check-amount"),
    totalAmountButton = document.getElementById("total-amount-button"),
    productTitle = document.getElementById("product-title"),
    errorMessage = document.getElementById("budget-error"),
    productTitleError = document.getElementById("product-title-error"),
    productCostError = document.getElementById("product-cost-error"),
    amount = document.getElementById("amount"),
    expenditureValue = document.getElementById("expenditure-value"),
    balanceValue = document.getElementById("balance-amount"),
    list = document.getElementById("list");
let totalAmount = document.getElementById("total-amount");
let userAmount = document.getElementById("user-amount");
let tempAmount = 0;

// Set Budget Functions

totalAmountButton.addEventListener("click", () => {
    tempAmount = totalAmount.value;
    // Bad input
    if (tempAmount === "" || tempAmount < 0) {
        errorMessage.classList.remove("hide");
    } else {
        errorMessage.classList.add("hide");
        // Set bidget
        amount.innerHTML = tempAmount;
        balanceValue.innerText = tempAmount - expenditureValue.innerText;
        // Clear input
        totalAmount.value = "";
    }
});

// Disable edit and delete button function

const disableButtons = (bool) => {
    let editButtons = document.getElementsByClassName("edit");
    Array.from(editButtons).forEach((element) => {
        element.disabled = bool;
    });
};

// Modify list elements function

const modifyElement = (element, edit = false) => {
    let parentDiv = element.parentElement;
    let currentBalance = balanceValue.innerText;
    let currentExpense = expenditureValue.innerText;
    let parentAmount = parentDiv.querySelector(".amount").innerText;
    if (edit) {
        let parentText = parentDiv.querySelector(".product").innerText;
        productTitle.value = parentText;
        userAmount.value = parentAmount;
        disableButtons(true);
    }

    balanceValue.innerText = parseInt(currentBalance) + parseInt(parentAmount);
    expenditureValue.innerText = parseInt(currentExpense) - parseInt(parentAmount);
    parentDiv.remove();
};

// Update the createButton function
const createButton = (iconClass, buttonClass, clickHandler, isChecked) => {
    let button = document.createElement("button");
    button.classList.add("fa-solid", iconClass, buttonClass);
    button.style.fontSize = "1.2em";
    
    // Apply common styling for the buttons
    button.classList.add("edit-delete-button");

    button.addEventListener("click", clickHandler);

    // Add check for the check button
    if (isChecked) {
        button.classList.add("checked");
    }
    return button;
};

// Update the listCreator function
const listCreator = (expenseName, expenseValue) => {
    let subListContent = document.createElement("div");
    subListContent.classList.add("sublist-content", "flex-space");
    list.appendChild(subListContent);
    subListContent.innerHTML = `<p class="product">${expenseName}</p><p class="amount">${expenseValue}</p>`;

    let editButton = createButton("fa-pen-to-square", "edit", () => {
        modifyElement(editButton, true);
    });

    let deleteButton = createButton("fa-trash-can", "delete", () => {
        modifyElement(deleteButton);
    });

    let checkInputBtn = createButton("fa-check-square", "check", () => {
        if (checkInputBtn.classList.contains("checked")) {
            console.log("Expense unchecked:", expenseName);
            checkInputBtn.classList.remove("checked");
            tempAmount += parseInt(expenseValue);
            balanceValue.innerText = tempAmount - expenditureValue.innerText;
        } else {
            console.log("Expense checked:", expenseName);
            checkInputBtn.classList.add("checked");
            tempAmount -= parseInt(expenseValue);
            balanceValue.innerText = tempAmount - expenditureValue.innerText;
        }
    }, false);

    subListContent.appendChild(editButton);
    subListContent.appendChild(deleteButton);
    subListContent.appendChild(checkInputBtn);
    document.getElementById("list").appendChild(subListContent);
};

// Add expenses function

checkAmountButton.addEventListener("click", () => {
    // Check empty
    if (!userAmount.value || !productTitle.value) {
        productTitleError.classList.remove("hide");
        return false;
    }
    // Enable buttons
    disableButtons(false);
    //Expense
    let expenditure = parseInt(userAmount.value);
    // Total expense (existing + new)
    let sum = parseInt(expenditureValue.innerText) + expenditure;
    expenditureValue.innerText = sum;
    // Total balance = budget - total expense
    const totalBalance = tempAmount - sum;
    balanceValue.innerText = totalBalance;
    //Create list
    listCreator(productTitle.value, userAmount.value);
    //Clear inputs
    productTitle.value = "";
    userAmount.value = "";
});