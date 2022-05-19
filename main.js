import html2canvas from "html2canvas";

function storeData(element, key) {
  // Convert odd spacings to just spaces
  const string = element.innerHTML
    .replaceAll('&nbsp;', ' ')
    .replaceAll('<div>', ' ');

  // Strip HTML tags
  const doc = new DOMParser().parseFromString(string, 'text/html');

  // Replace multiple spaces to single space
  const content = doc.body.textContent.replace(/\s+/g, ' ') || "";

  // Write parsed string into page element
  element.innerHTML = content;

  // Store
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

function download(base64image) {
  const filename = localStorage.getItem("title")
    .toLowerCase()
    .replace(/[^a-zA-Z]+/g, '-') // replace all non word chars with -
    .replace(/^[^\w+]*/g, '') // remove - at start
    .replace(/[^\w]+$/g, ''); // remove - at end

  const element = document.createElement('a');
  element.setAttribute("href", base64image);
  element.setAttribute("download", `dwpmi-${filename}.png`);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

// Download image
captureButton.addEventListener('click', () => {
  const screenshotTarget = document.getElementById("capture");
  
  html2canvas(screenshotTarget).then((canvas) => {
      const base64image = canvas.toDataURL("image/png");
      download(base64image);
  });
})