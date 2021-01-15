import { renderComponents, renderComponent } from "../../assets/helpers/utils";
import SubscriptionTextField from "../subscription-text-field";
import "../logo-image";
import "../list-links";
import "../subscription-text-field";
import "../copyright";

import "./footer.scss";

export default class Footer {
  static CLASS_NAME = "FOOTER";

  static renderComponents(props = {}) {
    const { parents, query, render } = props;
    console.log("renderComponents : ", props);
    renderComponents({
      parents,
      query: query || ".js-footer",
      render: render || Footer._renderComponent,
    });
  }

  static _renderComponent() {
    console.log("_renderComponent");
    renderComponent({
      element: arguments[1],
      className: Footer.CLASS_NAME,
      someClass: Footer,
    });
  }

  constructor(element) {
    console.log("element : ", element);
    this._element = element;
    this._$element = $(element);
    this._init();
  }

  _init() {
    SubscriptionTextField.renderComponents({ parents: this._$element });
  }
}
