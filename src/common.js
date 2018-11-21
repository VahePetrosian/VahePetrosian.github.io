"use strict";

import '@babel/polyfill';
import 'whatwg-fetch';

const newsApiKey = 'cf4cb85ba9f447f6aa4c35febe6d5837';
const newsApiUrl = 'https://newsapi.org/v2/';

function GetRequestHeaders() {
  let requestHeaders = new Headers();
  requestHeaders.append("X-Api-Key", newsApiKey);
  requestHeaders.append("Authorization", newsApiKey);

  let requestParametrs = {
    method: 'GET',
    headers: requestHeaders
  }
  return requestParametrs;
}

global.ShowStartupNews = function () {
  ShowHeadlineNewsForCountry('gb');
}

window.onload = function () {
  ShowStartupNews();
  CreateSourceOptionsDiv();
  LoadAllNewsSources();
}