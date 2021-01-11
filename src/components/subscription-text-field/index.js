import { renderComponents } from "../../assets/helpers/utils";
import MaskedTextField from "../masked-text-field";

import "./subscription-text-field.scss";
export default class SubscriptionTextField {
  static renderComponents(props = {}) {
    const { parents, query, render } = props;
    renderComponents({
      parents,
      query: query || ".js-subscription-text-field",
      render: render || SubscriptionTextField.renderComponent,
    });
  }

  static renderComponent() {
    new SubscriptionTextField(arguments[1]);
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
