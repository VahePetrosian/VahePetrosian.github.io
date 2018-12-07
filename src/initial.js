import '@babel/polyfill';
import "./css/overlay.less";
import { ApiRequest } from './request';
//import * as mod from 'main'
//import * as err from 'errorHandler'
//import * as req from 'request'

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
  import('./errorhandler').then((err) => {
    err.default.showErrorMessage(message);
  });
}

const json = require('./json/test.json');
console.log(json);

window.onload = function () {
  import('./request').then((req) => {
    let requestHandler = new ApiRequest();
    let getter = requestHandler.create("get");
    let poster = requestHandler.create("post");
    let deleter = requestHandler.create("delete");
    let putter = requestHandler.create("put");
    getter.say();
    poster.say();
    deleter.say();
    putter.say();
  });
  document.getElementById("showNewsButton").onclick = () => { startButtonClick(); }
  document.getElementById("casueErrorButton").onclick = () => { failingFunction(); }
}

window.addEventListener("error", function(e) {
  if(e.target.localName === "img")
  {
    showError(`Bad url for img: \n${e.target.currentSrc}`);
  }
}, true);
