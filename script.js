const usernameInput = document.getElementById("username");
const searchBtn = document.getElementById("searchBtn");
const img = document.getElementById("skinImg");
const downloadBtn = document.getElementById("downloadBtn");
const loader = document.getElementById("loader");
const errorText = document.getElementById("error");

// SEARCH FUNCTION
function searchSkin() {
  const username = usernameInput.value.trim();

  if (!username) {
    errorText.textContent = "Please enter username!";
    return;
  }

  errorText.textContent = "";
  loader.style.display = "block";
  img.style.display = "none";
  downloadBtn.style.display = "none";

  const headURL = `https://mineskin.eu/armor/body/${username}`;
  const downloadURL = `https://mineskin.eu/download/${username}`;

  const testImg = new Image();
  testImg.src = headURL;

  testImg.onload = () => {
    img.src = headURL;
    img.style.display = "block";

    downloadBtn.href = downloadURL;
    downloadBtn.style.display = "inline-block";

    loader.style.display = "none";
  };

  testImg.onerror = () => {
    loader.style.display = "none";
    errorText.textContent = "Username not found!";
  };
}

// BUTTON CLICK
searchBtn.addEventListener("click", searchSkin);

// ENTER KEY
usernameInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    searchSkin();
  }
});