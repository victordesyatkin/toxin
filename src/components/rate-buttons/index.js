import { renderComponents } from "../../assets/helpers/utils";
import RateButton from "../rate-button";

import "./rate-buttons.scss";
export default class RateButtons {
  static renderComponents(props = {}) {
    const { parents, query, render } = props;
    renderComponents({
      parents,
      query: query || ".js-rate-buttons",
      render: render || RateButtons.renderComponent,
    });
  }

  static renderComponent() {
    new RateButtons(arguments[1]);
  }

  constructor(element) {
    this._element = element;
    this._$element = $(element);
    this._init();
  }

  _init() {
    RateButton.renderComponents({ parents: this._$element });
  }
}
