export class ApiRequest {
  create(type) {
    let action;
    if (type === 'get') {
      action = new GetRequest();
    } else if (type === 'post') {
      action = new PostRequest();
    } else if (type === 'put') {
      action = new PutRequest();
    } else if (type === 'delete') {
      action = new DeleteRequest();
    }
    action.type = type;
    action.say = function () {
      console.log(`${this.type}: name ${this.rate}`)
    }
    return action;
  }
}

class GetRequest {
  constructor() {
    this.rate = 'I am get';
  }
}

class PostRequest {
  constructor() {
    this.rate = 'I am post';
  }
}

class PutRequest {
  constructor() {
    this.rate = 'I am put';
  }
}

class DeleteRequest {
  constructor() {
    this.rate = 'I am delete';
  }
}