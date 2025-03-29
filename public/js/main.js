const root = document.documentElement;
const menuButton = document.querySelector(".menu-button"); // your menu button selector
const nav = document.querySelector("header nav");
const mainNavigation = document.querySelector(".main-navigation.style-label");

menuButton.addEventListener("click", () => {
  const isExpanded = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", (!isExpanded).toString());

  if (mainNavigation) {
    mainNavigation.classList.toggle("active");
  }

  menuButton.classList.toggle("active");
});

const page = document.body.dataset.page;
const station = document.body.dataset.station;

if (page === "radio" && station) {
  const colorVar = `--${station}`;
  document.documentElement.style.setProperty("--activepagecolor", `var(${colorVar})`);
}
