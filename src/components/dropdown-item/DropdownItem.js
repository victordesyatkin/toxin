import bind from 'bind-decorator';

import { Component } from '../../helpers';

class DropdownItem extends Component {
  static TYPE_DECREASE = 'decrease';

  static TYPE_INCREASE = 'increase';

  _query = '.js-dropdown-item';

  _className = 'dropdown-item';

  constructor(options = {}) {
    super(options);
    this._renderComponent();
  }

  setValue(passValue) {
    const value = parseInt(passValue, 10);
    this._$input.val(value);
    this._$title.text(value);
    const { handleInputChange, name } = this._props;
    if (handleInputChange) {
      handleInputChange({
        name,
        value,
      });
    }
  }

  getValue() {
    return parseInt(this._$input.val(), 10);
  }

  cleanValue() {
    this.setValue(0);
    this._toggleFade();
  }

  _init() {
    const { value } = this._props;
    this._$input = $(`${this._query}__input`, this._$element);
    this._$title = $(`${this._query}__value`, this._$element);
    if (value !== 'undefined') {
      this._$title.text(value);
    }
    this.setValue(value);
    this._bindEventListeners();
  }

  _bindEventListeners() {
    this._$element.on('click', this._handleElementClick);
  }

  _toggleFade() {
    this._$element.toggleClass(`${this._className}_faded`, !this.getValue());
  }

  @bind
  _handleElementClick(event) {
    const { target } = event;
    const type = $(target).data('type');
    if (
      [DropdownItem.TYPE_INCREASE, DropdownItem.TYPE_DECREASE].includes(type)
    ) {
      const { min = 0, max = 1e10, handleButtonClick } = this._props;
      let value = this.getValue();
      let isChange = false;
      if (type === DropdownItem.TYPE_INCREASE) {
        if (value < max) {
          value += 1;
          isChange = true;
        }
      } else if (type === DropdownItem.TYPE_DECREASE) {
        if (value > min) {
          value -= 1;
          isChange = true;
        }
      }
      if (isChange) {
        this.setValue(value);
        this._toggleFade();
        if (handleButtonClick) {
          handleButtonClick({ event, type });
        }
      }
    }
  }
}

export default DropdownItem;
