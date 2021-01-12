import { renderComponents } from "../../assets/helpers/utils";
import MaskedTextField from "../masked-text-field";

import "./sign-in.scss";

export default class SignIn {
  static renderComponents(props = {}) {
    const { parents, query, render } = props;
    renderComponents({
      parents,
      query: query || ".js-sign-in",
      render: render || SignIn._renderComponent,
    });
  }

  static _renderComponent() {
    new SignIn(arguments[1]);
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
