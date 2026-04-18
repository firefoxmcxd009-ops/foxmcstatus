// ==========================
// QR Images
// ==========================
const qrImages = {
    vip: "/Server/Store/Payment/qr/vip.png",
    mvp: "/Server/Store/Payment/qr/mvp.png",
    mvpplus: "/Server/Store/Payment/qr/mvp+.png",
    epic: "/Server/Store/Payment/qr/epic.png",
    kingdom: "/Server/Store/Payment/qr/kingdom.png"
};

// ==========================
// Rank Prices
// ==========================
const rankPrices = {
    vip: "$2",
    mvp: "$3.5",
    mvpplus: "$5",
    epic: "$6.5",
    kingdom: "$8"
};

// ==========================
// Elements
// ==========================
const rankSelect = document.getElementById("rank");
const qrImg = document.getElementById("qr-img");
const qrContainer = document.getElementById("qr-container");
const loader = document.getElementById("loader");
const rankError = document.getElementById("rankError");
const fileUpload = document.getElementById("fileUpload");
const filetxt = document.getElementById("filetxt");
const usernameInput = document.getElementById("username");

// ==========================
// Preload QR Images
// ==========================
Object.values(qrImages).forEach(src => {
    const img = new Image();
    img.src = src;
});

// ==========================
// File Upload UI
// ==========================
fileUpload.addEventListener("change", function() {
    if (this.files.length > 0) {
        filetxt.textContent = "Uploaded ✓";
    } else {
        filetxt.textContent = "Upload invoice";
    }
});

// ==========================
// Create QR
// ==========================
function generateQR() {
    const rank = rankSelect.value;
    
    if (!rank) {
        rankError.style.display = "block";
        qrContainer.classList.add("hidden");
        return;
    }
    
    rankError.style.display = "none";
    qrContainer.classList.add("hidden");
    loader.classList.remove("hidden");
    
    const tempImg = new Image();
    tempImg.src = qrImages[rank];
    
    tempImg.onload = function() {
        setTimeout(() => {
            qrImg.src = tempImg.src;
            loader.classList.add("hidden");
            qrContainer.classList.remove("hidden");
        }, 700);
    };
    
    tempImg.onerror = function() {
        loader.classList.add("hidden");
        alert("QR image not found.");
    };
}

// ==========================
// Send Order to Telegram
// ==========================
function sendOrder() {
    const username = usernameInput.value.trim();
    const rank = rankSelect.value;
    const file = fileUpload.files[0];
    
    // Validation
    if (!username) {
        alert("Please enter your Minecraft username.");
        usernameInput.focus();
        return;
    }
    
    if (!rank) {
        rankError.style.display = "block";
        rankSelect.focus();
        return;
    }
    
    if (!file) {
        alert("Please upload payment screenshot.");
        return;
    }
    
    rankError.style.display = "none";
    
    // Time
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();
    
    // Random invoice
    const invoiceID = Math.floor(10000 + Math.random() * 90000);
    
    // Telegram Message
    const caption =
        `ᯓRANK ORDERᯓ
═══════════════
⎚ Invoice: #${invoiceID}
♙ Username: ${username}
★ Rank: ${rank.toUpperCase()}
⌘ Price: ${rankPrices[rank]}

✇ Date: ${date}
☊ Time: ${time}
⊟ ᴅɪsᴄᴏʀᴅ: ▷https://dsc.gg/foxmc-kingdom`;
    
    // ==========================
    // IMPORTANT:
    // Replace with your bot token & chat ID
    // ==========================
    const token = "8761120517:AAE269gLZnLJANYnKdImyBAJR-b34ipq4sk";
    const chat_id = "-1003699485147";
    
    const formData = new FormData();
    formData.append("chat_id", chat_id);
    formData.append("photo", file);
    formData.append("caption", caption);
    
    // Disable submit button while sending
    const submitBtn = document.querySelector(".button button:last-child");
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";
    
    fetch(`https://api.telegram.org/bot${token}/sendPhoto`, {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            submitBtn.disabled = false;
            submitBtn.textContent = "Submit";
            
            if (data.ok) {
                alert("Payment submitted successfully!");
                
                // Reset form
                document.getElementById("paymentForm").reset();
                filetxt.textContent = "Upload invoice";
                qrContainer.classList.add("hidden");
                
                // Optional redirect:
                // window.location.href = "success.html";
            } else {
                alert("Failed to send order.");
                console.error(data);
            }
        })
        .catch(error => {
            submitBtn.disabled = false;
            submitBtn.textContent = "Submit";
            alert("Error sending order.");
            console.error(error);
        });
}
