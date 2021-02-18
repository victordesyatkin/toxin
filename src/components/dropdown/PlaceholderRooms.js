import bind from 'bind-decorator';

import { wordForm } from '../../helpers/utils';
import Placeholder from './Placeholder';

class PlaceholderRooms extends Placeholder {
  placeholder = '';

  separator = '';

  constructor(props) {
    super(props);
    this._init();
  }

  _init() {
    this._words = {
      спальни: ['спальня', 'спальни', 'спален'],
      кровати: ['кровать', 'кровати', 'кроватей'],
      'ванные комнаты': ['ванная комната', 'ванные комнаты', 'ванных комнат'],
    };
  }

  _toString() {
    this.placeholder = '';
    this.separator = '';
    Object.keys(this._inputs).forEach(this._preparePlaceholder);
    return this.placeholder;
  }

  @bind
  _preparePlaceholder(key) {
    const value = parseInt(this._inputs[key], 10);
    if (value > -1) {
      this.placeholder += `${this.separator}${value} ${wordForm(
        value,
        this._words[key] || []
      )}`;
      if (!this.separator) {
        this.separator = ', ';
      }
    }
  }
}

export default PlaceholderRooms;
