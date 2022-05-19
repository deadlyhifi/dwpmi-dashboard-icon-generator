import html2canvas from "html2canvas";
import { storeStringData, downloadImage, setTheme } from "./utils";

const card = document.getElementById("card");
const titleText = document.getElementById("title-text");
const subtitleText = document.getElementById("subtitle-text");
const subtitleButton = document.getElementById("subtitle-button");
const captureButton = document.getElementById("capture-button");
const subtitleDisplayState = localStorage.getItem("subtitle-show");
const themeSelecter = document.getElementById("theme");
const theme = localStorage.getItem("theme") || "standard";

// Set initial values
titleText.innerHTML = localStorage.getItem("title") || "Click to edit title";
subtitleText.innerHTML =
  localStorage.getItem("subtitle") || "Click to edit subtitle";

if (subtitleDisplayState === "hide") {
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
subtitleButton.addEventListener("click", () => {
  subtitleText.classList.toggle("hide");

  const newState =
    localStorage.getItem("subtitle-show") === "hide" ? "show" : "hide";
  localStorage.setItem("subtitle-show", newState);
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
    downloadImage(base64image);
  });
});
