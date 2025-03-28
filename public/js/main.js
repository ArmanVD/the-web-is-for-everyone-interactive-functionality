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

      if (typeof vantaEffect !== "undefined") {
        const target = hexToRgb(cssVar);
        const current = hexToRgb(`#${vantaEffect.options.color.toString(16).padStart(6, "0")}`);

        gsap.to(current, {
          ...target,
          duration: 0.5,
          ease: "power1.inOut",
          onUpdate: function () {
            vantaEffect.setOptions({ color: rgbToHex(current) });
          },
        });
      }
    }
  });

  card.addEventListener("mouseleave", () => {
    const mediahuisColor = getComputedStyle(root).getPropertyValue("--mediahuis");
    root.style.setProperty("--activehovercolor", mediahuisColor);

    if (typeof vantaEffect !== "undefined") {
      const target = hexToRgb(mediahuisColor);
      const current = hexToRgb(`#${vantaEffect.options.color.toString(16).padStart(6, "0")}`);

      gsap.to(current, {
        ...target,
        duration: 0.5,
        ease: "power1.inOut",
        onUpdate: function () {
          vantaEffect.setOptions({ color: rgbToHex(current) });
        },
      });
    }
  });
});

const wave = document.querySelector(".wave-svg svg");

if (wave) {
  gsap.to(wave, {
    yPercent: 5,
    duration: 2,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true,
  });
}

const wavePath = document.querySelector("#wavePath");

if (wavePath) {
  const originalPath = wavePath.getAttribute("d");

  gsap.fromTo(
    wavePath,
    { attr: { d: originalPath } },
    {
      attr: {
        d: "M0 0L32 45C96 97 160 201 224 235C288 270 352 235 416 235C480 235 544 270 608 287C672 304 736 304 800 287C864 270 928 235 992 192C1056 149 1120 97 1184 106C1248 114 1312 184 1376 235C1440 287 1504 322 1568 304C1632 287 1696 218 1728 184L1760 149V414H1728C1696 414 1632 414 1568 414C1504 414 1440 414 1376 414C1312 414 1248 414 1184 414C1120 414 1056 414 992 414C928 414 864 414 800 414C736 414 672 414 608 414C544 414 480 414 416 414C352 414 288 414 224 414C160 414 96 414 64 414H0V0Z",
      },
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    }
  );
}
