import bind from 'bind-decorator';

import { Component } from '../../helpers/utils';
import './like-button.scss';

class LikeButton extends Component {
  _query = '.js-like-button';

  _init() {
    this._input = this._element.querySelector(`${this._query}__input`);
    this._count = this._element.querySelector(`${this._query}__count`);
    this._attachEventHandlers();
  }

  _attachEventHandlers() {
    if (this.input && this.input.addEventListener) {
      this.input.addEventListener('click', this._handleInputClick);
    }
  }

  _isValidInput() {
    return (
      this.input &&
      this.input.checked !== undefined &&
      this.count &&
      this.count.innerHTML &&
      !Number.isNaN(parseFloat(this.count.innerHTML))
    );
  }

  @bind
  _handleInputClick() {
    if (this._isValidInput()) {
      if (this.input.checked) {
        this.count.innerHTML = parseFloat(this.count.innerHTML) + 1;
      } else {
        this.count.innerHTML =
          parseFloat(this.count.innerHTML) > 0
            ? parseFloat(this.count.innerHTML) - 1
            : this.count.innerHTML;
      }
    }
  }
}

export default LikeButton;
