import get from "lodash/get";

import { renderComponents } from "../../assets/helpers/utils";

import "./range-slider.scss";

export default class RangeSlider {
  static TYPES = ["start", "end"];

  static renderComponents(parents) {
    renderComponents({
      parents,
      query: ".js-range-slider",
      render: RangeSlider.renderComponent,
    });
  }

  static renderComponent() {
    new RangeSlider(arguments[1]);
  }

  constructor(component) {
    this._component = component;
    this._init();
  }

  _init() {
    this._nodeListInputs = this._component.querySelectorAll("input") || [];
    this._inputs = {
      start: this._nodeListInputs[0],
      end: this._nodeListInputs[1],
    };
    this._nodeListPoints = this._component.querySelectorAll(
      ".js-range-slider__point"
    );
    this._points = {
      start: this._nodeListPoints[0],
      end: this._nodeListPoints[1],
    };
    this._startPoint = this._nodeListPoints[0];
    this._endPoint = this._nodeListPoints[1];
    this._fullTrack = this._component.querySelector(
      ".js-range-slider__section-body"
    );
    setTimeout(() => {
      this._pointWidth = parseFloat(this._startPoint.offsetWidth);
      this._maxTrackLength = parseFloat(this._fullTrack.offsetWidth);
      this._track = this._component.querySelector(".js-range-slider__track");
      this._info = this._component.querySelector(".js-range-slider__info");
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
    }, 500);
  }

  _ondrag() {
    return false;
  }

  _attachPointHandlers(el) {
    el.addEventListener("ondrag", this._ondrag);
    el.addEventListener("ondragdrop", this._ondrag);
    el.addEventListener("ondragstart", this._ondrag);
  }

  _attachEventHandlers() {
    if (!this._component) {
      return false;
    }
    this._component.addEventListener("mousedown", this._mousedown.bind(this));
    this._component.addEventListener("mouseenter", this._mouseenter.bind(this));
    document.addEventListener("mouseleave", this._mouseleave.bind(this));
    document.addEventListener("mouseup", this._mouseup.bind(this));
    document.addEventListener("mousemove", this._mousemove.bind(this));
    window.addEventListener("resize", this._resize.bind(this));
    Array.prototype.forEach.call(
      this._nodeListPoints,
      this._attachPointHandlers.bind(this)
    );
  }

  _setInputs({ start, end } = {}) {
    if (typeof start !== "undefined") {
      this._setValue("start", start);
    }
    if (typeof end !== "undefined") {
      this._setValue.setValue("end", end);
    }
  }

  _renderTrack() {
    const start = this._getPoint("start");
    const end = this._getPoint("end");
    const additive = this._pointWidth / 2;
    this._track.style.left = `${start + additive}px`;
    this._track.style.right = `${this._maxTrackLength - end - additive}px`;
  }

  _setPoints({ start, end } = {}) {
    if (typeof start !== "undefined") {
      this._setPoint("start", start);
    }
    if (typeof end !== "undefined") {
      this._setPoint("end", end);
    }
  }

  _getOptionsInfo() {
    const { style = "decimal", currency = "RUB", unit = "&#8381;" } =
      get(this, ["_options", "info"], {}) || {};
    return {
      style,
      currency,
      minimumFractionDigits: 0,
      unit,
    };
  }

  _setInfo({ start, end } = {}) {
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
  }

  _setValue(type = "", value = 0) {
    if (RangeSlider.TYPES.indexOf(type) === -1) {
      return false;
    }
    this._inputs[type].setAttribute("value", value);
  }

  _getValue(type = "") {
    if (RangeSlider.TYPES.indexOf(type) === -1) {
      return false;
    }
    return parseFloat(this._inputs[type].getAttribute("value"));
  }

  _setPoint(type = "", value = 0) {
    if (RangeSlider.TYPES.indexOf(type) === -1) {
      return false;
    }
    this._points[type].style.left = `${value}px`;
  }

  _getPoint(type = "") {
    if (RangeSlider.TYPES.indexOf(type) === -1) {
      return false;
    }
    return parseFloat(this._points[type].style.left) || 0;
  }

  _calculateCoordinate(v = 1) {
    return v / this._k;
  }

  _calculateValue(c = 1) {
    return c * this._k;
  }

  _calculateK() {
    this._k = this._max / this._maxTrackLength;
  }

  _mouseenter() {}

  _mouseleave() {
    this._type = "";
  }

  _mouseup(e) {
    this._type = "";
  }

  _mousedown(e) {
    e.preventDefault();
    this._type = this._getTypePoint(e);
  }

  _mousemove(e) {
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
  }

  _getTypePoint(e = {}) {
    const { type } = e.target.dataset || {};
    if (RangeSlider.TYPES.indexOf(type) === -1) {
      return "";
    }
    return type;
  }

  _resize() {
    this._maxTrackLength = parseFloat(this._fullTrack.offsetWidth);
    this._calculateK();
    this._shiftX = this._component.getBoundingClientRect().left;
    this._setPoints({
      start:
        this._calculateCoordinate(this._getValue("start")) -
        this._pointWidth / 2,
      end:
        this._calculateCoordinate(this._getValue("end")) - this._pointWidth / 2,
    });
    this._renderTrack();
  }
}
