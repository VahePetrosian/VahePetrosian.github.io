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
function startButtonClick() {
  import('./init').then((init) => {
    init.init();
    document.getElementById("overlayNav").style.display = "none";
  });
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

function showError(message) {
  import('./errorhandler').then((err) => {
    err.default.showErrorMessage(message);
  });
}

//JSON loader test
const json = require('./json/test.json');
console.log(json);