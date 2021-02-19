import bind from 'bind-decorator';

import { Component } from '../../helpers/utils';
import '../title-label';
import './text-field.scss';

class TextField extends Component {
  _query = '.js-text-field';

  _className = '.text-field';

  constructor(options) {
    super(options);
    this._renderComponent();
  }

  get input() {
    return this._input;
  }

  toggleStraight() {
    if (this._$element.hasClass('input_straight')) {
      this._$element.removeClass('input_straight');
    } else {
      this._$element.addClass('input_straight');
    }
  }

  toggleExpanded() {
    if (this._$element.hasClass('input_expanded')) {
      this._$element.removeClass('input_expanded');
    } else {
      this._$element.addClass('input_expanded');
    }
  }

  straight() {
    if (!this._$element.hasClass('input_straight')) {
      this._$element.addClass('input_straight');
    }
  }

  common() {
    if (this._$element.hasClass('input_straight')) {
      this._$element.removeClass('input_straight');
    }
  }

  expand() {
    if (!this._$element.hasClass('input_expanded')) {
      this._$element.addClass('input_expanded');
    }
  }

  minimize() {
    if (this._$element.hasClass('input_expanded')) {
      this._$element.removeClass('input_expanded');
    }
  }

  enable() {
    if (this._$element.attr('disabled')) {
      this._$element.attr({ disabled: false });
    }
  }

  disable() {
    if (!this._$element.attr('disabled')) {
      this._$element.attr({ disabled: true });
    }
  }

  addTheme(theme) {
    const themeClass = `input_theme_${theme}`;
    if (!this._$element.hasClass(themeClass)) {
      this._$element.addClass(themeClass);
    }
  }

  removeTheme(theme) {
    const themeClass = `input_theme_${theme}`;
    if (this._$element.hasClass(themeClass)) {
      this._$element.removeClass(themeClass);
    }
  }

  _init() {
    this._$element.on('focusin', this._handleInputFocusIn);
    this._$element.on('focusout', this._handleInputFocusOut);
    this._$element.on('click', this._handleInputClick);
    this._input = $(`${this._query}__input`, this._$element);
    this._$button = $(`${this._query}__button`, this._$element);
  }

  @bind
  _handleInputFocusIn(event) {
    $('.js-input__section', this._$element).addClass('input__section_focused');
    const { handleInputFocusIn } = this._props;
    if (handleInputFocusIn) {
      handleInputFocusIn(event);
    }
  }

  @bind
  _handleInputFocusOut(event) {
    $('.js-input__section', this._$element).removeClass(
      'input__section_focused'
    );
    const { handleInputFocusOut } = this._props;
    if (handleInputFocusOut) {
      handleInputFocusOut(event);
    }
  }

  @bind
  _handleButtonClick(event) {
    this.toggleExpanded();
    const { handleButtonClick } = this._props;
    if (handleButtonClick) {
      handleButtonClick(event);
    }
  }

  @bind
  _handleInputClick(event) {
    const { isDropdown } = this._props;
    console.log('_handleInputClick : ', isDropdown);
    if (isDropdown) {
      this.toggleExpanded();
      const { handleInputClick } = this._props;
      if (handleInputClick) {
        handleInputClick(event);
      }
    }
  }
}

export default TextField;
