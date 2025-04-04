const toggleBtn = document.getElementById("toggleServices");
const additional = document.getElementById("additional-services");

toggleBtn.addEventListener("click", () => {
  additional.classList.toggle("active");

  toggleBtn.textContent = additional.classList.contains("active")
    ? "Weniger anzeigen"
    : "Weitere Services anzeigen";
});
