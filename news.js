function GetFormattedNewsCard(index, article) {
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

function GetFormattedNewsPageContent(jsonResponse) {
    let htmlResult = '';
    let articles = jsonResponse.articles.entries();
    for (let article of articles) {
        htmlResult += GetFormattedNewsCard(article[0], article[1]);
    }
    return htmlResult;
}

function RefreshNewsPageContent(urlParam) {
    let getArticleRequest = new Request(newsApiUrl + urlParam, GetRequestHeaders());

    fetch(getArticleRequest).then(function (response) {
        return response.json();
    }).then(function (data) {
        let htmlMarkup = GetFormattedNewsPageContent(data);
        let contentDiv = document.getElementById("contentDiv");
        contentDiv.innerHTML = '';
        contentDiv.innerHTML = htmlMarkup;
    });
}

function ShowHeadlineNewsForCountry(country) {
    RefreshNewsPageContent(`top-headlines?country=${country}`);
}

function ShowHeadlineNewsForCategory(category) {
    RefreshNewsPageContent(`top-headlines?country=us&category=${category}`);
}

function ShowSearchResultNews() {
    let searchInput = document.getElementById("keywordSearchInput");
    RefreshNewsPageContent(`everything?q=${searchInput.value}`);
}

function ShowNewsForSource(source) {
    RefreshNewsPageContent(`everything?sources=${source}`);
}