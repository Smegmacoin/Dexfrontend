const API_URL = "https://kend-7febd317b583.herokuapp.com/tokens"; // Your Heroku backend API URL

async function fetchTokens() {
    try {
        // Show the loading message
        document.getElementById("loading").classList.remove("hidden");
        document.getElementById("error").classList.add("hidden");

        // Fetch data from the backend
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error("Failed to fetch tokens.");
        }
        const tokens = await response.json();

        // Hide loading message
        document.getElementById("loading").classList.add("hidden");

        // Display tokens in the table
        const table = document.getElementById("token-table");
        const tbody = table.querySelector("tbody");
        tbody.innerHTML = ""; // Clear previous data

        tokens.forEach(token => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${token.token_name}</td>
                <td>${token.price.toFixed(2)}</td>
                <td>${token.liquidity.toLocaleString()}</td>
                <td>${token.volume.toLocaleString()}</td>
                <td>${new Date(token.created_at).toLocaleString()}</td>
            `;
            tbody.appendChild(row);
        });

        table.classList.remove("hidden");
    } catch (error) {
        console.error(error);
        document.getElementById("loading").classList.add("hidden");
        document.getElementById("error").classList.remove("hidden");
    }
}

// Fetch tokens on page load
document.addEventListener("DOMContentLoaded", fetchTokens);
