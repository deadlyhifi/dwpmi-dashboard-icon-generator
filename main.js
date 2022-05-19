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


function download(base64image) {
  var element = document.createElement('a');
  element.setAttribute("href", base64image);
  element.setAttribute("download", "dashboard-icon.png");
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

captureButton.addEventListener('click', () => {
  const screenshotTarget = document.getElementById("capture");
  
  html2canvas(screenshotTarget).then((canvas) => {
      const base64image = canvas.toDataURL("image/png");
      download(base64image);
  });
})