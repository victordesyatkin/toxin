import get from "lodash/get";

import { renderComponents } from "../../assets/helpers/utils";
import "./range-slider.scss";
class RangeSlider {
  static TYPES = ["start", "end"];

  static renderComponents(props = {}) {
    const { parents, query, render } = props;
    renderComponents({
      parents,
      query: query || ".js-range-slider",
      render: render || RangeSlider._renderComponent,
    });
  }

  static _renderComponent() {
    new RangeSlider(arguments[1]);
  }

  constructor(element) {
    this._element = element;
    this._init();
  }

  _init() {
    this._nodeListInputs = this._element.querySelectorAll("input") || [];
    this._inputs = {
      start: this._nodeListInputs[0],
      end: this._nodeListInputs[1],
    };
    this._nodeListPoints = this._element.querySelectorAll(
      ".js-range-slider__point"
    );
    this._points = {
      start: this._nodeListPoints[0],
      end: this._nodeListPoints[1],
    };
    this._startPoint = this._nodeListPoints[0];
    this._endPoint = this._nodeListPoints[1];
    this._fullTrack = this._element.querySelector(
      ".js-range-slider__section-body"
    );
    setTimeout(() => {
      this._pointWidth = parseFloat(this._startPoint.offsetWidth);
      this._maxTrackLength = parseFloat(this._fullTrack.offsetWidth);
      this._track = this._element.querySelector(".js-range-slider__track");
      this._info = this._element.querySelector(".js-range-slider__info");
      this._type = "";
      this._options = JSON.parse(this._element.dataset.options);
      this._min = this._options.min;
      this._max = this._options.max;
      this._separator = this._options.separator;
      this._calculateK();
      this._shiftX = this._element.getBoundingClientRect().left;
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

  _handleBlockDrag() {
    return false;
  }

  _handleBlockDragDrop() {
    return false;
  }

  _handleBlockDragStart() {
    return false;
  }

  _attachPointHandlers(el) {
    el.addEventListener("ondrag", this._handleBlockDrag);
    el.addEventListener("ondragdrop", this._handleBlockDragDrop);
    el.addEventListener("ondragstart", this._handleBlockDragStart);
  }

  _attachEventHandlers() {
    if (!this._element) {
      return false;
    }
    this._element.addEventListener(
      "mousedown",
      this._handleBlockMouseDown.bind(this)
    );
    this._element.addEventListener(
      "mouseenter",
      this._handleBlockMouseEnter.bind(this)
    );
    document.addEventListener(
      "mouseleave",
      this._handleBlockMouseLeave.bind(this)
    );
    document.addEventListener("mouseup", this._handleBlockMouseUp.bind(this));
    document.addEventListener(
      "mousemove",
      this._handleBlockMouseMove.bind(this)
    );
    window.addEventListener("resize", this._handleWindowResize.bind(this));
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

  _handleBlockMouseEnter() {}

  _handleBlockMouseLeave() {
    this._type = "";
  }

  _handleBlockMouseUp(e) {
    this._type = "";
  }

  _handleBlockMouseDown(e) {
    e.preventDefault();
    this._type = this._getTypePoint(e);
  }

  _handleBlockMouseMove(e) {
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

  _handleWindowResize() {
    this._maxTrackLength = parseFloat(this._fullTrack.offsetWidth);
    this._calculateK();
    this._shiftX = this._element.getBoundingClientRect().left;
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

export default RangeSlider;
