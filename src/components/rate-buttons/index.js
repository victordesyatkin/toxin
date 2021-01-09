import { renderComponents } from "../../assets/helpers/utils";
import RateButton from "../rate-button";

import "./rate-buttons.scss";
export default class RateButtons {
  static renderComponents(parents) {
    renderComponents({
      parents,
      query: ".js-rate-buttons",
      render: RateButtons.renderComponent,
    });
  }

  static renderComponent() {
    new RateButtons(arguments[1]);
  }

  constructor(el) {
    this._el = el;
    this._$el = $(el);
    this._init();
  }

  _init() {
    RateButton.renderComponents(this._$el);
  }
}
