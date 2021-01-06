import get from "lodash/get";

import "./slider.scss";

class Slider {
  static TYPE_BUTTON_PREV = 1;
  static TYPE_BUTTON_NEXT = 2;
  static TYPES_BUTTONS = [1, 2];

  constructor(component) {
    this._$component = $(component);
    this._init();
  }

  _init() {
    this._props = this._$component.data("props");
    this._images = get(this._props, ["images"]) || [];
    this._length = this._images.length;
    this._$points = $(".js-slider__point", this._$component);
    this._$prev = $(
      `[data-type="${Slider.TYPE_BUTTON_PREV}"]`,
      this._$component
    );
    this._$prev.on("click", this._onClickControl.bind(this, 1));
    this._$next = $(
      `[data-type="${Slider.TYPE_BUTTON_NEXT}"]`,
      this._$component
    );
    this._$next.on("click", this._onClickControl.bind(this, 2));
    this._$image = $(".js-slider__section-images img", this._$component);
    this._index = 0;
    this._$points.on("click", this._onClickPoint.bind(this));
    this._setImage(this._index);
    this._setPoint(this._index);
  }

  _onClickPoint(e) {
    e.preventDefault();
    const index = get($(e.target).data(), ["index"]);
    if (typeof index !== "undefined" && this.index !== index) {
      this._cleanPoint(this._index);
      this._index = index;
      this._setImage(this._index);
      this._setPoint(this._index);
    }
  }

  _onClickControl(type = 0, e) {
    e.preventDefault();
    if (Slider.TYPES_BUTTONS.indexOf(type) === -1) {
      return false;
    }
    let k = type === 1 ? -1 : 1;
    this._cleanPoint(this._index);
    this._changeIndex(k);
    this._setImage(this._index);
    this._setPoint(this._index);
  }

  _setImage(index) {
    let src = get(this._images, [index, "src"]) || "";
    let alt = get(this._images, [index, "alt"]) || "";
    this._$image.attr({ src, alt });
  }

  _setPoint(index) {
    $(this._$points.get(index)).addClass("slider__point_full");
  }

  _cleanPoint(index) {
    $(this._$points.get(index)).removeClass("slider__point_full");
  }

  _changeIndex(k) {
    let index = this._index + 1 * k;
    if (index < 0) {
      index = this._length - 1;
    } else if (index >= this._length) {
      index = 0;
    }
    this._index = index;
  }
}

function renderItem(component) {
  return new Slider(component);
}

function renderItems() {
  const components = Array.prototype.map.call($(".js-slider"), renderItem);
}

document.addEventListener("DOMContentLoaded", renderItems);
