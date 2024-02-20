class RequestError extends Error {
  constructor(message = "Bad Request") {
    super(message);
    this.message = message;
    this.status = 400;
    this.name = "BadRequestError";
  }
}

class NotFoundError extends Error {
  constructor(message = "Not Found") {
    super(message);
    this.message = message;
    this.status = 404;
    this.name = "NotFoundError";
  }
}
module.exports = { RequestError, NotFoundError };
