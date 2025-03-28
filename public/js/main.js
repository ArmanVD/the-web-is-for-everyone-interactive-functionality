const root = document.documentElement;

const cards = document.querySelectorAll('[class^="card-"]');

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
    root.style.setProperty("--activehovercolor", "var(--mediahuis)");
  });
});
