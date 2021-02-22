import bind from 'bind-decorator';

import { Component } from '../../helpers/utils';
import TextField from '../text-field';
import './dropdown-title-text-field.scss';

class DropdownTitleControl extends Component {
  _query = '.js-dropdown-title-text-field';

  _className = 'dropdown-title-text-field';

  constructor(options) {
    super(options);
    // console.log('constructor : ', options);
    this._renderComponent();
  }

  updateSummary(value) {
    this._textField.updateValue(value);
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
    this._textField.open();
  }

  close() {
    this._$element.removeClass(`${this._className}_opened`);
    this._textField.close();
  }

  _init() {
    const { textField } = this._props;
    this._textField = new TextField({
      parent: this._$element,
      props: textField,
    });
    this._$title = $(`${this._query}__title`, this._$element);
    this._$title.on('click', this._handleTitleClick);
    // console.log('this._$title : ', this._$title);

    this._$textField = $(`${this._query}__text-field`, this._$element);
    this._$textField.on('click', this._handleTextFieldClick);
    // console.log(' this._$textField  : ', this._$textField);
  }

  @bind
  _handleTextFieldClick(event) {
    // console.log('_handleTextFieldClick : ');
    const { handleTextFieldClick } = this._props;
    if (handleTextFieldClick) {
      handleTextFieldClick(event);
    }
  }

  @bind
  _handleTitleClick(event) {
    // console.log('_handleTitleClick : ');
    const { handleTitleClick } = this._props;
    if (handleTitleClick) {
      handleTitleClick(event);
    }
  }
}

export default DropdownTitleControl;
