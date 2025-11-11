const cryptoContainer = document.getElementById("crypto-container");
const refreshBtn = document.getElementById("refresh-btn");


const cryptos = [
    { id: "bitcoin", name: "Bitcoin" },
    { id: "ethereum", name: "Ethereum" },
    { id: "cardano", name: "Cardano" },
    { id: "dogecoin", name: "Dogecoin" },
    { id: "solana", name: "Solana" }
];



async function fetchCryptoCoins() {
  try {
    const apiEndpoint = `https://api.coingecko.com/api/v3/simple/price?ids=${cryptos.map(c => c.id).join(',')}&vs_currencies=usd`

    const response = await fetch(apiEndpoint)
    const data = await response.json()

    cryptoContainer.innerHTML = ""

    cryptos.foreach(coin => {
      const price = data[coin.id].usd
      const card = document.createElement("div")
      card.classList.add("crypto-card")

      card.innerHTML = `
                <h2>${coin.name}</h2>
                <p>💵 ${price ? `$${price.toLocaleString()}` : "Unavailable"}</p>
      `

      cryptoContainer.appendChild(card)
    })

  } catch(error) {
      console.error("Error fetching crypto data:", error);
    cryptoContainer.innerHTML = `<p style="color: #ff6b6b;">Failed to load prices. Try again.</p>`;
  }
}


refreshBtn.addEventListener("click", fetchCryptoCoins)

fetchCryptoCoins()