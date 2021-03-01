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
    console.log('CLOSE : ');
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

    // console.log('_init this._$input : ', this._$input);
    this._$input.on('focusin', this._handleInputFocusIn);
    this._$input.on('focusout', this._handleInputFocusOut);

    this._$element.on('click', this._handleInputClick);

    this._$button = $(`${this._query}__button`, this._$element);
    this._$button.on('click', this._handleButtonClick);
  }

  @bind
  _handleInputFocusIn(event) {
    // console.log('_handleInputFocusIn : ');
    const { handleInputFocusIn } = this._props;
    if (handleInputFocusIn) {
      handleInputFocusIn(event);
    }
  }

  @bind
  _handleInputFocusOut(event) {
    // console.log('_handleInputFocusOut : ');
    const { handleInputFocusOut } = this._props;
    if (handleInputFocusOut) {
      handleInputFocusOut(event);
    }
  }

  @bind
  _handleButtonClick(event) {
    // console.log('_handleButtonClick : ');
    const { handleButtonClick } = this._props;
    if (handleButtonClick) {
      handleButtonClick(event);
    }
  }

  @bind
  _handleInputClick(event) {
    // console.log('_handleInputClick : ');
    const { handleInputClick } = this._props;
    if (handleInputClick) {
      handleInputClick(event);
    }
  }
}

export default TextField;
