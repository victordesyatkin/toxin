import "normalize.css";

import { renderComponents, renderComponent } from "../../assets/helpers/utils";
import Footer from "../../components/footer";
import "../../components/layout";
import "../../components/header";
import "../../theme/global.scss";
import "./base.scss";

class Base {
  static CLASS_NAME = "BASE";

  static renderComponents(props = {}) {
    const { parents, query, render } = props;
    renderComponents({
      parents,
      query: query || "body",
      render: render || SignIn._renderComponent,
    });
  }

  static _renderComponent() {
    renderComponent({
      element: arguments[1],
      className: Base.CLASS_NAME,
      someClass: Base,
    });
  }

  constructor(element) {
    this._element = element;
    this._$element = $(element);
    this._init();
  }

  _init() {
    Footer.renderComponents({ parents: this._$element });
  }
}

export default Base;
