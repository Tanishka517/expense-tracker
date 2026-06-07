document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. DOUGHNUT CHART LOGIC (Current Month Expenses)
    // ==========================================
    
    // Fetch current month's transactions
    const storedExpenses = localStorage.getItem("penny_expenses");
    const transactions = JSON.parse(storedExpenses) || [];

    // Categories array matching your HTML options exactly
    const categories = ['Food', 'Travel', 'Shopping', 'Education', 'Entertainment', 'Health', 'Others'];
    
    // Initialize totals map for sorting values
    const categoryTotals = { 
        Food: 0, Travel: 0, Shopping: 0, Education: 0, Entertainment: 0, Health: 0, Others: 0 
    };

    // Calculate sum for each category dynamically
    transactions.forEach(item => {
        let itemCategory = item.categoryInput; 
        
        if (itemCategory) {
            // Capitalize first letter to match our object keys perfectly (e.g., 'food' -> 'Food')
            itemCategory = itemCategory.charAt(0).toUpperCase() + itemCategory.slice(1).toLowerCase();
        }

        // Add the transaction amount to the correct category bucket
        if (categoryTotals.hasOwnProperty(itemCategory)) {
            categoryTotals[itemCategory] += parseFloat(item.amountInput) || 0;
        } else {
            categoryTotals['Others'] += parseFloat(item.amountInput) || 0;
        }
    });

    // Map object totals into a direct sequential array for Chart.js
    const doughnutDataValues = categories.map(cat => categoryTotals[cat]);

    // Render Doughnut Chart if canvas exists
    const canvasCategory = document.getElementById('categoryChart');
    if (canvasCategory) {
        const ctxCategory = canvasCategory.getContext('2d');
        new Chart(ctxCategory, {
            type: 'doughnut',
            data: {
                labels: categories,
                datasets: [{
                    data: doughnutDataValues,
                    backgroundColor: ['#FF6B9A', '#4bc0c0', '#ffcd56', '#36a2eb', '#9966ff', '#2ecc71', '#95a5a6'],
                    borderWidth: 2,
                    hoverOffset: 6
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { position: 'bottom' }
                }
            }
        });
    }


    // ==========================================
    // 2. LINE CHART LOGIC (Monthly Savings History)
    // ==========================================
    
    // Fetch our ongoing history list built by the Reset Button logic
    const storedHistory = localStorage.getItem("penny_savings_history");
    const savingsHistoryData = JSON.parse(storedHistory) || [];

    // Pull out all the month names and tracking values into flat arrays
    let lineLabels = savingsHistoryData.map(item => item.month);
    let lineDataValues = savingsHistoryData.map(item => item.savingsValue);

    // FALLBACK PLACEHOLDER: If they haven't reset a single month yet, show a clean starting view
    if (savingsHistoryData.length === 0) {
        lineLabels = ['Setup Month'];
        lineDataValues = [0];
    }

    // Render Line Chart if canvas exists
    const canvasTrend = document.getElementById('trendChart');
    if (canvasTrend) {
        const ctxTrend = canvasTrend.getContext('2d');
        new Chart(ctxTrend, {
            type: 'line',
            data: {
                labels: lineLabels, 
                datasets: [{
                    label: 'Monthly Savings (₹)',
                    data: lineDataValues, 
                    borderColor: '#2ecc71', // Bright Green for Savings growth tracker
                    backgroundColor: 'rgba(46, 204, 113, 0.1)', // Light fluid transparent fill
                    fill: true,
                    tension: 0.3, // Soft curved lines for sleek aesthetic
                    borderWidth: 3,
                    pointBackgroundColor: '#2ecc71',
                    pointRadius: 5
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) { return '₹' + value; } // Formats values automatically with Rupee symbol
                        }
                    }
                }
            }
        });
    }
});