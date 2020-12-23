import "./rate-button.scss";

class RateButton {
  constructor(component) {
    this.component = component;
    this.count = this.component.dataset.count;
    this.input = this.component.querySelector("input");
    this._off = $(this.component).data("off");
    !this._off && this._attachEventHandlers();
  }

  _attachEventHandlers() {
    this.component &&
      this.component.addEventListener("click", this._toggleCount);
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
        const prev = this.component.querySelector(`[data-index="${i}"]`);
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
        const prev = this.component.querySelector(`[data-index="${i}"]`);
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

export default function renderComponent(callbackWhenInitialized) {
  (() => {
    const buttons = Array.prototype.map.call(
      document.querySelectorAll(".js-rate-button__button"),
      (node) => {
        return new RateButton(node);
      }
    );

    if (
      callbackWhenInitialized &&
      typeof callbackWhenInitialized === "function"
    ) {
      callbackWhenInitialized(buttons);
    }
  })();
}

$(renderComponent);
