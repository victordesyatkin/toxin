import get from 'lodash/get';
import orderBy from 'lodash/orderBy';
import bind from 'bind-decorator';

import {
  renderComponents,
  renderComponent,
  wordForm,
} from '../../helpers/utils';
import './rate.scss';

class Rate {
  static CLASS_NAME = 'RATE';

  static renderComponents(props = {}) {
    const { parents, query, render } = props;
    renderComponents({
      parents,
      query: query || '.js-rate',
      render: render || Rate._renderComponent,
    });
  }

  static _renderComponent(index, element) {
    renderComponent({
      element,
      className: Rate.CLASS_NAME,
      someClass: Rate,
    });
  }

  constructor(element) {
    this._$element = $(element);
    this._init();
  }

  _init() {
    this._data = this._$element.data();
    this._setUnits();
    this._initCircle();
    this._initCanvas();
    this._initCircleParams();
    this._draw();
    window.addEventListener('resize', this._resizeCanvas);
  }

  @bind
  _resizeCanvas() {
    this._initCircle();
    this._initCanvas();
    this._initCircleParams();
    this._draw();
  }

  _calcAngle(count = 0) {
    const k = count / this._total;
    return k * 2 * Math.PI;
  }

  _drawSeparator(startAngle) {
    this._ctx.beginPath();
    startAngle = startAngle - this._calcAngle(this._separatorCount) / 2;
    const endAngle = startAngle + this._calcAngle(this._separatorCount);
    this._ctx.strokeStyle = this._separatorColor;
    this._ctx.arc(this._x, this._y, this._radius - 0, startAngle, endAngle);
    this._ctx.stroke();
    this._ctx.closePath();
    return endAngle;
  }

  _draw() {
    this._votes = get(this._data, ['data', 'votes']) || [];
    this._votes = orderBy(
      this._votes.filter((v) => {
        return v.count;
      }),
      ['order'],
      ['asc']
    );

    this._separator = get(this._data, ['data', 'separator']) || {};
    this._separatorColor = this._separator.color;
    this._separatorCount = this._separator.count;

    this._ctx.lineWidth = this._lineWidth;
    let startAngle = (-1 * Math.PI) / 2;
    let endAngle = 0;
    this._votes.forEach((vote) => {
      const { count, color, linearGradient } = vote;
      endAngle = startAngle + this._calcAngle(count);
      this._ctx.beginPath();
      if (linearGradient) {
        const { colors, direction } = linearGradient;
        let x1, y1, x2, y2;
        switch (direction) {
          case 'top to bottom':
          case '180deg': {
            x1 = this._widthCircle / 2;
            x2 = this._widthCircle / 2;
            y1 = 0;
            y2 = this._heightCircle;
            break;
          }
          default: {
            x1 = this._widthCircle / 2;
            x2 = this._widthCircle / 2;
            y1 = 0;
            y2 = this._heightCircle;
          }
        }
        const grd = this._ctx.createLinearGradient(x1, y1, x2, y2);
        if (colors) {
          colors.forEach((item) => {
            const { stop, color } = item || {};
            grd.addColorStop(stop, color);
          });
        }
        this._ctx.strokeStyle = grd;
      } else if (color) {
        this._ctx.strokeStyle = color;
      }
      this._ctx.arc(this._x, this._y, this._radius, startAngle, endAngle);
      this._ctx.stroke();
      this._ctx.closePath();
      startAngle = endAngle;
    });
    this._votes.forEach((vote) => {
      const { count } = vote;
      startAngle = this._drawSeparator(startAngle);
      endAngle = startAngle + this._calcAngle(count - this._separatorCount / 2);
      startAngle = endAngle;
    });
  }

  _initCircle() {
    this._$circle = $('.js-rate__circle', this._$element);
    if (this._$circle.length) {
      this._widthCircle = this._$circle.width();
      this._heightCircle = this._$circle.height();
    }
  }

  _initCanvas() {
    this._$canvas = $('.rate__canvas', this._$element);
    this._lineWidth = get(this._data, ['data', 'lineWidth']) || 2;
    if (this._$canvas.length) {
      this._canvas = this._$canvas.get(0);
      this._canvas.width = this._widthCircle;
      this._canvas.height = this._widthCircle;
      this._ctx = this._canvas.getContext('2d');
      this._ctx.lineWidth = this._lineWidth;
    }
  }

  _initCircleParams() {
    if (this._canvas) {
      this._x = this._canvas.width / 2;
      this._y = this._canvas.width / 2;
      this._radius = this._canvas.width / 2 - this._lineWidth / 2;
    }
  }

  _setUnits() {
    this._total = get(this._data, ['data', 'total']);
    this._units = get(this._data, ['data', 'units']) || [];
    this._$unit = $('.js-rate__unit', this._$element);
    if (this._units.length) {
      this._$unit.html(wordForm(this._total, this._units));
    }
  }
}

export default Rate;
