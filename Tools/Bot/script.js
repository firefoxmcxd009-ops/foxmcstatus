const bot = document.getElementById("bot");
const pupils = document.querySelectorAll(".pupil");
const eyes = document.querySelectorAll(".eye");

document.addEventListener("mousemove", (e) => {

    /* ===== HEAD 3D ROTATE ===== */
    const x = (window.innerWidth / 5 - e.clientX) / -20;
    const y = (window.innerHeight / 5 - e.clientY) / 20;

    bot.style.transform = `
        rotateY(${x}deg)
        rotateX(${y}deg)
    `;

    /* ===== EYES FOLLOW ===== */
    pupils.forEach(pupil => {
        const rect = pupil.parentElement.getBoundingClientRect();

        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const dx = e.clientX - centerX;
        const dy = e.clientY - centerY;

        const angle = Math.atan2(dy, dx);

        const radius = 8; // limit movement
        const moveX = Math.cos(angle) * radius;
        const moveY = Math.sin(angle) * radius;

        pupil.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
});
/* Eyes Blink */
setInterval(() => {
    eyes.forEach(e => {
        e.classList.add("blink");
        setTimeout(() =>
            e.classList.remove("blink"), 200
        );
    });
}, 5000);