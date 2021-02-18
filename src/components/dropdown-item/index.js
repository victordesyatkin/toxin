import bind from 'bind-decorator';
import isUndefined from 'lodash/isUndefined';

import { Component } from '../../helpers/utils';
import './dropdown-item.scss';

class DropdownItem extends Component {
  static TYPE_MINUS = 0;

  static TYPE_PLUS = 1;

  _query = '.js-dropdown-item';

  constructor(options = {}) {
    super(options);
    this._renderComponent();
  }

  setValue(passValue) {
    const value = parseInt(passValue, 10);
    this._$input.val(value);
    this._$title.text(value);
  }

  getValue() {
    return parseInt(this._$input.val(), 10);
  }

  cleanValue() {
    this.getValue(0);
    this._toggleButtonMinus();
  }

  _init() {
    this._$input = $(`${this._query}__input`, this._$element);
    this._$buttonPlus = $(
      `button[data-type="${DropdownItem.TYPE_PLUS}"]`,
      this._$element
    ).on('click', this._handleDecreaseButtonClick);
    this._$buttonMinus = $(
      `button[data-type="${DropdownItem.TYPE_MINUS}"]`,
      this._$element
    ).on('click', this._handleIncreaseButtonClick);
    this._$title = $(`${this._query}__value`, this._$element);
    const value = this.getValue();
    if (value !== 'undefined') {
      this._$title.text(value);
    }
  }

  _toggleButtonMinus() {
    if (this.getValue()) {
      this._$buttonMinus.removeClass('dropdown__button_fade');
    } else {
      this._$buttonMinus.addClass('dropdown__button_fade');
    }
  }

  @bind
  _handleDecreaseButtonClick() {
    let value = this.getValue();
    const { min = 0 } = this._props;
    if (value <= min) {
      return undefined;
    }
    value -= 1;
    this._toggleButtonMinus();
    this.setValue(value);
    const passEvent = new Event('input');
    this._$input[0].dispatchEvent(passEvent);
    const { handleDecreaseButtonClick } = this._props;
    if (handleDecreaseButtonClick) {
      handleDecreaseButtonClick();
    }
    return undefined;
  }

  @bind
  _handleIncreaseButtonClick() {
    let value = this.getValue();
    const { max } = this._props;
    if (!isUndefined(max) && value >= max) {
      return undefined;
    }
    value += 1;
    this._toggleButtonMinus();
    this.setValue(value);
    const passEvent = new Event('input');
    this._$input[0].dispatchEvent(passEvent);
    const { handleIncreaseButtonClick } = this._props;
    if (handleIncreaseButtonClick) {
      handleIncreaseButtonClick();
    }
    return undefined;
  }
}

export default DropdownItem;
