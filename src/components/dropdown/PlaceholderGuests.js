import bind from 'bind-decorator';
import { wordForm } from '../../helpers/utils';
import Placeholder from './Placeholder';

class PlaceholderGuests extends Placeholder {
  placeholder = '';

  separator = '';

  constructor(props) {
    super(props);
    this._init();
  }

  _init() {
    this._words = {
      гость: ['гость', 'гостя', 'гостей'],
      младенцы: ['младенец', 'младенца', 'младенцев'],
    };
  }

  _toString() {
    this.placeholder = '';
    this.countGuests = 0;
    this.countBaby = 0;
    this.separator = '';

    Object.keys(this._inputs).forEach(this._preparePlaceholder);
    if (this.countGuests > 0) {
      this.placeholder = `${this.separator}${this.countGuests} ${wordForm(
        this.countGuests,
        this._words['гость'] || []
      )}`;
      if (!this.separator) {
        this.separator = ', ';
      }
    }
    if (this.countBaby > 0) {
      this.placeholder += `${this.separator}${this.countBaby} ${wordForm(
        this.countBaby,
        this._words['младенцы'] || []
      )}`;
    }
    return this.placeholder;
  }

  @bind
  _preparePlaceholder(key) {
    if (['взрослые', 'дети'].indexOf(key) > -1) {
      this.countGuests += parseInt(this._inputs[key], 10);
    } else if (['младенцы'].indexOf(key) > -1) {
      this.countBaby += parseInt(this._inputs[key], 10);
    }
  }
}

export default PlaceholderGuests;
