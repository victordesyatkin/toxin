import get from 'lodash/get';
import bind from 'bind-decorator';

import { Component } from '../../helpers/utils';
import './slider.scss';

class Slider extends Component {
  static typeButtonPrev = 1;

  static typeButtonNext = 2;

  static typesButtons = [1, 2];

  _query = '.js-slider';

  _init() {
    this._images = get(this._props, ['images']) || [];
    this._length = this._images.length;
    this._$points = $('.js-slider__point', this._$element);
    this._$prev = $(`[data-type="${Slider.typeButtonPrev}"]`, this._$element);
    this._$prev.on('click', this._handleControlClick);
    this._$next = $(`[data-type="${Slider.typeButtonNext}"]`, this._$element);
    this._$next.on('click', this._handleControlClick);
    this._$image = $('.js-slider__section-images img', this._$element);
    this._index = 0;
    this._$points.on('click', this._handlePointClick);
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

  _handleControlClick(event) {
    event.preventDefault();
    const type = get(event, ['currentTarget', 'dataset', 'type']) || 0;
    if (Slider.typesButtons.indexOf(type) === -1) {
      return undefined;
    }
    const duration = type === 1 ? -1 : 1;
    this._cleanPoint(this._index);
    this._changeIndex(duration);
    this._setImage(this._index);
    this._setPoint(this._index);
    return undefined;
  }

  _setImage(index) {
    const src = get(this._images, [index, 'src']) || '';
    const alt = get(this._images, [index, 'alt']) || '';
    this._$image.attr({ src, alt });
  }

  _setPoint(index) {
    $(this._$points.get(index)).addClass('slider__point_full');
  }

  _cleanPoint(index) {
    $(this._$points.get(index)).removeClass('slider__point_full');
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
