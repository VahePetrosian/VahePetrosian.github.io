import '@babel/polyfill';
import "./css/overlay.less";

window.onload = function () {
  document.getElementById("showNewsButton").onclick = () => { startButtonClick(); }
  document.getElementById("casueErrorButton").onclick = () => { failingFunction(); }
}

window.addEventListener("error", function (e) {
  if (e.target.localName === "img") {
    showError(`Bad url for img: \n${e.target.currentSrc}`);
  }
}, true);

//Lazy loading test
async function startButtonClick() {
  const main = await import('./init');
  main.init();
    document.getElementById("overlayNav").style.display = "none";
}

//Error handler test
function failingFunction() {
  try {
    throw Error('error');
  }
  catch (error) {
    showError(error);
  }
}

async function showError(message) {
  const errorHandler = await import('./errorhandler');
  errorHandler.default.showErrorMessage(message);
}

//JSON loader test
const json = require('./json/test.json');
console.log(json);