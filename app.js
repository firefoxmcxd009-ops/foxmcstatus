const toggleButton = document.getElementById('toggle-btn')
const sidebar = document.getElementById('sidebar')

function toggleSidebar(){
  sidebar.classList.toggle('close')
  toggleButton.classList.toggle('rotate')

  closeAllSubMenus()
}

function toggleSubMenu(button){

  if(!button.nextElementSibling.classList.contains('show')){
    closeAllSubMenus()
  }

  button.nextElementSibling.classList.toggle('show')
  button.classList.toggle('rotate')

  if(sidebar.classList.contains('close')){
    sidebar.classList.toggle('close')
    toggleButton.classList.toggle('rotate')
  }
}

function closeAllSubMenus(){
  Array.from(sidebar.getElementsByClassName('show')).forEach(ul => {
    ul.classList.remove('show')
    ul.previousElementSibling.classList.remove('rotate')
  })
}

// =================== //
// ==== Clipboard ==== //
// =================== //
function copy() {
  const popup = document.getElementById("popup");
  navigator.clipboard.writeText("foxmckingdom.apsara.fun:62080");

  popup.classList.add("show");

  setTimeout(() => {
    popup.classList.remove("show");
  }, 2000);
};

// 3D Hover Box
const boxes = document.querySelectorAll(".box");

boxes.forEach(box => {
  box.addEventListener("mousemove", (e) => {
    const rect = box.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = -(y - centerY) / 50;
    const rotateY = (x - centerX) / 50;

    box.style.transform = `
      perspective(1500px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale(1.02)
    `;
  });

  box.addEventListener("mouseleave", () => {
    box.style.transform = "perspective(1000px) rotateX(0) rotateY(0)";
  });
});