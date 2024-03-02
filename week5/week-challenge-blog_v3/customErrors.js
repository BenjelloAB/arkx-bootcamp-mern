class RequestError extends Error {
  constructor(message = "Bad Request") {
    super(message);
    this.status = 400;
    this.name = "BadRequestError";
  }
}

class NotFoundError extends Error {
  constructor(message = "Not Found") {
    super(message);
    this.status = 404;
    this.name = "NotFoundError";
  }
}

class UnauthenticatedError extends Error {
  constructor(message = "Not Authenticated") {
    super(message);
    this.status = 401 ;
    this.name = "UnauthenticatedError";
  }
}
module.exports = { RequestError, NotFoundError, UnauthenticatedError };
