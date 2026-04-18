const mcColors = {
  '0': 'mc-black',
  '1': 'mc-darkblue',
  '2': 'mc-darkgreen',
  '3': 'mc-darkcyan',
  '4': 'mc-darkred',
  '5': 'mc-purple',
  '6': 'mc-gold',
  '7': 'mc-gray',
  '8': 'mc-darkgray',
  '9': 'mc-blue',
  'a': 'mc-brightgreen',
  'b': 'mc-cyan',
  'c': 'mc-red',
  'd': 'mc-pink',
  'e': 'mc-yellow',
  'f': 'mc-white'
};

// Convert Minecraft MOTD with § codes to HTML spans
function parseMotd(text) {
  let html = '';
  let colorClass = 'mc-white';
  let i = 0;

  while (i < text.length) {
    if (text[i] === '§') {
      i++;
      const code = text[i]?.toLowerCase();
      if (mcColors[code]) {
        colorClass = mcColors[code];
      }
    } else {
      // Escape HTML special characters
      const char = text[i]
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
      html += `<span class="${colorClass}">${char}</span>`;
    }
    i++;
  }
  return html;
}

async function updateServerStatus() {
  const apiUrl = "https://api.mcsrvstat.us/3/foxmckingdom.mcpc.ink";
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    const serverIP = document.getElementById("serverIP");
    const version = document.getElementById("version");
    const port = document.getElementById("port");
    const players = document.getElementById("players");
    const icon = document.getElementById("icon");
    const motdEl = document.getElementById("motd");

    if (data.online) {
      serverIP.innerText = data.hostname || "Unknown IP";
      serverIP.className = "online";
      version.innerText = "Version: " + (data.version || "N/A");
      port.innerText = "Port: " + (data.port ?? "25565");

      const onlineCount = data.players?.online ?? 0;
      const maxPlayers = data.players?.max ?? 0;
      players.innerText = `${onlineCount}/${maxPlayers}`;

      icon.src = data.icon || "";

      // MOTD
      if (data.motd?.raw) {
        motdEl.innerHTML = data.motd.raw.map(line => parseMotd(line)).join('<br>');
      } else if (data.motd?.clean) {
        motdEl.innerHTML = data.motd.clean.join('<br>');
      } else {
        motdEl.innerText = "";
      }

    } else {
      serverIP.innerText = "Server Offline";
      serverIP.className = "offline";
      version.innerText = "";
      port.innerText = "";
      players.innerText = "";
      icon.src = "";
      motdEl.innerText = "";
    }

  } catch (error) {
    console.error("Error fetching server status:", error);
    const serverIP = document.getElementById("serverIP");
    serverIP.innerText = "Error";
    serverIP.className = "offline";
  }
}

updateServerStatus();
setInterval(updateServerStatus, 5000);

/* ===========
   Ranks Store
   =========== */
  // Rank data
const ranks = [
  {
    name: "VIP",
    price: "$2",
    image: "/Server/preview/logo.png"
  },
  {
    name: "MVP",
    price: "$3.5",
    image: "/Server/preview/logo.png"
  },
  {
    name: "MVP+",
    price: "$5",
    image: "/Server/preview/logo.png"
  },
  {
    name: "EPIC",
    price: "$6.5",
    image: "/Server/preview/logo.png"
  },
  {
    name: "KINGDOM",
    price: "$8",
    image: "/Server/preview/logo.png"
  }
];

const store = document.getElementById("store");

ranks.forEach(rank => {
  store.innerHTML += `
    <div class="rank-card">
      <div class="rank">${rank.name}</div>
      <div class="price">${rank.price}</div>

      <button class="buy" onclick="buyRank('${rank.name}')">
        Buy
      </button>

      <button class="preview" onclick="previewRank('${rank.image}')">
        Preview
      </button>
    </div>
  `;
});

// Buy
function buyRank(name) {
  open("/Server/Store/Payment");

  // later connect payment (Tebex / Stripe)
  console.log("Buy rank:", name);
}


// Preview
function previewRank(img) {
  const box = document.getElementById("previewBox");
  const preview = document.getElementById("previewImg");

  preview.src = img;
  box.style.display = "none";
}
