import get from 'lodash/get';
import bind from 'bind-decorator';

import { Component } from '../../helpers/utils';
import './slider.scss';

class Slider extends Component {
  static TYPE_BUTTON_LEFT = 'left';

  static TYPE_BUTTON_RIGHT = 'right';

  static TYPES_BUTTONS = ['left', 'right'];

  _query = '.js-slider';

  _className = 'slider';

  constructor(options) {
    super(options);
    this._renderComponent();
  }

  _init() {
    // //console.log(' this._setImage(this._index); : ', this._props);
    this._images = get(this._props, ['images']) || [];
    this._length = this._images.length;
    this._$points = $(`${this._query}__point`, this._$element);
    this._isDisabled = this._props?._isDisabled;
    if (!this._isDisabled) {
      this._$prev = $(
        `[data-type="${Slider.TYPE_BUTTON_LEFT}"]`,
        this._$element
      );
      this._$prev.on('click', this._handleControlClick);
      this._$next = $(
        `[data-type="${Slider.TYPE_BUTTON_RIGHT}"]`,
        this._$element
      );
      this._$next.on('click', this._handleControlClick);
      this._$points.on('click', this._handlePointClick);
    }
    this._$image = $(`${this._query}__section-images img`, this._$element);
    this._index = 0;
    this._setImage(this._index);
    this._setPoint(this._index);
  }

  @bind
  _handlePointClick(event) {
    event.preventDefault();
    const index = get($(event.target).data(), ['index']);
    if (typeof index !== 'undefined' && this.index !== index) {
      this._cleanPoint(this._index);
      this._index = index;
      this._setImage(this._index);
      this._setPoint(this._index);
    }
  }

  @bind
  _handleControlClick(event) {
    event.preventDefault();
    const type = get(event, ['currentTarget', 'dataset', 'type']) || 0;
    if (Slider.TYPES_BUTTONS.indexOf(type) === -1) {
      return undefined;
    }
    const duration = type === Slider.TYPE_BUTTON_LEFT ? -1 : 1;
    /// /console.log('duration : ', duration);
    this._cleanPoint(this._index);
    this._changeIndex(duration);
    this._setImage(this._index);
    this._setPoint(this._index);
    return undefined;
  }

  _setImage(index) {
    const src = get(this._images, [index, 'src']) || '';
    const alt = get(this._images, [index, 'alt']) || '';
    // //console.log(' this._setImage(this._index); : ', src);
    // //console.log(' this._setImage(this._index); : ', alt);
    this._$image.attr({ src, alt });
  }

  _setPoint(index) {
    $(this._$points.get(index)).addClass(`${this._className}__point_full`);
  }

  _cleanPoint(index) {
    $(this._$points.get(index)).removeClass(`${this._className}__point_full`);
  }

  _changeIndex(duration) {
    let index = this._index + 1 * duration;
    if (index < 0) {
      index = this._length - 1;
    } else if (index >= this._length) {
      index = 0;
    }
    this._index = index;
  }
}

export default Slider;
