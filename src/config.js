export class Config {
  static getValue(name) {
    return process.env['REACT_APP_' + name];
  }
}