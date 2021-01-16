import { renderComponents, renderComponent } from "../../assets/helpers/utils";
import SignIn from "../../components/sign-in";
import Footer from "../../components/footer";

import "../../components/card";
import "../registration";

import "./registration-sign-in.scss";
export default class RegistrationSignIn {
  static CLASS_NAME = "REGISTRATION_SIGN_IN";

  static renderComponents(props = {}) {
    const { parents, query, render } = props;
    renderComponents({
      parents,
      query: query || ".js-registration__sign-in",
      render: render || RegistrationSignIn._renderComponent,
    });
  }

  static _renderComponent() {
    renderComponent({
      element: arguments[1],
      className: RegistrationSignIn.CLASS_NAME,
      someClass: RegistrationSignIn,
    });
  }

  constructor(element) {
    this._element = element;
    this._$element = $(element);
    this._init();
  }

  _init() {
    SignIn.renderComponents({ parents: this._$element });
    Footer.renderComponents();
  }
}

window.addEventListener("load", RegistrationSignIn.renderComponents);
