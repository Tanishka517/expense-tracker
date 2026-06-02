//html and js connection

const usernameDisplay = document.getElementById("username");
const balanceDisplay = document.getElementById("balance");
const incomeDisplay = document.getElementById("income");
const expenseDisplay = document.getElementById("expense");
const budgetDisplay = document.getElementById("budget");
const expenseListHTML = document.getElementById("expense-list");
const addBtn = document.getElementById("addBtn");
const resetBtn = document.getElementById("resetBtn");
const amount = document.getElementById("amount");
const description= document.getElementById("description");
const category = document.getElementById("category");

//fetch data from the local storage

let username = localStorage.getItem("penny_user");
let income = localStorage.getItem("penny_income") || 0;
let expenseList = JSON.parse(localStorage.getItem("penny_expenses"))|| [];

// to check if income is mentioned
if (income == 0)
{
income=Number(prompt("Please enter your income (in Rs.)"))||0;
localStorage.setItem("penny_income",income);

}

//display them on html

usernameDisplay.innerText= username;
incomeDisplay.innerText = income;

// main logic and calculations

function updateDashboard(){

let totalSpent = 0;
expenseListHTML.innerHTML = "";


expenseList.forEach(function(item) {
    totalSpent = totalSpent + item.amountInput;

    
    let li = document.createElement("li");
    
    
    li.innerHTML = `
        <span><strong>${item.categoryInput}</strong> - ${item.descriptionInput}</span>
        <span class="expense-amount">- Rs. ${item.amountInput}</span>
    `;
    
    expenseListHTML.appendChild(li);
});

let budgetleft= income - totalSpent;

incomeDisplay.innerText = 'Rs'+income;
budgetDisplay.innerText = 'Rs'+ budgetleft;
expenseDisplay.innerText = 'Rs'+ totalSpent;
balanceDisplay.innerText = 'Rs' + budgetleft;

let li = document.createElement("li");





}

// addbtn

addBtn.addEventListener('click', function() {
    
   
    let amountDisplay = Number(amount.value);
    let descriptionSet = description.value;
    let categoryChoosen = category.value.trim() || "no description";

   
    if (amountDisplay > 0){
       
        let itemList= {

        
            amountInput: amountDisplay,
            categoryInput: categoryChoosen,
            descriptionInput: descriptionSet
        };

       
        expenseList.push(itemList);
        localStorage.setItem("penny_expenses", JSON.stringify(expenseList));

        
        updateDashboard();

        
        amount.value = "";
        description.value = "";

    }
    
    else {
        alert("Please enter valid amount greater than 0.");
    }
}
);

// reset button
resetBtn.addEventListener('click', function() {

    let confirmReset = confirm("Are you sure you want to reset?");

    if (confirmReset == true) {
        
        
        localStorage.removeItem("penny_income");
        localStorage.removeItem("penny_expenses");
        
        
        let newIncome = Number(prompt("Enter your income.")) || 0;
        localStorage.setItem("penny_income", newIncome);

       
        expenseList = [];
        income = newIncome;
        
        
        window.location.reload();
    }
});