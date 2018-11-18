"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var sourcesClass;
var languages = new Map([['en', 'English'], ['ar', 'Sami '], ['de', 'Deutsch'], ['es', 'Spanish'], ['fr', 'French'], ['no', 'Norwegian'], ['ru', 'Russian']]);
var countrys = new Map([['au', 'Australia'], ['gb', 'United Kingdom'], ['in', 'India'], ['it', 'Italy'], ['za', 'South Africa'], ['se', 'Sweden'], ['no', 'Norway']]);
var categorys = new Map([['business', 'Business'], ['entertainment', 'Entertainment'], ['general', 'General'], ['health', 'Health'], ['science', 'Science'], ['sports', 'Sports'], ['technology', 'Technology']]);

var NewsSources =
/*#__PURE__*/
function () {
  function NewsSources(sources) {
    _classCallCheck(this, NewsSources);

    this.sourcesSet = new Set(sources);
  }

  _createClass(NewsSources, [{
    key: "allSources",
    get: function get() {
      return this.sourcesSet;
    }
  }, {
    key: "sourcesByLanguage",
    get: function get() {
      var _this = this;

      return new Set(_toConsumableArray(this.sourcesSet).filter(function (x) {
        return x.language === _this.filterValue;
      }));
    }
  }, {
    key: "sourcesByCountry",
    get: function get() {
      var _this2 = this;

      return new Set(_toConsumableArray(this.sourcesSet).filter(function (x) {
        return x.country === _this2.filterValue;
      }));
    }
  }, {
    key: "sourcesByName",
    get: function get() {
      var _this3 = this;

      return new Set(_toConsumableArray(this.sourcesSet).filter(function (x) {
        return x.name.includes(_this3.filterValue);
      }));
    }
  }, {
    key: "sourcesByCategory",
    get: function get() {
      var _this4 = this;

      return new Set(_toConsumableArray(this.sourcesSet).filter(function (x) {
        return x.category === _this4.filterValue;
      }));
    }
  }]);

  return NewsSources;
}();

function LoadAllNewsSources() {
  var getSourcesRequest = new Request(newsApiUrl + 'sources', GetRequestHeaders());
  fetch(getSourcesRequest).then(function (response) {
    return response.json();
  }).then(function (data) {
    sourcesClass = new NewsSources(data.sources);
    RefreshSourcesDiv();
  });
}

function RefreshSourcesDiv(filterType, filterValue) {
  var filteredSources;
  sourcesClass.filterValue = filterValue;

  switch (filterType) {
    case 'language':
      filteredSources = sourcesClass.sourcesByLanguage;
      break;

    case 'country':
      filteredSources = sourcesClass.sourcesByCountry;
      break;

    case 'category':
      filteredSources = sourcesClass.sourcesByCategory;
      break;

    case 'name':
      filteredSources = sourcesClass.sourcesByName;
      break;

    default:
      filteredSources = sourcesClass.allSources;
      break;
  }

  var sourcesDiv = document.getElementById("resultSources");
  sourcesDiv.innerHTML = '';
  filteredSources.forEach(function (item) {
    var elem = document.createElement("a");
    elem.appendChild(document.createTextNode(item.name));
    elem.href = "#";

    elem.onclick = function () {
      ShowNewsForSource(item.id);
      document.getElementById('modalCloseButton').click();
    };

    sourcesDiv.appendChild(elem);
    sourcesDiv.appendChild(document.createTextNode(" |"));
  });
}

function CreateSourceOptionDomElement(filterType, value, key) {
  var newElement = document.createElement("div");
  newElement.classList.add("btn");

  newElement.onclick = function () {
    RefreshSourcesDiv(filterType, key);
  };

  newElement.textContent = value;
  return newElement;
}

function CreateSourceOptionsRow(filterType, elements) {
  var newRow = document.createElement("div");
  newRow.classList.add("row");
  newRow.classList.add("border-bottom");
  elements.forEach(function (value, key, array) {
    newRow.appendChild(CreateSourceOptionDomElement(filterType, value, key));
  });
  return newRow;
}

function CreateSourceOptionsDiv() {
  var sourcesStartupDiv = document.getElementById("sourcesOptions");
  sourcesStartupDiv.appendChild(document.createTextNode("Show for language"));
  sourcesStartupDiv.appendChild(CreateSourceOptionsRow('language', languages));
  sourcesStartupDiv.appendChild(document.createTextNode("Show for country"));
  sourcesStartupDiv.appendChild(CreateSourceOptionsRow('country', countrys));
  sourcesStartupDiv.appendChild(document.createTextNode("Show for category"));
  sourcesStartupDiv.appendChild(CreateSourceOptionsRow('category', categorys));
}