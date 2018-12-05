import '@babel/polyfill';
import "./css/overlay.less";
//import * as mod from 'main'

function startButtonClick() {
  import('./main').then((mod) => {
    mod.init();
    document.getElementById("overlayNav").style.display = "none";
  });
}

const json = require('./json/test.json');
console.log(json);

window.onload = function () {
  document.getElementById("showNewsButton").onclick = () => { startButtonClick(); }
}