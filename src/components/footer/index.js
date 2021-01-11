import { renderComponents } from "../../assets/helpers/utils";
import SubscriptionTextField from "../subscription-text-field";

import "./footer.scss";

export default class Footer {
  static renderComponents(props = {}) {
    console.log("props : ", props);
    const { parents } = props;
    renderComponents({
      parents,
      query: ".js-footer",
      render: Footer.renderComponent,
    });
  }

  static renderComponent() {
    console.log("renderComponent : ", arguments[1]);
    new Footer(arguments[1]);
  }

  constructor(element) {
    this._element = element;
    this._$element = $(element);
    this._init();
  }

  _init() {
    console.log("this._$element : ", this._$element);
    SubscriptionTextField.renderComponents({ parents: this._$element });
  }
}
