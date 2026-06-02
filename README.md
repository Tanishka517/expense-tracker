# 🪙 PennyPal — Your Friendly Expense Tracker

Hey there! 👋 **PennyPal** is a simple, clean, and intuitive web application designed to help you manage your personal budget and expenses seamlessly. No complex databases, no heavy setups—just pure JavaScript magic!

---

## 🚀 Super Powers (Features)

* **Smart Welcome Screen:** Asks for your name on the first visit and remembers you.
* **Income Guard:** If your monthly income is set to `0`, a prompt safely asks for your new budget before unlocking the dashboard.
* **Live Math Engine:** Calculates your Total Balance, Expenses, and Budget Left instantly on the screen whenever you add an expense.
* **Persistent Memory:** Uses browser Local Storage. This means you can refresh the page or close your browser, and your data remains safe in the vault!
* **Reset for New Month:** Wipe the slate clean with a single click to start a fresh tracking month.

---

## 🛠️ The Architecture (The 3 Worlds)

PennyPal works by coordinating three distinct layers under the hood:

1.  **HTML5 (The Structure):** Acts as the physical notice board containing the dashboard cards, inputs, and transaction history container.
2.  **CSS3 (The Styling):** Kept entirely in an external stylesheet to ensure a clean, professional, and clutter-free interface (with expenses styled in warning red `#e74c3c`).
3.  **Modern JS (The Brain):** Handles real-time synchronization using DOM manipulation, Array methods (`forEach`, `push`), and JSON parsing.

---

