const root = document.documentElement;
const menuButton = document.querySelector(".menu-button"); // your menu button selector
const nav = document.querySelector("header nav");
const cards = document.querySelectorAll('[class^="card-"]');
const mainNavigation = document.querySelector(".main-navigation.style-label");

menuButton.addEventListener("click", () => {
  const isExpanded = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", (!isExpanded).toString());

  if (mainNavigation) {
    mainNavigation.classList.toggle("active");
  }

  menuButton.classList.toggle("active");
});

cards.forEach((card) => {
  card.addEventListener("mouseenter", () => {
    const classList = Array.from(card.classList);
    const colorClass = classList.find((cls) => cls.startsWith("card-"));
    const station = colorClass?.replace("card-", "");

    if (station) {
      const cssVar = getComputedStyle(root).getPropertyValue(`--${station}`);
      root.style.setProperty("--activehovercolor", cssVar);
    }
  });

  card.addEventListener("mouseleave", () => {
    const mediahuisColor = getComputedStyle(root).getPropertyValue("--mediahuis");
    root.style.setProperty("--activehovercolor", mediahuisColor);
  });
});
