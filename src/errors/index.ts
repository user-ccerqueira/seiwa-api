export class ApplicationError extends Error {
  public title;
  public message;
  constructor() {
    super();
    this.name = this.constructor.name;
  }
}







