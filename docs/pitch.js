(() => {
  "use strict";

  const slides = [...document.querySelectorAll(".slide")].sort((a, b) => {
    const aOrder = a.dataset.lang === "en" ? 0 : 1;
    const bOrder = b.dataset.lang === "en" ? 0 : 1;
    return aOrder - bOrder;
  });
  const prevButton = document.querySelector("#prevButton");
  const nextButton = document.querySelector("#nextButton");
  const fullscreenButton = document.querySelector("#fullscreenButton");
  const dots = document.querySelector("#dots");
  const pageStatus = document.querySelector("#pageStatus");
  const progressBar = document.querySelector("#progressBar");
  let currentIndex = 0;
  let touchStartX = 0;
  let touchStartY = 0;

  const pad = (number) => String(number).padStart(2, "0");
  const hashIndex = () => {
    const value = Number.parseInt(location.hash.replace("#", ""), 10);
    return Number.isInteger(value) && value >= 1 && value <= slides.length ? value - 1 : 0;
  };

  const dotButtons = slides.map((slide, index) => {
    const button = document.createElement("button");
    button.className = "dot-button";
    button.type = "button";
    button.setAttribute(
      "aria-label",
      slide.dataset.lang === "en"
        ? `Go to slide ${index + 1}: ${slide.dataset.title}`
        : `前往第 ${index + 1} 頁：${slide.dataset.title}`
    );
    button.addEventListener("click", () => showSlide(index));
    dots.append(button);
    return button;
  });

  function showSlide(index, updateHash = true) {
    currentIndex = Math.max(0, Math.min(index, slides.length - 1));

    slides.forEach((slide, slideIndex) => {
      const isActive = slideIndex === currentIndex;
      slide.classList.toggle("is-active", isActive);
      slide.dataset.state = slideIndex < currentIndex ? "past" : slideIndex > currentIndex ? "future" : "active";
      slide.setAttribute("aria-hidden", String(!isActive));
      slide.inert = !isActive;
      if (isActive) slide.scrollTop = 0;
    });

    dotButtons.forEach((button, buttonIndex) => {
      if (buttonIndex === currentIndex) button.setAttribute("aria-current", "true");
      else button.removeAttribute("aria-current");
    });

    const slide = slides[currentIndex];
    const isEnglish = slide.dataset.lang === "en";
    prevButton.disabled = currentIndex === 0;
    nextButton.disabled = currentIndex === slides.length - 1;
    prevButton.querySelector("span").textContent = isEnglish ? "Previous" : "上一頁";
    nextButton.querySelector("span").textContent = currentIndex === slides.length - 1
      ? (isEnglish ? "End" : "結束")
      : (isEnglish ? "Next" : "下一頁");
    prevButton.setAttribute("aria-label", isEnglish ? "Previous slide" : "上一頁");
    nextButton.setAttribute(
      "aria-label",
      currentIndex === slides.length - 1
        ? (isEnglish ? "End presentation" : "結束簡報")
        : (isEnglish ? "Next slide" : "下一頁")
    );
    const fullscreenActive = Boolean(document.fullscreenElement);
    const fullscreenLabel = isEnglish
      ? (fullscreenActive ? "Exit fullscreen" : "Enter fullscreen")
      : (fullscreenActive ? "離開全螢幕" : "切換全螢幕");
    fullscreenButton.setAttribute("aria-label", fullscreenLabel);
    fullscreenButton.title = fullscreenLabel;
    pageStatus.textContent = `${pad(currentIndex + 1)} / ${pad(slides.length)} · ${slide.dataset.title}`;
    progressBar.style.width = `${((currentIndex + 1) / slides.length) * 100}%`;
    document.title = `${pad(currentIndex + 1)}｜${slide.dataset.title}｜Legacy ERP → AI`;

    if (updateHash && location.hash !== `#${currentIndex + 1}`) {
      history.replaceState(null, "", `#${currentIndex + 1}`);
    }
  }

  const next = () => showSlide(currentIndex + 1);
  const previous = () => showSlide(currentIndex - 1);

  prevButton.addEventListener("click", previous);
  nextButton.addEventListener("click", next);

  document.addEventListener("keydown", (event) => {
    const target = event.target;
    const isEditable = target instanceof HTMLElement && (
      target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)
    );
    if (isEditable) return;

    if (["ArrowRight", "ArrowDown", "PageDown"].includes(event.key)) {
      event.preventDefault();
      next();
    } else if (["ArrowLeft", "ArrowUp", "PageUp"].includes(event.key)) {
      event.preventDefault();
      previous();
    } else if (event.key === " " && !(target instanceof HTMLButtonElement || target instanceof HTMLAnchorElement)) {
      event.preventDefault();
      next();
    } else if (event.key === "Home") {
      event.preventDefault();
      showSlide(0);
    } else if (event.key === "End") {
      event.preventDefault();
      showSlide(slides.length - 1);
    }
  });

  window.addEventListener("hashchange", () => showSlide(hashIndex(), false));

  document.addEventListener("touchstart", (event) => {
    touchStartX = event.changedTouches[0].clientX;
    touchStartY = event.changedTouches[0].clientY;
  }, { passive: true });

  document.addEventListener("touchend", (event) => {
    const deltaX = event.changedTouches[0].clientX - touchStartX;
    const deltaY = event.changedTouches[0].clientY - touchStartY;
    if (Math.abs(deltaX) < 50 || Math.abs(deltaX) < Math.abs(deltaY)) return;
    if (deltaX < 0) next();
    else previous();
  }, { passive: true });

  fullscreenButton.addEventListener("click", async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await document.documentElement.requestFullscreen();
    } catch {
      fullscreenButton.title = slides[currentIndex].dataset.lang === "en"
        ? "Fullscreen was blocked by the browser. You can still press F11."
        : "瀏覽器未允許全螢幕，仍可按 F11";
    }
  });

  document.addEventListener("fullscreenchange", () => {
    const active = Boolean(document.fullscreenElement);
    const isEnglish = slides[currentIndex].dataset.lang === "en";
    const label = isEnglish
      ? (active ? "Exit fullscreen" : "Enter fullscreen")
      : (active ? "離開全螢幕" : "切換全螢幕");
    fullscreenButton.setAttribute("aria-label", label);
    fullscreenButton.title = label;
  });

  document.body.classList.add("initial-render");
  showSlide(hashIndex(), false);
  requestAnimationFrame(() => document.body.classList.remove("initial-render"));
})();
