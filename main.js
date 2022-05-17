function storeData(element, key) {
  const doc = new DOMParser().parseFromString(element.innerHTML, 'text/html');
  const content = doc.body.textContent || "";

  element.innerHTML = content;
  localStorage.setItem(key, content);
}

const titleText = document.getElementById("title-text");
const subtitleText = document.getElementById("subtitle-text");
const subtitleButton = document.getElementById("subtitle-button");
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