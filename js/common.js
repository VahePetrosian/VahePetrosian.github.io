"use strict";

require("promise-polyfill/src/polyfill");

require("whatwg-fetch");

var newsApiKey = 'cf4cb85ba9f447f6aa4c35febe6d5837';
var newsApiUrl = 'https://newsapi.org/v2/';

function GetRequestHeaders() {
  var requestHeaders = new Headers();
  requestHeaders.append("X-Api-Key", newsApiKey);
  requestHeaders.append("Authorization", newsApiKey);
  var requestParametrs = {
    method: 'GET',
    headers: requestHeaders
  };
  return requestParametrs;
}

function ShowStartupNews() {
  ShowHeadlineNewsForCountry('gb');
}

function SetupPage() {
  ShowStartupNews();
  CreateSourceOptionsDiv();
  LoadAllNewsSources();
}