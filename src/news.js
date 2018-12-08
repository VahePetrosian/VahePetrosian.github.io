import { RequestProxy } from "./requestProxy";

export class NewsHandler {
    GetFormattedNewsCard(index, article) {
        let val = `<div class="card">
                      <div class="card-header">Author: ${article.author ? article.author : 'Unknown'}</div>
                      <img class="card-img-top" style="height: 100%; object-fit: cover;" src="${article.urlToImage ? article.urlToImage : ''}" onerror="this.style.display='none'">
                      <div class="card-body">
                        <h5 class="card-title">${article.title ? article.title : 'No title'}</h5>
                        <hr>
                        <p class="card-text">${article.description ? article.description : 'No description'}</p>
                        <a href="${article.url}" target="blank" class="justify-content-end">More details</a>         
                      </div>
                      <p class="card-text"><small class="text-muted">${article.publishedAt}</small></p>
                    </div>`
        return val;
    }

    GetFormattedNewsPageContent(jsonResponse) {
        let htmlResult = '';
        let articles = jsonResponse.articles.entries();
        for (let article of articles) {
            htmlResult += this.GetFormattedNewsCard(article[0], article[1]);
        }
        return htmlResult;
    }

    async RefreshNewsPageContent(urlParam) {
        let requestProxy = new RequestProxy();
        let requestHandler = requestProxy("getNews", urlParam);
        let data = await requestHandler.getData();
        let htmlMarkup = this.GetFormattedNewsPageContent(data);
        let contentDiv = document.getElementById("contentDiv");
        contentDiv.innerHTML = '';
        contentDiv.innerHTML = htmlMarkup;
    }

    ShowHeadlineNewsForCountry(country) {
        this.RefreshNewsPageContent(`top-headlines?country=${country}`);
    }

    ShowHeadlineNewsForCategory(category) {
        this.RefreshNewsPageContent(`top-headlines?country=us&category=${category}`);
    }

    ShowSearchResultNews() {
        let searchInput = document.getElementById("keywordSearchInput");
        this.RefreshNewsPageContent(`everything?q=${searchInput.value}`);
    }

    ShowNewsForSource(source) {
        this.RefreshNewsPageContent(`everything?sources=${source}`);
    }
}