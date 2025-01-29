const API_URL = "https://kend-7febd317b583.herokuapp.com/tokens"; // Your Heroku backend URL

async function fetchTokens() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Failed to fetch data");
    const tokens = await response.json();
    renderTokens(tokens);
  } catch (error) {
    console.error("Error fetching tokens:", error);
    document.getElementById("token-container").innerHTML = `
      <p>An error occurred. Please try again later.</p>
    `;
  }
}

function renderTokens(tokens) {
  const container = document.getElementById("token-container");
  container.innerHTML = ""; // Clear container
  tokens.forEach((token) => {
    const tokenCard = document.createElement("div");
    tokenCard.className = "token-card";
    tokenCard.innerHTML = `
      <h3>${token.pairAddress}</h3>
      <p>Price: $${token.price.toFixed(2)}</p>
      <p>Liquidity: $${token.liquidity.toFixed(2)}</p>
      <p>Volume (24h): $${token.volume.toFixed(2)}</p>
    `;
    container.appendChild(tokenCard);
  });
}

// Fetch tokens when the page loads
fetchTokens();