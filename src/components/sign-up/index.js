import { renderComponents, renderComponent } from "../../assets/helpers/utils";
import MaskedTextField from "../masked-text-field";
import "../input";
import "../radio-buttons";
import "../toggle-button";
import "../button";

import "./sign-up.scss";

export default class SignUp {
  static CLASS_NAME = "SIGN_UP";

  static renderComponents(props = {}) {
    const { parents, query, render } = props;
    renderComponents({
      parents,
      query: query || ".js-sign-up",
      render: render || SignUp._renderComponent,
    });
  }

  static _renderComponent() {
    renderComponent({
      element: arguments[1],
      className: SignUp.CLASS_NAME,
      someClass: SignUp,
    });
  }

  constructor(element) {
    this._element = element;
    this._$element = $(element);
    this._init();
  }

  _init() {
    MaskedTextField.renderComponents({ parents: this._$element });
  }
}
