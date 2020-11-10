import get from "lodash/get";
import "./slider.scss";

class Slider {
  constructor(component) {
    this._$component = $(component);
    this._init();
  }
}

Slider.prototype._init = function () {
  this._props = this._$component.data("props");
  this._defaultSrc = this._$component.data("defaultsrc");
  this._images = get(this._props, ["images"]) || [];
  this._length = this._images.length;
  this._$controls = $(".slider__control", this._$component);
  this._$points = $(".slider__point", this._$component);
  this._$prev = $('[data-type="1"]', this._$component);
  this._$prev.on("click", this._onClickControl.bind(this, 1));
  this._$next = $('[data-type="2"]', this._$component);
  this._$next.on("click", this._onClickControl.bind(this, 2));
  this._$image = $(".slider__section-images img", this._$component);
  this._index = 0;
  this._$points.on("click", this._onClickPoint.bind(this));
  this._setImage(this._index);
  this._setPoint(this._index);
};

Slider.prototype._types = [1, 2];

Slider.prototype._onClickPoint = function (e) {
  const index = get($(e.target).data(), ["index"]);
  if (typeof index !== "undefined" && this.index !== index) {
    this._cleanPoint(this._index);
    this._index = index;
    this._setImage(this._index);
    this._setPoint(this._index);
  }
};

Slider.prototype._onClickControl = function (type = 0) {
  if (this._types.indexOf(type) === -1) {
    return false;
  }
  let k = type === 1 ? -1 : 1;
  this._cleanPoint(this._index);
  this._changeIndex(k);
  this._setImage(this._index);
  this._setPoint(this._index);
};

Slider.prototype._setImage = function (index) {
  let src = get(this._images, [index, "src"]) || {};
  let alt = get(this._images, [index, "alt"]) || "";
  src = this._defaultSrc[src] || src;
  this._$image.attr({ src, alt });
};

Slider.prototype._setPoint = function (index) {
  $(this._$points.get(index)).addClass("slider__point_full");
};

Slider.prototype._cleanPoint = function (index) {
  $(this._$points.get(index)).removeClass("slider__point_full");
};

Slider.prototype._changeIndex = function (k) {
  let index = this._index + 1 * k;
  if (index < 0) {
    index = this._length - 1;
  } else if (index >= this._length) {
    index = 0;
  }
  this._index = index;
};

function renderItem(component) {
  return new Slider(component);
}

function renderItems() {
  const components = Array.prototype.map.call($(".slider"), renderItem);
}

document.addEventListener("DOMContentLoaded", renderItems);
