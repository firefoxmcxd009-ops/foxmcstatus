async function getStatus() {
    let ip = document.getElementById("ip").value;

    let loader = document.getElementById("loader");
    let text = document.getElementById("error");
    let result = document.getElementById("result");

    loader.style.display = "block";
    result.style.display = "none";

    try {
        let res = await fetch(`https://api.mcsrvstat.us/2/${ip}`);
        let data = await res.json();

        loader.style.display = "none";

        if (data.online) {
            result.style.display = "block";
            text.style.display = "none";

            document.getElementById("serverIP").innerText = ip;
            document.getElementById("version").innerText = "Version: " + data.version;
            document.getElementById("players").innerText = "Players: " + data.players.online + "/" + data.players.max;

            if (data.icon) {
                document.getElementById("icon").src = data.icon;
            }
        } else {
            text.textContent = `Server is Offline!`;
            text.style.display = "block";
        }

    } catch (error) {
        loader.style.display = "none";
        text.textContent = `Error Loading server...`;
        text.style.display = "block";
    }
}