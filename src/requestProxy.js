import { RequestFactory } from "./requestFactory";

export class RequestProxy {
    constructor() {
        let proxy;
        let requestFactory = new RequestFactory();
        proxy = new Proxy(requestFactory.create, {
            apply: function(target, thisArg, argumentsList) {
                console.log(`PROXY: RequestFactory was used with following parameters: ${argumentsList}`);
                return target.apply(thisArg, argumentsList);
              } 
        });
        return proxy;
    } 
}