function storeStringData(element, key) {
  // Convert odd spacings to just spaces
  const string = element.innerHTML
    .replaceAll("&nbsp;", " ")
    .replaceAll("<div>", " ");

  // Strip HTML tags
  const doc = new DOMParser().parseFromString(string, "text/html");

  // Replace multiple spaces to single space
  const content = doc.body.textContent.replace(/\s+/g, " ") || "";

  // Write parsed string into page element
  element.innerHTML = content;

  // Store
  localStorage.setItem(key, content);
}

function downloadImage(base64image) {
  const filename = localStorage
    .getItem("title")
    .toLowerCase()
    .replace(/[^a-zA-Z]+/g, "-") // replace all non word chars with -
    .replace(/^[^\w+]*/g, "") // remove - at start
    .replace(/[^\w]+$/g, ""); // remove - at end

  const element = document.createElement("a");
  element.setAttribute("href", base64image);
  element.setAttribute("download", `dwpmi-${filename}.png`);
  element.style.display = "none";
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

function setTheme(newTheme, themeSelecter) {
  card.setAttribute("data-theme", newTheme);
  themeSelecter.value = newTheme;
  localStorage.setItem("theme", newTheme);
}

export { storeStringData, downloadImage, setTheme };
