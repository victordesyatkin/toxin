import bind from 'bind-decorator';

import { Component } from '../../helpers/utils';
import '../title-label';
import './text-field.scss';

class TextField extends Component {
  _query = '.js-text-field';

  _className = 'text-field';

  constructor(options) {
    super(options);
    this._renderComponent();
  }

  // toggleStraight() {
  //   if (this._$element.hasClass('input_straight')) {
  //     this._$element.removeClass('input_straight');
  //   } else {
  //     this._$element.addClass('input_straight');
  //   }
  // }

  toggleOpened() {
    if (this._$element.hasClass(`${this._className}_opened`)) {
      this.close();
    } else {
      this.open();
    }
  }

  open() {
    this._$element.removeClass(`${this._className}_opened`);
  }

  close() {
    this._$element.removeClass(`${this._className}_opened`);
  }

  enable() {
    this._$input.attr({ disabled: false });
  }

  disable() {
    this._$input.attr({ disabled: true });
  }

  getValue() {
    this._$input.val();
  }

  setValue(value) {
    this._$input.val(value);
  }

  // addTheme(theme) {
  //   const themeClass = `input_theme_${theme}`;
  //   if (!this._$element.hasClass(themeClass)) {
  //     this._$element.addClass(themeClass);
  //   }
  // }

  // removeTheme(theme) {
  //   const themeClass = `input_theme_${theme}`;
  //   if (this._$element.hasClass(themeClass)) {
  //     this._$element.removeClass(themeClass);
  //   }
  // }

  _init() {
    this._$input = $(`${this._query}__input`, this._$element);
    console.log('_init this._$input : ', this._$input);
    this._$input.on('focusin', this._handleInputFocusIn);
    this._$input.on('focusout', this._handleInputFocusOut);

    this._$element.on('click', this._handleInputClick);

    this._$button = $(`${this._query}__button`, this._$element);
    this._$button.on('click', this._handleButtonClick);
  }

  @bind
  _handleInputFocusIn(event) {
    console.log('_handleInputFocusIn : ');
    const { handleInputFocusIn } = this._props;
    if (handleInputFocusIn) {
      handleInputFocusIn(event);
    }
  }

  @bind
  _handleInputFocusOut(event) {
    console.log('_handleInputFocusOut : ');
    const { handleInputFocusOut } = this._props;
    if (handleInputFocusOut) {
      handleInputFocusOut(event);
    }
  }

  @bind
  _handleButtonClick(event) {
    console.log('_handleButtonClick : ');
    const { handleButtonClick } = this._props;
    if (handleButtonClick) {
      handleButtonClick(event);
    }
  }

  @bind
  _handleInputClick(event) {
    console.log('_handleInputClick : ');
    const { handleInputClick } = this._props;
    if (handleInputClick) {
      handleInputClick(event);
    }
  }
}

export default TextField;
