"use strict";
import 'whatwg-fetch';
import "./css/newsapi.less";
import { NewsHandler } from "./news";
import { SourcesHandler } from "./sources";

let news = new NewsHandler();
let sources = new SourcesHandler(news);

function CountryViewModel() {
  var self = this;
  self.countrys = ko.observableArray([
      { name: 'Germany', key: 'de' },
      { name: 'France', key: 'fr' },
      { name: 'Great Britain', key: 'gb' },
      { name: 'Russia', key: 'ru' },
      { name: 'Ukraine', key: 'ua' },
      { name: 'USA', key: 'us' }
  ]);
  self.showCountryNews = function() {
      news.ShowHeadlineNewsForCountry(this.key);
  }
}

function CategoryViewModel() {
  var self = this;
  self.categorys = ko.observableArray([
      { name: 'Business', key: 'business' },
      { name: 'Enterment', key: 'enterment' },
      { name: 'General', key: 'general' },
      { name: 'Health', key: 'health' },
      { name: 'Science', key: 'science' },
      { name: 'Sports', key: 'sports' },
      { name: 'Technology', key: 'technology' }
  ]);
  self.showCategoryNews = function() {
      news.ShowHeadlineNewsForCategory(this.key);
  }
}

function initLinksAndButtons() {
  let sourceSearchInput = document.getElementById("sourceSearchInput");
  sourceSearchInput.oninput = () => { sources.RefreshSourcesDiv('name', sourceSearchInput.value); }
  document.getElementById("keywordSearchInput").onkeypress = (e) => { if (e.keyCode == 13) { news.ShowSearchResultNews(); } }
  document.getElementById("keywordSearchButton").onclick = () => { news.ShowSearchResultNews(); }
  document.getElementById("topHeadlinesLink").onclick = () => { news.ShowHeadlineNewsForCountry('gb'); }
}

export function init() {
  news.ShowHeadlineNewsForCountry('gb');
  sources.CreateSourceOptionsDiv();
  sources.LoadAllNewsSources();

  ko.applyBindings(new CategoryViewModel(), document.getElementById('categorysDropDown'));
  ko.applyBindings(new CountryViewModel(), document.getElementById('countrysDropDown'));
  
  initLinksAndButtons();
}

