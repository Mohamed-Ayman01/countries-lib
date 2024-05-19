let toggleThemebtn = document.querySelector("nav .toggle-theme");

toggleThemebtn.addEventListener("click", function () {
  if (this.getAttribute("data-theme") == "dark") {
    this.setAttribute("data-theme", "light");
    this.innerHTML = `<i class="fas fa-moon me-1"></i> light mode`;

    document.body.classList.add("light");
    document.body.classList.remove("dark");
  } else {
    this.setAttribute("data-theme", "dark");
    this.innerHTML = `<i class="fas fa-sun me-1"></i> dark mode`;

    document.body.classList.remove("light");
    document.body.classList.add("dark");
  }
});