import isEmpty from 'lodash/isEmpty';
import IMask from 'imask';

import { Component } from '../../helpers/utils';
import TextField from '../text-field';
import './masked-text-field.scss';

class MaskedTextField extends Component {
  static TYPES = {
    default: {
      mask: Date,
      lazy: true,
      overwrite: true,
      autofix: true,
      blocks: {
        d: {
          mask: IMask.MaskedRange,
          placeholderChar: 'Д',
          from: 1,
          to: 31,
          maxLength: 2,
        },
        m: {
          mask: IMask.MaskedRange,
          placeholderChar: 'М',
          from: 1,
          to: 12,
          maxLength: 2,
        },
        Y: {
          mask: IMask.MaskedRange,
          placeholderChar: 'Г',
          from: 1999,
          to: 2100,
          maxLength: 4,
        },
      },
    },
    date: {
      mask: Date,
      lazy: false,
      overwrite: true,
      autofix: true,
      blocks: {
        d: {
          mask: IMask.MaskedRange,
          placeholderChar: 'Д',
          from: 1,
          to: 31,
          maxLength: 2,
        },
        m: {
          mask: IMask.MaskedRange,
          placeholderChar: 'М',
          from: 1,
          to: 12,
          maxLength: 2,
        },
        Y: {
          mask: IMask.MaskedRange,
          placeholderChar: 'Г',
          from: 1999,
          to: 2100,
          maxLength: 4,
        },
      },
    },
    filterDate: {},
    email: {},
  };

  _query = '.js-masked-text-field';

  _className = 'masked-text-field';

  constructor(options) {
    super(options);
    this._renderComponent();
  }

  getInput() {
    return this._textField.get(0);
  }

  toggleOpen() {
    this._textField.toggleOpen();
  }

  open() {
    this._textField.open();
  }

  close() {
    this._textField.close();
  }

  enable() {
    this._textField.enable();
  }

  disable() {
    this._textField.disable();
  }

  getValue() {
    return this._textField.getValue();
  }

  setValue(value) {
    this._textField.setValue(value);
  }

  updateValue(value) {
    this._textField.updateValue(value);
  }

  getSummary() {
    return this._textField.getSummary();
  }

  setSummary(summary) {
    this._textField.setSummary(summary);
  }

  updateSummary(summary) {
    this._textField.updateSummary(summary);
  }

  _init() {
    const { textField, options = {} } = this._props;
    this._textField = new TextField({
      parent: this._$element,
      props: textField,
    });
    const { mask, type, isRegexp } = options;
    let maskOptions = {};
    if (mask && isRegexp) {
      maskOptions.mask = new RegExp(mask);
    } else if (mask) {
      maskOptions.mask = mask;
    } else {
      maskOptions =
        type && MaskedTextField.TYPES[type]
          ? MaskedTextField.TYPES[type]
          : maskOptions;
    }
    // console.log('maskOptions : ', maskOptions);
    if (!isEmpty(maskOptions)) {
      const element = this._textField.getInput();
      this._mask = IMask(element, maskOptions);
      // console.log('element : ', element);
      // console.log('$(element) : ', $(element).val());
    }
  }
}

export default MaskedTextField;
