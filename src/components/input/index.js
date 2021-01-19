import { renderComponents, renderComponent } from "../../assets/helpers/utils";

import "./input.scss";

class Input {
  static CLASS_NAME = "INPUT";
  static renderComponents(props = {}) {
    const { parents, query, render } = props;
    return renderComponents({
      parents,
      query: query || ".js-input",
      render: render || Input._renderComponent,
    });
  }

  static _renderComponent() {
    return renderComponent({
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

  toggleStraight() {
    if (this._$element.hasClass("input_straight")) {
      this._$element.removeClass("input_straight");
    } else {
      this._$element.addClass("input_straight");
    }
  }

  toggleExpand() {
    if (this._$element.hasClass("input_expanded")) {
      this._$element.removeClass("input_expanded");
    } else {
      this._$element.addClass("input_expanded");
    }
  }

  get input() {
    return this._input;
  }

  _init() {
    this._$element.on("focusin", this._handleInputFocusIn.bind(this));
    this._$element.on("focusout", this._handleInputFocusOut.bind(this));
    this._input = $("input", this._$element);
  }

  _handleInputFocusIn() {
    $(".js-input__section", this._$element).addClass("input__section_focused");
  }

  _handleInputFocusOut() {
    $(".js-input__section", this._$element).removeClass(
      "input__section_focused"
    );
  }
}

export default Input;
