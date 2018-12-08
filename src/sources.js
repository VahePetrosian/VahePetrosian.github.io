import { RequestProxy } from "./requestProxy";

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

export class SourcesHandler {
    constructor(newsHandler) {
        this.newsHandler = newsHandler;
        this.languages = new Map([['en', 'English'], ['ar', 'Sami '], ['de', 'Deutsch'], ['es', 'Spanish'], ['fr', 'French'], ['no', 'Norwegian'], ['ru', 'Russian']]);
        this.countrys = new Map([['au', 'Australia'], ['gb', 'United Kingdom'], ['in', 'India'], ['it', 'Italy'], ['za', 'South Africa'], ['se', 'Sweden'], ['no', 'Norway']]);
        this.categorys = new Map([['business', 'Business'], ['entertainment', 'Entertainment'], ['general', 'General'], ['health', 'Health'], ['science', 'Science'], ['sports', 'Sports'], ['technology', 'Technology']]);
    }

    async LoadAllNewsSources() {
        let requestProxy = new RequestProxy();
        let requestHandler = requestProxy("getSources");
        let data = await requestHandler.getData();
        this.sourcesClass = new NewsSources(data.sources);
        this.RefreshSourcesDiv("", "");
    }

    RefreshSourcesDiv(filterType, filterValue) {
        let filteredSources;
        this.sourcesClass.filterValue = filterValue;
        switch (filterType) {
            case 'language':
                filteredSources = this.sourcesClass.sourcesByLanguage;
                break;
            case 'country':
                filteredSources = this.sourcesClass.sourcesByCountry;
                break;
            case 'category':
                filteredSources = this.sourcesClass.sourcesByCategory;
                break;
            case 'name':
                filteredSources = this.sourcesClass.sourcesByName;
                break;
            default:
                filteredSources = this.sourcesClass.allSources;
                break;
        }

        let sourcesDiv = document.getElementById("resultSources");
        sourcesDiv.innerHTML = '';
        filteredSources.forEach((item) => {
            let elem = document.createElement("a");
            elem.appendChild(document.createTextNode(item.name));
            elem.href = "#";
            elem.onclick = () => {
                this.newsHandler.ShowNewsForSource(item.id);
                document.getElementById('modalCloseButton').click();
            }
            sourcesDiv.appendChild(elem);
            sourcesDiv.appendChild(document.createTextNode(" |"));
        });
    }

    CreateSourceOptionDomElement(filterType, value, key) {
        let newElement = document.createElement("div");
        newElement.classList.add("btn");
        newElement.onclick = () => { this.RefreshSourcesDiv(filterType, key); }
        newElement.textContent = value;
        return newElement;
    }

    CreateSourceOptionsRow(filterType, elements) {
        let newRow = document.createElement("div");
        newRow.classList.add("row");
        newRow.classList.add("border-bottom");
        elements.forEach((value, key, array) => { newRow.appendChild(this.CreateSourceOptionDomElement(filterType, value, key)) });
        return newRow;
    }

    CreateSourceOptionsDiv() {
        let sourcesStartupDiv = document.getElementById("sourcesOptions");
        sourcesStartupDiv.appendChild(document.createTextNode("Show for language"));
        sourcesStartupDiv.appendChild(this.CreateSourceOptionsRow('language', this.languages));
        sourcesStartupDiv.appendChild(document.createTextNode("Show for country"));
        sourcesStartupDiv.appendChild(this.CreateSourceOptionsRow('country', this.countrys));
        sourcesStartupDiv.appendChild(document.createTextNode("Show for category"));
        sourcesStartupDiv.appendChild(this.CreateSourceOptionsRow('category', this.categorys));
    }
}