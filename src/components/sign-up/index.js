import { renderComponents } from "../../assets/helpers/utils";
import MaskedTextField from "../masked-text-field";

import "./sign-up.scss";

export default class SignUp {
  static renderComponents(props = {}) {
    const { parents } = props;
    renderComponents({
      parents,
      query: ".js-sign-up",
      render: SignUp.renderComponent,
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
