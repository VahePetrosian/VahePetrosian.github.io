class ErrorHandler {
    constructor() {
        this._title = "SINGLETON ERROR HANDLER:";
    }

    showErrorMessage = (message) => {
        console.log(`${this._title} ${message}`);
    }
}
const errorHandler = new ErrorHandler();
Object.freeze(errorHandler);

export default errorHandler;