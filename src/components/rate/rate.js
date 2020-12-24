import get from "lodash/get";
import orderBy from "lodash/orderBy";

import "./rate.scss";

class Rate {
  constructor(component) {
    this._$component = $(component);
    this._init();
  }
}

Rate.prototype._init = function () {
  this._data = this._$component.data();
  this._setUnits();
  this._initCircle();
  this._initCanvas();
  this._initCircleParams();
  this._draw();
  window.addEventListener("resize", this._resizeCanvas.bind(this), false);
};

Rate.prototype._resizeCanvas = function () {
  this._initCircle();
  this._initCanvas();
  this._initCircleParams();
  this._draw();
};

Rate.prototype._calcAngle = function (count = 0) {
  const k = count / this._total;
  return k * 2 * Math.PI;
};

Rate.prototype._drawSeparator = function (startAngle) {
  this._ctx.beginPath();
  startAngle = startAngle - this._calcAngle(this._separatorCount) / 2;
  const endAngle = startAngle + this._calcAngle(this._separatorCount);
  this._ctx.strokeStyle = this._separatorColor;
  this._ctx.arc(this._x, this._y, this._radius - 0, startAngle, endAngle);
  this._ctx.stroke();
  this._ctx.closePath();
  return endAngle;
};

Rate.prototype._draw = function () {
  this._votes = get(this._data, ["data", "votes"]) || [];
  this._votes = orderBy(
    this._votes.filter((v) => {
      return v.count;
    }),
    ["order"],
    ["asc"]
  );

  this._separator = get(this._data, ["data", "separator"]) || {};
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
        case "top to bottom":
        case "180deg": {
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
};

Rate.prototype._initCircle = function () {
  this._$circle = $(".js-rate__circle", this._$component);
  if (this._$circle.length) {
    this._widthCircle = this._$circle.width();
    this._heightCircle = this._$circle.height();
  }
};

Rate.prototype._initCanvas = function () {
  this._$canvas = $(".rate__canvas", this._$component);
  this._lineWidth = get(this._data, ["data", "lineWidth"]) || 2;
  if (this._$canvas.length) {
    this._canvas = this._$canvas.get(0);
    this._canvas.width = this._widthCircle;
    this._canvas.height = this._widthCircle;
    this._ctx = this._canvas.getContext("2d");
    this._ctx.lineWidth = this._lineWidth;
  }
};

Rate.prototype._initCircleParams = function () {
  if (this._canvas) {
    this._x = this._canvas.width / 2;
    this._y = this._canvas.width / 2;
    this._radius = this._canvas.width / 2 - this._lineWidth / 2;
  }
};

Rate.prototype._setUnits = function () {
  this._total = get(this._data, ["data", "total"]);
  this._units = get(this._data, ["data", "units"]) || [];
  this._$unit = $(".js-rate__unit", this._$component);
  if (this._units.length) {
    this._$unit.html(this._wordForm(this._total, this._units));
  }
};

Rate.prototype._wordForm = function (num, word) {
  const cases = [2, 0, 1, 1, 1, 2];
  return word[
    num % 100 > 4 && num % 100 < 20 ? 2 : cases[num % 10 < 5 ? num % 10 : 5]
  ];
};

const renderComponent = () => {
  $(".js-rate").each(function () {
    const components = new Rate(this);
  });
};

document.addEventListener("DOMContentLoaded", renderComponent);
