const baseURL = "https://www.thecolorapi.com/scheme";
const colorSchemeElement = document.getElementById("color-scheme");
let colorArray = [];
let copyText = "";
function returnColors(url) {
  //Get colors from the Color API.
  //Parameters: format (JSON), mode (user selected from form)
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      buildColorHTML(data.colors);
    });
}

function buildColorHTML(colors) {
  let colorHtml = "";
  //set the inner html of colorSchemeElement to five divs that each contain a color and the hex code of that color
  for (let color of colors) {
    colorHtml += `
    <div class="color-container">
    <div class="color" style="background-color:${color.hex.value};"></div>
    <p class="color-code">${color.hex.value}</p>
    </div>
    `;
    colorSchemeElement.innerHTML = colorHtml;
  }
}

document.getElementById("pick-color-scheme").addEventListener("submit", (e) => {
  e.preventDefault();
  let seedColor = document.getElementById("seed-color").value;
  const returnMode = document.getElementById("select-scheme").value;
  seedColor = seedColor.replace("#", "");
  const url = baseURL + `?hex=${seedColor}&mode=${returnMode}`;

  returnColors(url);
});
