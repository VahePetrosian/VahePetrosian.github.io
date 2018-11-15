"use strict";

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

function ShowStartupNews() {
  ShowHeadlineNewsForCountry('gb');
}

function SetupPage() {
  ShowStartupNews();
  CreateSourceOptionsDiv();
  LoadAllNewsSources();
}