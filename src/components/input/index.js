import { renderComponents } from "../../assets/helpers/utils";

import "./input.scss";

export default class Input {
  static renderComponents(props = {}) {
    const { parents, query, render } = props;
    renderComponents({
      parents,
      query: query || ".js-input",
      render: render || Input._renderComponent,
    });
  }

  static _renderComponent() {
    new Input(arguments[1]);
  }

  constructor(element) {
    this._element = element;
    this._$element = $(element);
    this._init();
  }

  _init() {
    this._$element.on("focusin", this._focusIn.bind(this));
    this._$element.on("focusout", this._focusOut.bind(this));
  }

  _focusIn() {
    $(".js-input__section", this._$element).addClass("input__section_hovered");
  }
  _focusOut() {
    $(".js-input__section", this._$element).removeClass(
      "input__section_hovered"
    );
  }
}
