import { renderComponents } from "../../assets/helpers/utils";

import "./rate-button.scss";

export default class RateButton {
  static renderComponents(props = {}) {
    const { parents, query, render } = props;
    renderComponents({
      parents,
      query: query || ".js-rate-button__button",
      render: render || RateButton.renderComponent,
    });
  }

  static renderComponent() {
    new RateButton(arguments[1]);
  }

  constructor(element) {
    this._element = component;
    this.count = this._element.dataset.count;
    this.input = this._element.querySelector("input");
    this._off = $(this._element).data("off");
    !this._off && this._attachEventHandlers();
  }

  _attachEventHandlers() {
    this._element && this._element.addEventListener("click", this._toggleCount);
  }

  _toggleCount = (event) => {
    let el = (event || {}).target;
    if (!el || !this.input) {
      return null;
    }
    if (el.tagName === "IMG") {
      el = el.closest("div.js-rate-button__rate");
    }
    let { rate, index } = el.dataset || {};
    rate = parseFloat(rate);
    index = parseFloat(index);
    if (!rate) {
      this.input.value = index;
      for (let i = 1; i <= index; i++) {
        const prev = this._element.querySelector(`[data-index="${i}"]`);
        prev.dataset.rate = 1;
        const classList = prev.classList;
        if (
          Array.prototype.indexOf.call(
            classList,
            "js-rate-button__rate_checked"
          ) === -1
        ) {
          prev.classList.add("rate-button__rate_checked");
        }
      }
    } else if (rate && index) {
      this.input.value = index - 1;
      el.dataset.rate = 0;
      el.classList.remove("rate-button__rate_checked");
      for (let i = this.count; i >= index; i--) {
        const prev = this._element.querySelector(`[data-index="${i}"]`);
        prev.dataset.rate = 0;
        const classList = prev.classList;
        if (
          Array.prototype.indexOf.call(classList, "rate-button__rate_checked") >
          -1
        ) {
          prev.classList.remove("rate-button__rate_checked");
        }
      }
    }
  };
}
