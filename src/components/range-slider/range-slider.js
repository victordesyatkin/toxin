import get from "lodash/get";
import "./range-slider.scss";

class RangeSlider {
  constructor(component) {
    this._component = component;
    this._nodeListInputs = this._component.querySelectorAll("input") || [];
    this._inputs = {
      start: this._nodeListInputs[0],
      end: this._nodeListInputs[1],
    };
    this._nodeListPoints = this._component.querySelectorAll(
      ".range-slider__point"
    );
    this._points = {
      start: this._nodeListPoints[0],
      end: this._nodeListPoints[1],
    };
    this._startPoint = this._nodeListPoints[0];
    this._endPoint = this._nodeListPoints[1];
    this._fullTrack = this._component.querySelector(
      ".range-slider__section-body"
    );
    this._pointWidth = parseFloat(this._startPoint.offsetWidth);
    this._maxTrackLength = parseFloat(this._fullTrack.offsetWidth);
    this._track = this._component.querySelector(".range-slider__track");
    this._info = this._component.querySelector(".range-slider__info");
    this._type = "";
    this._options = JSON.parse(this._component.dataset.options);
    this._min = this._options.min;
    this._max = this._options.max;
    this._separator = this._options.separator;
    this._calculateK();
    this._shiftX = this._component.getBoundingClientRect().left;
    this._attachEventHandlers();
    this._setInputs(this._options.start, this._options.end);
    this._setInfo();
    this._setPoints({
      start: this._calculateCoordinate(this._options.start),
      end: this._calculateCoordinate(this._options.end),
    });
    this._renderTrack();
  }
}

RangeSlider.prototype._attachEventHandlers = function () {
  if (!this._component) {
    return false;
  }
  this._component.addEventListener("mousedown", this._mousedown.bind(this));
  this._component.addEventListener("mouseenter", this._mouseenter.bind(this));
  document.addEventListener("mouseleave", this._mouseleave.bind(this));
  document.addEventListener("mouseup", this._mouseup.bind(this));
  document.addEventListener("mousemove", this._mousemove.bind(this));
  window.addEventListener("resize", this._resize.bind(this));
};

RangeSlider.prototype._setInputs = function ({ start, end } = {}) {
  if (typeof start !== "undefined") {
    this._setValue("start", start);
  }
  if (typeof end !== "undefined") {
    this._setValue.setValue("end", end);
  }
};

RangeSlider.prototype._renderTrack = function () {
  const start = this._getPoint("start");
  const end = this._getPoint("end");
  const additive = this._pointWidth / 2;
  this._track.style.left = `${start + additive}px`;
  this._track.style.right = `${this._maxTrackLength - end - additive}px`;
};

RangeSlider.prototype._setPoints = function ({ start, end } = {}) {
  if (typeof start !== "undefined") {
    this._setPoint("start", start);
  }
  if (typeof end !== "undefined") {
    this._setPoint("end", end);
  }
};

RangeSlider.prototype._getOptionsInfo = function () {
  const { style = "decimal", currency = "RUB", unit = "&#8381;" } =
    get(this, ["_options", "info"], {}) || {};
  return {
    style,
    currency,
    minimumFractionDigits: 0,
    unit,
  };
};

RangeSlider.prototype._setInfo = function ({ start, end } = {}) {
  if (typeof start === "undefined") {
    start = this._getValue("start");
  } else {
    start = 0;
  }
  if (typeof end === "undefined") {
    end = this._getValue("end");
  } else {
    end = 0;
  }
  const { unit, ...options } = this._getOptionsInfo();
  start = new Intl.NumberFormat("ru-RU", options).format(start);
  end = new Intl.NumberFormat("ru-RU", options).format(end);
  if (this._info) {
    this._info.innerHTML = `${start}${unit} - ${end}${unit}`;
  }
};

RangeSlider.prototype._setValue = function (type = "", value = 0) {
  if (this._types.indexOf(type) === -1) {
    return false;
  }
  this._inputs[type].setAttribute("value", value);
};

RangeSlider.prototype._getValue = function (type = "") {
  if (this._types.indexOf(type) === -1) {
    return false;
  }
  return parseFloat(this._inputs[type].getAttribute("value"));
};

RangeSlider.prototype._setPoint = function (type = "", value = 0) {
  if (this._types.indexOf(type) === -1) {
    return false;
  }
  this._points[type].style.left = `${value}px`;
};

RangeSlider.prototype._getPoint = function (type = "") {
  if (this._types.indexOf(type) === -1) {
    return false;
  }
  return parseFloat(this._points[type].style.left) || 0;
};

RangeSlider.prototype._calculateCoordinate = function (v = 1) {
  return v / this._k;
};

RangeSlider.prototype._calculateValue = function (c = 1) {
  return c * this._k;
};

RangeSlider.prototype._calculateK = function () {
  this._k = this._max / this._maxTrackLength;
};

RangeSlider.prototype._mouseenter = function () {};

RangeSlider.prototype._mouseleave = function () {
  this._type = "";
};

RangeSlider.prototype._mouseup = function (e) {
  this._type = "";
};

RangeSlider.prototype._mousedown = function (e) {
  e.preventDefault();
  this._type = this._getTypePoint(e);
};

RangeSlider.prototype._mousemove = function (e) {
  if (!this._type) {
    return false;
  }
  let coordinate = e.clientX - this._shiftX;
  const value = this._getValue(this._type);
  let nextValue = this._calculateValue(coordinate);
  nextValue = Math.floor(nextValue / this._separator) * this._separator;
  if (
    value === nextValue ||
    (nextValue > this._getValue("end") - this._separator &&
      this._type === "start") ||
    (nextValue < this._getValue("start") + this._separator &&
      this._type === "end") ||
    nextValue > this._max ||
    nextValue < this._min
  ) {
    return false;
  }
  coordinate = this._calculateCoordinate(nextValue);
  if (nextValue <= this._min || coordinate <= 0) {
    nextValue = this._min;
    coordinate = -1;
  } else if (nextValue >= this._max || coordinate >= this._maxTrackLength) {
    nextValue = this._max;
    coordinate = this._maxTrackLength - 4;
  }
  this._setPoint(this._type, coordinate);
  this._setValue(this._type, nextValue);
  this._setInfo();
  this._renderTrack();
};

RangeSlider.prototype._getTypePoint = function (e = {}) {
  const { type } = e.target.dataset || {};
  if (this._types.indexOf(type) === -1) {
    return "";
  }
  return type;
};

RangeSlider.prototype._resize = function () {
  this._maxTrackLength = parseFloat(this._fullTrack.offsetWidth);
  this._calculateK();
  this._shiftX = this._component.getBoundingClientRect().left;
  this._setPoints({
    start:
      this._calculateCoordinate(this._getValue("start")) - this._pointWidth / 2,
    end:
      this._calculateCoordinate(this._getValue("end")) - this._pointWidth / 2,
  });
  this._renderTrack();
};

RangeSlider.prototype._types = ["start", "end"];

export default function renderComponent(callbackWhenInitialized) {
  (() => {
    const components = Array.prototype.map.call(
      document.querySelectorAll(".range-slider"),
      (node) => {
        return new RangeSlider(node);
      }
    );

    if (
      callbackWhenInitialized &&
      typeof callbackWhenInitialized === "function"
    ) {
      callbackWhenInitialized(components);
    }
  })();
}

document.addEventListener("DOMContentLoaded", renderComponent);
