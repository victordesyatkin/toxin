import bind from 'bind-decorator';
import isUndefined from 'lodash/isUndefined';
import get from 'lodash/get';

import { Component } from '../../helpers/utils';
import './dropdown-item.scss';

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
    // console.log('setValue : ');
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
    // console.log('_init : ', this._props);
    const { value } = this._props;
    this._$input = $(`${this._query}__input`, this._$element);
    // console.log('this._$element : ', this._$element);
    this._$element.on('click', this._handleElementClick);
    this._$title = $(`${this._query}__value`, this._$element);
    if (value !== 'undefined') {
      // console.log('this._$title : ', this._$title);
      // console.log('this._$title value : ', value);
      this._$title.text(value);
    }
    this.setValue(value);
  }

  _toggleFade() {
    if (this.getValue()) {
      this._$element.removeClass(`${this._className}_fade`);
    } else {
      this._$element.addClass(`${this._className}_fade`);
    }
  }

  @bind
  _handleElementClick(event) {
    const target = get(event, ['target']);
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
      // console.log('_handleElementClick');
      if (isChange) {
        this.setValue(value);
        this._toggleFade();
        if (handleButtonClick) {
          handleButtonClick({ event, type });
        }
      }
    }
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
