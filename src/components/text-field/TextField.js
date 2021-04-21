import bind from 'bind-decorator';

import { Component } from '../../helpers';

class TextField extends Component {
  _query = '.js-text-field';

  _className = 'text-field';

  constructor(options) {
    super(options);
    this._renderComponent();
  }

  getInput() {
    return this._$input.get(0);
  }

  toggleOpen() {
    if (this._$element.hasClass(`${this._className}_opened`)) {
      this.close();
    } else {
      this.open();
    }
  }

  open() {
    this._$element.addClass(`${this._className}_opened`);
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

  fill() {
    this._$element.addClass(`${this._className}_filled`);
  }

  empty() {
    this._$element.removeClass(`${this._className}_filled`);
  }

  getValue() {
    return this._$input.val();
  }

  setValue(value) {
    this._$input.val(value);
  }

  updateValue(value) {
    const previousValue = this.getValue();
    if (value !== previousValue) {
      this.setValue(value);
    }
  }

  getSummary() {
    return this._$summary.html();
  }

  setSummary(value) {
    this._$summary.html(value);
  }

  updateSummary(summary) {
    const previousSummary = this.getSummary();
    if (summary !== previousSummary) {
      this.setSummary(summary);
    }
  }

  _init() {
    this._$input = $(`${this._query}__input`, this._$element);
    this._$summary = $(`${this._query}__summary`, this._$element);

    this._$input.on('focusin', this._handleInputFocusIn);
    this._$input.on('focusout', this._handleInputFocusOut);

    this._$element.on('click', this._handleInputClick);

    this._$button = $(`${this._query}__button`, this._$element);
    this._$button.on('click', this._handleButtonClick);
  }

  @bind
  _handleInputFocusIn(event) {
    const { handleInputFocusIn } = this._props;
    if (handleInputFocusIn) {
      handleInputFocusIn(event);
    }
  }

  @bind
  _handleInputFocusOut(event) {
    const { handleInputFocusOut } = this._props;
    if (handleInputFocusOut) {
      handleInputFocusOut(event);
    }
  }

  @bind
  _handleButtonClick(event) {
    this._changeType();
    const { handleButtonClick } = this._props;
    if (handleButtonClick) {
      handleButtonClick(event);
    }
  }

  @bind
  _handleInputClick(event) {
    const { handleInputClick } = this._props;
    if (handleInputClick) {
      handleInputClick(event);
    }
  }

  _changeType() {
    const { isToggle, type } = this._props;
    if (type === 'password' && isToggle) {
      let typeInput = this._$input.attr('type');
      let removedClassName = '';
      let addedClassName = '';
      if (typeInput === 'text') {
        typeInput = 'password';
        removedClassName = 'icon-eye-slash';
        addedClassName = 'icon-eye';
      } else {
        typeInput = 'text';
        removedClassName = 'icon-eye';
        addedClassName = 'icon-eye-slash';
      }
      this._$button.removeClass(removedClassName);
      this._$button.addClass(addedClassName);
      this._$input.attr('type', typeInput);
    }
  }
}

export default TextField;
