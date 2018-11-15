let sourcesClass;
let languages = new Map([['en', 'English'], ['ar', 'Sami '], ['de', 'Deutsch'], ['es', 'Spanish'], ['fr', 'French'], ['no', 'Norwegian'], ['ru', 'Russian']]);
let countrys = new Map([['au', 'Australia'], ['gb', 'United Kingdom'], ['in', 'India'], ['it', 'Italy'], ['za', 'South Africa'], ['se', 'Sweden'], ['no', 'Norway']]);
let categorys = new Map([['business', 'Business'], ['entertainment', 'Entertainment'], ['general', 'General'], ['health', 'Health'], ['science', 'Science'], ['sports', 'Sports'], ['technology', 'Technology']]);

class NewsSources {
    constructor(sources) {
        this.sourcesSet = new Set(sources);
    }
    get allSources() {
        return this.sourcesSet;
    }
    get sourcesByLanguage() {
        return new Set([...this.sourcesSet].filter(x => x.language === this.filterValue));
    }
    get sourcesByCountry() {
        return new Set([...this.sourcesSet].filter(x => x.country === this.filterValue));
    }
    get sourcesByName() {
        return new Set([...this.sourcesSet].filter(x => x.name.includes(this.filterValue)));
    }
    get sourcesByCategory() {
        return new Set([...this.sourcesSet].filter(x => x.category === this.filterValue));
    }
}

function LoadAllNewsSources() {
    let getSourcesRequest = new Request(newsApiUrl + 'sources', GetRequestHeaders());
    fetch(getSourcesRequest).then(function (response) {
        return response.json();
    }).then(function (data) {
        sourcesClass = new NewsSources(data.sources);
        RefreshSourcesDiv();
    });
}

function RefreshSourcesDiv(filterType, filterValue) {
    let filteredSources;
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

    let sourcesDiv = document.getElementById("resultSources");
    sourcesDiv.innerHTML = '';
    filteredSources.forEach((item) => {
        let elem = document.createElement("a");
        elem.appendChild(document.createTextNode(item.name));
        elem.href = "#";
        elem.onclick = () => {
            ShowNewsForSource(item.id);
            document.getElementById('modalCloseButton').click();
        }
        sourcesDiv.appendChild(elem);
        sourcesDiv.appendChild(document.createTextNode(" |"));
    });
}

function CreateSourceOptionDomElement(filterType, value, key) {
    let newElement = document.createElement("div");
    newElement.classList.add("btn");
    newElement.onclick = () => { RefreshSourcesDiv(filterType, key); }
    newElement.textContent = value;
    return newElement;
}

function CreateSourceOptionsRow(filterType, elements) {
    let newRow = document.createElement("div");
    newRow.classList.add("row");
    newRow.classList.add("border-bottom");
    elements.forEach((value, key, array) => { newRow.appendChild(CreateSourceOptionDomElement(filterType, value, key)) });
    return newRow;
}

function CreateSourceOptionsDiv() {
    let sourcesStartupDiv = document.getElementById("sourcesOptions");
    sourcesStartupDiv.appendChild(document.createTextNode("Show for language"));
    sourcesStartupDiv.appendChild(CreateSourceOptionsRow('language', languages));
    sourcesStartupDiv.appendChild(document.createTextNode("Show for country"));
    sourcesStartupDiv.appendChild(CreateSourceOptionsRow('country', countrys));
    sourcesStartupDiv.appendChild(document.createTextNode("Show for category"));
    sourcesStartupDiv.appendChild(CreateSourceOptionsRow('category', categorys));
}