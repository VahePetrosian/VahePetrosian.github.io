import '@babel/polyfill';
import "./css/overlay.less";
//import * as mod from 'main'
//import * as err from 'errorHandler'

function startButtonClick() {
  import('./main').then((mod) => {
    mod.init();
    document.getElementById("overlayNav").style.display = "none";
  });
}

function failingFunction() {
  try{
    throw Error('error');
  }
  catch (error) {
    showError(error);
  }
}

function showError (message)
{
  import('./errorHandler').then((err) => {
    err.default.showErrorMessage(message);
  });
}

const json = require('./json/test.json');
console.log(json);

window.onload = function () {
  document.getElementById("showNewsButton").onclick = () => { startButtonClick(); }
  document.getElementById("casueErrorButton").onclick = () => { failingFunction(); }
}

window.addEventListener("error", function(e) {
  if(e.target.localName === "img")
  {
    showError(`Bad url for img: \n${e.target.currentSrc}`);
  }
}, true);
