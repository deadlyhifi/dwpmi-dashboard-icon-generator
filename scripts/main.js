import html2canvas from "html2canvas";
import {
  storeStringData,
  generateTitle,
  downloadImage,
  setTheme,
} from "./utils";

const card = document.getElementById("card");
const titleText = document.getElementById("title-text");
const subtitleText = document.getElementById("subtitle-text");
const subtitleButton = document.getElementById("subtitle-button");
const captureButton = document.getElementById("capture-button");
const themeSelecter = document.getElementById("theme");
const theme = localStorage.getItem("theme") || "standard";
const subtitleDisplayState = () => {
  const state = localStorage.getItem("subtitle-show");
  return state === null || state === "true";
};

// Set initial values
titleText.innerHTML = localStorage.getItem("title") || "Click to edit title";
subtitleText.innerHTML =
  localStorage.getItem("subtitle") || "Click to edit subtitle";

if (!subtitleDisplayState()) {
  subtitleText.classList.add("hide");
}

// Store title values
titleText.addEventListener("focusout", () =>
  storeStringData(titleText, "title")
);
subtitleText.addEventListener("focusout", () =>
  storeStringData(subtitleText, "subtitle")
);

// Toggle subtitle display
subtitleButton.setAttribute("aria-pressed", subtitleDisplayState());
subtitleButton.addEventListener("click", () => {
  subtitleText.classList.toggle("hide");

  const toggleState = !subtitleDisplayState();

  localStorage.setItem("subtitle-show", toggleState);
  subtitleButton.setAttribute("aria-pressed", toggleState);
});

// Theme Select
setTheme(theme, themeSelecter);
themeSelecter.addEventListener("change", () =>
  setTheme(themeSelecter.value, themeSelecter)
);

// Download image
captureButton.addEventListener("click", () => {
  html2canvas(card).then((canvas) => {
    const base64image = canvas.toDataURL("image/png");
    downloadImage(base64image, generateTitle());
  });
});
