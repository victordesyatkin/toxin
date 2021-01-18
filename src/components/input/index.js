import { renderComponents, renderComponent } from "../../assets/helpers/utils";

import "./input.scss";

export default class Input {
  static CLASS_NAME = "INPUT";
  static renderComponents(props = {}) {
    const { parents, query, render } = props;
    renderComponents({
      parents,
      query: query || ".js-input",
      render: render || Input._renderComponent,
    });
  }

  static _renderComponent() {
    renderComponent({
      element: arguments[1],
      className: Input.CLASS_NAME,
      someClass: Input,
    });
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
    $(".js-input__section", this._$element).addClass("input__section_focused");
  }
  _focusOut() {
    $(".js-input__section", this._$element).removeClass(
      "input__section_focused"
    );
  }
}
