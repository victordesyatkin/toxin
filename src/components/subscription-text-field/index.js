import { renderComponents } from "../../assets/helpers/utils";
import MaskedTextField from "../masked-text-field";

import "./subscription-text-field.scss";
export default class SubscriptionTextField {
  static renderComponents(parents) {
    renderComponents({
      parents,
      render: SubscriptionTextField.renderComponent,
      query: ".js-subscription-text-field",
    });
  }

  static renderComponent() {
    new SubscriptionTextField(arguments[1]);
  }

  constructor(el) {
    this._el = el;
    this._$el = $(el);
    this._init();
  }

  _init() {
    MaskedTextField.renderComponents(this._$el);
  }
}
