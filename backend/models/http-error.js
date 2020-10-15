// Class for Http Error
class HttpError extends Error {
    constructor(message, errorCode) {
        super(message);
        this.code = errorCode;
    }
}

// Export Http Error Model
module.exports = HttpError;