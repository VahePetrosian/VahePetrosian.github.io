
import "./css/overlay.less";
//import * as mod from 'main'

function startButtonClick() {
  import('./main').then((mod) => {
    mod.init();
    document.getElementById("overlayNav").style.display = "none";
  });
}

window.onload = function () {
  document.getElementById("showNewsButton").onclick = () => { startButtonClick(); }
}