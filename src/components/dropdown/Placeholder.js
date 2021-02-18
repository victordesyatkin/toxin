class Placeholder {
  constructor(inputs) {
    this._inputs = inputs;
  }

  _inputs = {};

  /* eslint-disable */
  _toString() {
    return '';
  }
  /* eslint-enable */
}

export default Placeholder;
