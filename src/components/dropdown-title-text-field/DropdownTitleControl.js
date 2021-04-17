import bind from 'bind-decorator';

import { Component } from '../../helpers/utils';
import MaskedTextField from '../masked-text-field';

class DropdownTitleControl extends Component {
  _query = '.js-dropdown-title-text-field';

  _className = 'dropdown-title-text-field';

  constructor(options) {
    super(options);
    this._renderComponent();
  }

  updateSummary(summary) {
    this._textField.updateSummary(summary);
  }

  updateValue(value) {
    this._textField.updateValue(value);
  }

  fill() {
    this._textField.fill();
  }

  empty() {
    this._textField.empty();
  }

  open() {
    this._isOpened = true;
    this._$element.addClass(`${this._className}_opened`);
    this._textField.open();
    this._$element.trigger('dropdown-open');
  }

  close() {
    this._isOpened = false;
    this._$element.removeClass(`${this._className}_opened`);
    this._textField.close();
  }

  cleanSummary() {
    this.updateSummary('');
  }

  cleanValue() {
    this.updateValue('');
  }

  clean() {
    this.cleanSummary();
    this.cleanValue();
  }

  getValue() {
    return this?._textField.getValue();
  }

  @bind
  _toggleOpen() {
    if (this._$element.hasClass(`${this._className}_opened`)) {
      this.close();
    } else {
      this.open();
    }
  }

  _init() {
    const { maskedTextField } = this._props;
    this._textField = new MaskedTextField({
      parent: this._$element,
      props: maskedTextField,
    });
    this._$element.on('click', this._handleDropdownTitleTextFieldClick);

    this._$title = $(`${this._query}__title`, this._$element);
    this._$title.on('click', this._handleTitleClick);

    this._$textField = $(`${this._query}__masked-text-field`, this._$element);
    this._$textField.on('click', this._handleTextFieldClick);
  }

  @bind
  _handleDropdownTitleTextFieldClick(event) {
    const { handleDropdownTitleTextFieldClick } = this._props;
    if (handleDropdownTitleTextFieldClick) {
      handleDropdownTitleTextFieldClick(event);
    }
  }

  @bind
  _handleTextFieldClick(event) {
    const { handleTextFieldClick } = this._props;
    if (handleTextFieldClick) {
      handleTextFieldClick(event);
    }
  }

  @bind
  _handleTitleClick(event) {
    const { handleTitleClick } = this._props;
    if (handleTitleClick) {
      handleTitleClick(event);
    }
  }
}

export default DropdownTitleControl;
