import get from 'lodash/get';
import IMask from 'imask';

import { Component } from '../../helpers/utils';
import Input from '../input';
import './masked-text-field.scss';

class MaskedTextField extends Component {
  static defaultProps = {
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
        to: 2999,
        maxLength: 4,
      },
    },
  };

  _query = '.js-masked-text-field';

  _init() {
    Input.renderComponents({ parents: this._$element });
    const selector = $('input', this._$element);
    const options = get(this._props, ['mask']);
    let maskOptions = {};
    const mask = get(options, ['mask']);
    const regexp = get(options, ['regexp']);
    if (mask && regexp) {
      maskOptions.mask = new RegExp(mask);
    } else if (mask) {
      maskOptions.mask = mask;
    } else {
      maskOptions = MaskedTextField.defaultProps;
    }
    this._mask = IMask(selector.get(0), maskOptions);
  }
}

export default MaskedTextField;
