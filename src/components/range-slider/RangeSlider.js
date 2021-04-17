import bind from 'bind-decorator';

import { Component } from '../../helpers/utils';
import '../air-range-slider';

class RangeSlider extends Component {
  static TYPE_START = 'start';

  static TYPE_END = 'end';

  static TYPES = ['start', 'end'];

  _query = '.js-range-slider';

  _className = 'range-slider';

  constructor(options) {
    super(options);
    this._renderComponent();
  }

  _init() {
    const { start, end, min, max, step } = this._props;
    this._$inputStart = $(
      `${this._query}__input[data-type="start"]`,
      this._$element
    ).val(start);
    this._$inputEnd = $(
      `${this._query}__input[data-type="end"]`,
      this._$element
    ).val(start);
    this._$sectionBody = $(`${this._query}__section-body`, this._$element);
    this._$info = $(`${this._query}__info`, this._$element);
    this._slider = this._$sectionBody.slider({
      values: [start, end],
      min,
      max,
      step,
      handle: {
        classNames: [
          `${this._className}__handle`,
          `${this._className}__handle`,
        ],
      },
      rail: {
        className: `${this._className}__rail`,
      },
      onChange: this._onChange,
    });
    this._getOptionsInfo();
    this._setInfo([start, end]);
  }

  @bind
  _onChange(values) {
    const [start, end] = values || [];
    this._setValue(start, 'start');
    this._setValue(end, 'end');
    this._setInfo(values);
  }

  _setInfo(values) {
    const [start, end] = values || [];
    let readyStart = 0;
    let readyEnd = 0;
    if (typeof start === 'undefined') {
      readyStart = start;
    }
    if (typeof end === 'undefined') {
      readyEnd = end;
    }
    const { unit, ...options } = this._getOptionsInfo();
    readyStart = new Intl.NumberFormat('ru-RU', options).format(start);
    readyEnd = new Intl.NumberFormat('ru-RU', options).format(end);
    if (this._$info) {
      this._$info.html(`${readyStart}${unit} - ${readyEnd}${unit}`);
    }
  }

  _setValue(options) {
    const { value = 0, type = '' } = options || {};
    if (RangeSlider.TYPE_START.indexOf(type) !== -1) {
      if (type === RangeSlider.TYPE_START) {
        this._inputStart.val(value);
      }

      if (type === RangeSlider.TYPE_END) {
        this._inputEnd.val(value);
      }
    }
  }

  _getOptionsInfo(info) {
    const { style = 'decimal', currency = 'RUB', unit = '&#8381;' } =
      info || this._info || {};
    return {
      style,
      currency,
      minimumFractionDigits: 0,
      unit,
    };
  }
}

export default RangeSlider;
