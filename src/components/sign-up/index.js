import { renderComponents } from "../../assets/helpers/utils";
import MaskedTextField from "../masked-text-field";

import "./sign-up.scss";

export default class SignUp {
  static renderComponents(props = {}) {
    const { parents, query, render } = props;
    renderComponents({
      parents,
      query: query || ".js-sign-up",
      render: render || SignUp._renderComponent,
    });
  }

  static renderComponent() {
    new SignUp(arguments[1]);
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
