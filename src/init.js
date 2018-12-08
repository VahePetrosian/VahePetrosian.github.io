"use strict";
import 'whatwg-fetch';
import "./css/newsapi.less";
import { NewsHandler } from "./news";
import { SourcesHandler } from "./sources";

let news = new NewsHandler();
let sources = new SourcesHandler(news);

function initLinksAndButtons() {
  let sourceSearchInput = document.getElementById("sourceSearchInput");
  sourceSearchInput.oninput = () => { sources.RefreshSourcesDiv('name', sourceSearchInput.value); }
  document.getElementById("keywordSearchInput").onkeypress = (e) => { if (e.keyCode == 13) { news.ShowSearchResultNews(); } }

  document.getElementById("keywordSearchButton").onclick = () => { news.ShowSearchResultNews(); }

  document.getElementById("topHeadlinesLink").onclick = () => { news.ShowHeadlineNewsForCountry('gb'); }

  document.getElementById("headlineCountryDeLink").onclick = () => { news.ShowHeadlineNewsForCountry('de'); }
  document.getElementById("headlineCountryFrLink").onclick = () => { news.ShowHeadlineNewsForCountry('fr'); }
  document.getElementById("headlineCountryGbLink").onclick = () => { news.ShowHeadlineNewsForCountry('gb'); }
  document.getElementById("headlineCountryRuLink").onclick = () => { news.ShowHeadlineNewsForCountry('ru'); }
  document.getElementById("headlineCountryUaLink").onclick = () => { news.ShowHeadlineNewsForCountry('ua'); }
  document.getElementById("headlineCountryUsLink").onclick = () => { news.ShowHeadlineNewsForCountry('us'); }

  document.getElementById("headlineCategoryBusinessLink").onclick = () => news.ShowHeadlineNewsForCategory('business');
  document.getElementById("headlineCategoryEntermentLink").onclick = () => news.ShowHeadlineNewsForCategory('enterment');
  document.getElementById("headlineCategoryGeneralLink").onclick = () => news.ShowHeadlineNewsForCategory('general');
  document.getElementById("headlineCategoryHealthLink").onclick = () => news.ShowHeadlineNewsForCategory('health');
  document.getElementById("headlineCategoryScienceLink").onclick = () => news.ShowHeadlineNewsForCategory('science');
  document.getElementById("headlineCategorySportsLink").onclick = () => news.ShowHeadlineNewsForCategory('sports');
  document.getElementById("headlineCategoryTechnologyLink").onclick = () => news.ShowHeadlineNewsForCategory('technology');
}

export function init() {
  news.ShowHeadlineNewsForCountry('gb');
  sources.CreateSourceOptionsDiv();
  sources.LoadAllNewsSources();
  initLinksAndButtons();
}

