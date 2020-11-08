import "./like-button.scss";

class LikeButton {
  constructor(component) {
    this.component = component;
    this.input = this.component.querySelector("input");
    this.count = this.component.querySelector(".like-button__count");
    this._attachEventHandlers();
  }

  _attachEventHandlers() {
    this.input &&
      this.input.addEventListener &&
      this.input.addEventListener("click", this._toggleCount);
  }

  _toggleCount = (event) => {
    if (
      this.input &&
      this.input.checked !== undefined &&
      this.count &&
      this.count.innerHTML &&
      !isNaN(parseFloat(this.count.innerHTML))
    ) {
      if (this.input.checked) {
        this.count.innerHTML = parseFloat(this.count.innerHTML) + 1;
      } else {
        this.count.innerHTML =
          parseFloat(this.count.innerHTML) > 0
            ? parseFloat(this.count.innerHTML) - 1
            : this.count.innerHTML;
      }
    }
  };
}

export default function renderComponent(callbackWhenInitialized) {
  (() => {
    const buttons = Array.prototype.map.call(
      document.querySelectorAll(".like-button__button"),
      (node) => {
        return new LikeButton(node);
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

document.addEventListener("DOMContentLoaded", renderComponent);
