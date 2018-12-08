export class RequestFactory {
  create(type, ...args) {
    let action;
    if (type === 'getNews') {
      action = new GetNewsRequest();
    } else if (type === 'getSources') {
      action = new GetSourcesRequest();
    } else if (type === 'post') {
      action = new PostRequest();
    } else if (type === 'put') {
      action = new PutRequest();
    } else if (type === 'delete') {
      action = new DeleteRequest();
    }
    action.url = 'https://newsapi.org/v2/';
    action.args = args;
    let newsApiKey = 'cf4cb85ba9f447f6aa4c35febe6d5837';
    let requestHeaders = new Headers();
    requestHeaders.append("X-Api-Key", newsApiKey);
    requestHeaders.append("Authorization", newsApiKey);
    action.requestHeader = {
      method: 'GET',
      headers: requestHeaders
    }
    return action;
  }
}

class GetNewsRequest {
  async getData() {
    console.log("FACTORY: get news is used");
    const getArticleRequest = new Request(this.url + this.args[0], this.requestHeader);
    const response = await fetch(getArticleRequest);
    const data = await response.json();
    return data;
  }
}

class GetSourcesRequest {
  async getData() {
    console.log("FACTORY: get sources is used");
    const getSourcesRequest = new Request(this.url + 'sources', this.requestHeader);
    const response = await fetch(getSourcesRequest);
    const data = await response.json();
    return data;
  }
}

class PostRequest {
  constructor() {
    console.log("FACTORY: post is used");
  }
}

class PutRequest {
  constructor() {
    console.log("FACTORY: put is used");
  }
}

class DeleteRequest {
  constructor() {
    console.log("FACTORY: delete is used");
  }
}