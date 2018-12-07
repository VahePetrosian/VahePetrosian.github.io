class ErrorHandler {
    constructor() {
        this._title = "HANDLED ERROR!!!";
    }

    showErrorMessage = (message) => {
        alert(`${this._title}\n${message}`);
    }
}
const errorHandler = new ErrorHandler();
Object.freeze(errorHandler);

export default errorHandler;