"use strict";

function GetFormattedNewsCard(index, article) {
  var val = "<div class=\"card\">\n                  <div class=\"card-header\">Author: ".concat(article.author ? article.author : 'Unknown', "</div>\n                  <img class=\"card-img-top\" style=\"height: 100%; object-fit: cover;\" src=\"").concat(article.urlToImage ? article.urlToImage : '', "\" onerror=\"this.style.display='none'\">\n                  <div class=\"card-body\">\n                    <h5 class=\"card-title\">").concat(article.title ? article.title : 'No title', "</h5>\n                    <hr>\n                    <p class=\"card-text\">").concat(article.description ? article.description : 'No description', "</p>\n                    <a href=\"").concat(article.url, "\" target=\"blank\" class=\"justify-content-end\">More details</a>         \n                  </div>\n                  <p class=\"card-text\"><small class=\"text-muted\">").concat(article.publishedAt, "</small></p>\n                </div>");
  return val;
}

function GetFormattedNewsPageContent(jsonResponse) {
  var htmlResult = '';
  var articles = jsonResponse.articles.entries();
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = articles[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var article = _step.value;
      htmlResult += GetFormattedNewsCard(article[0], article[1]);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return htmlResult;
}

function RefreshNewsPageContent(urlParam) {
  var getArticleRequest = new Request(newsApiUrl + urlParam, GetRequestHeaders());
  window.fetch(getArticleRequest).then(function (response) {
    return response.json();
  }).then(function (data) {
    var htmlMarkup = GetFormattedNewsPageContent(data);
    var contentDiv = document.getElementById("contentDiv");
    contentDiv.innerHTML = '';
    contentDiv.innerHTML = htmlMarkup;
  });
}

function ShowHeadlineNewsForCountry(country) {
  RefreshNewsPageContent("top-headlines?country=".concat(country));
}

function ShowHeadlineNewsForCategory(category) {
  RefreshNewsPageContent("top-headlines?country=us&category=".concat(category));
}

function ShowSearchResultNews() {
  var searchInput = document.getElementById("keywordSearchInput");
  RefreshNewsPageContent("everything?q=".concat(searchInput.value));
}

function ShowNewsForSource(source) {
  RefreshNewsPageContent("everything?sources=".concat(source));
}