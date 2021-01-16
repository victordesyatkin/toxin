import { renderComponents, renderComponent } from "../../assets/helpers/utils";

import SignUp from "../../components/sign-up";
import Footer from "../../components/footer";

import "../../components/card";

import "./index";
export default class Registration {
  static CLASS_NAME = "REGISTRATION";

  static renderComponents(props = {}) {
    const { parents, query, render } = props;
    renderComponents({
      parents,
      query: query || ".js-registration",
      render: render || Registration._renderComponent,
    });
  }

  static _renderComponent() {
    renderComponent({
      element: arguments[1],
      className: Registration.CLASS_NAME,
      someClass: Registration,
    });
  }

  constructor(element) {
    this._element = element;
    this._$element = $(element);
    this._init();
  }

  _init() {
    SignUp.renderComponents({ parents: this._$element });
    Footer.renderComponents();
  }
}

window.addEventListener("load", Registration.renderComponents);
