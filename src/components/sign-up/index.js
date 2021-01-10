import { renderComponents } from "../../assets/helpers/utils";
import MaskedTextField from "../masked-text-field";

import "./sign-up.scss";

export default class SignUp {
  static renderComponents(props = {}) {
    const { parents } = props;
    renderComponents({
      parents,
      query: ".js-sign-up",
      render: Picker.renderComponent,
    });
  }

  static renderComponent() {
    new SignUp(arguments[1]);
  }

  constructor(el) {
    this._el = el;
    this._$el = $(el);
    this._init();
  }

  _init() {
    MaskedTextField.renderComponents(this._$el);
    Dropdown.renderComponents(this._$el);
  }
}
