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

  _init() {
    const { textField, options = {} } = this._props;
    // console.log('_init : ', textField);
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
