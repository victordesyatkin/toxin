import { renderComponents } from "../../assets/helpers/utils";

import "./input.scss";

export default class Input {
  static renderComponents(parents) {
    renderComponents({
      parents,
      render: Input.renderComponent,
      query: ".js-input",
    });
  }

  static renderComponent() {
    new Input(arguments[1]);
  }

  constructor(el) {
    this._el = el;
    this._$el = $(el);
    this._init();
  }

  _init() {
    this._$el.on("focusin", this._focusIn.bind(this));
    this._$el.on("focusout", this._focusOut.bind(this));
  }

  _focusIn() {
    $(".js-input__section", this._$el).addClass("input__section_hovered");
  }
  _focusOut() {
    $(".js-input__section", this._$el).removeClass("input__section_hovered");
  }
}
