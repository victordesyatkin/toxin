import { renderComponents } from "../../assets/helpers/utils";
import SubscriptionTextField from "../subscription-text-field";

import "./footer.scss";

export default class Footer {
  static renderComponents(props = {}) {
    const { parents } = props;
    renderComponents({
      parents,
      query: ".js-footer",
      render: Footer.renderComponent,
    });
  }

  static renderComponent() {
    new Footer(arguments[1]);
  }

  constructor(element) {
    this._element = element;
    this._$element = $(element);
    this._init();
  }

  _init() {
    SubscriptionTextField.renderComponents({ parents: this._$element });
  }
}
