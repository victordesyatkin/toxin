import { renderComponents, renderComponent } from "../../assets/helpers/utils";
import MaskedTextField from "../masked-text-field";
import "../button";
import "../card-footer";
import "./sign-in.scss";

class SignIn {
  static CLASS_NAME = "SIGN_IN";

  static renderComponents(props = {}) {
    const { parents, query, render } = props;
    renderComponents({
      parents,
      query: query || ".js-sign-in",
      render: render || SignIn._renderComponent,
    });
  }

  static _renderComponent() {
    renderComponent({
      element: arguments[1],
      className: SignIn.CLASS_NAME,
      someClass: SignIn,
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

export default SignIn;
