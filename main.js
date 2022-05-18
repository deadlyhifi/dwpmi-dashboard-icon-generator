import html2canvas from "html2canvas";

function storeData(element, key) {
  const doc = new DOMParser().parseFromString(element.innerHTML, 'text/html');
  const content = doc.body.textContent || "";

  element.innerHTML = content;
  localStorage.setItem(key, content);
}

const titleText = document.getElementById("title-text");
const subtitleText = document.getElementById("subtitle-text");
const subtitleButton = document.getElementById("subtitle-button");
const captureButton = document.getElementById("capture-button");

const subtitleDisplayState = localStorage.getItem("subtitle-show");

// Set initial values
titleText.innerHTML = localStorage.getItem("title") || "Click to edit title";
subtitleText.innerHTML = localStorage.getItem("subtitle") || "Click to edit subtitle";
if (subtitleDisplayState === "hide") {
  subtitleText.classList.add("hide");
}

// Store values
titleText.addEventListener("focusout", () => storeData(titleText, "title"));
subtitleText.addEventListener("focusout", () => storeData(subtitleText, "subtitle"));

// Toggle subtitle
subtitleButton.addEventListener("click", () => {
  subtitleText.classList.toggle("hide");

  const newState = localStorage.getItem("subtitle-show") === "hide" ? "show" : "hide";
  localStorage.setItem("subtitle-show", newState);
});

// TODO - don't show download button until it's ready.
// NO - turn the Convert to Image button into the download.
captureButton.addEventListener('click', () => {
  const screenshotTarget = document.getElementById("capture");
  
  html2canvas(screenshotTarget).then((canvas) => {
      const base64image = canvas.toDataURL("image/png");
      const result = document.getElementById("result");

      result.setAttribute("href", base64image);
  });
})