document.addEventListener("DOMContentLoaded", 
    function () {
  console.log("DOM fully loaded");

  const iconBoxes = document.querySelectorAll(".icon-box");
  console.log("iconBoxes found:", iconBoxes);

  if (iconBoxes.length > 0) {
    iconBoxes.forEach(box => {
      console.log("Adding event listener to box");
      box.addEventListener("mouseenter", () => {
        console.log("Mouse entered box");
        box.classList.add("bounce-effect");
      });

      box.addEventListener("mouseleave", () => {
        console.log("Mouse left box");
        box.classList.remove("bounce-effect");
      });
    });
  }
});
