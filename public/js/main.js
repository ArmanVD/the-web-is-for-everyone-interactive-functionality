// Scroll position preservation
if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

const savedScrollY = sessionStorage.getItem("scrollY");
if (savedScrollY !== null) {
  window.scrollTo(0, parseInt(savedScrollY));
  sessionStorage.removeItem("scrollY");
}

const root = document.documentElement;
const menuButton = document.querySelector(".menu-button");
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

const dayButtons = document.querySelectorAll(".schedule-days li");
const scheduleItems = document.querySelectorAll(".schedule-timeline li");
const dateDisplay = document.getElementById("selected-date-display");

dayButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const currentlyActive = document.querySelector(".schedule-days .active");
    if (currentlyActive) {
      currentlyActive.classList.remove("active");
    }
    button.classList.add("active");

    const selectedDate = button.getAttribute("data-date");
    const parts = selectedDate.split("-");
    const parsedDate = new Date(parts[0], parts[1] - 1, parts[2]);
    if (!isNaN(parsedDate)) {
      dateDisplay.textContent = parsedDate.toLocaleDateString("nl-NL", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } else {
      dateDisplay.textContent = "Geen geldige datum";
    }

    const selectedWeekday = button.getAttribute("data-weekday");
    const scheduleItems = document.querySelectorAll(".schedule-timeline li");

    scheduleItems.forEach((item) => {
      if (item.getAttribute("data-weekday") === selectedWeekday) {
        item.style.display = "flex";
      } else {
        item.style.display = "none";
      }
    });

    const currentPath = window.location.pathname;
    const url = new URL(window.location.origin + currentPath);
    url.searchParams.set("date", selectedDate);
    url.searchParams.set("weekday", selectedWeekday);

    sessionStorage.setItem("scrollY", window.scrollY);
    window.location.href = url.toString();
  });
});
