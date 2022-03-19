export class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.status = 404;
  }
}
