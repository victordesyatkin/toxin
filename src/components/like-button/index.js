import { renderComponents } from "../../assets/helpers/utils";

import "./like-button.scss";

export default class LikeButton {
  static renderComponents(props = {}) {
    const { parents, query, render } = props;
    renderComponents({
      parents,
      query: query || ".js-like-button__button",
      render: render || LikeButton.renderComponent,
    });
  }

  static renderComponent() {
    new LikeButton(arguments[1]);
  }

  constructor(component) {
    this.component = component;
    this.input = this.component.querySelector(".js-like-button__input");
    this.count = this.component.querySelector(".js-like-button__count");
    this._attachEventHandlers();
  }

  _attachEventHandlers() {
    this.input &&
      this.input.addEventListener &&
      this.input.addEventListener("click", this._toggleCount);
  }

  _toggleCount = () => {
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
