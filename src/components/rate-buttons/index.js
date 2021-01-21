import { renderComponents, renderComponent } from "../../assets/helpers/utils";
import RateButton from "../rate-button";
import "./rate-buttons.scss";
class RateButtons {
  static CLASS_NAME = "RATE_BUTTONS";

  static renderComponents(props = {}) {
    const { parents, query, render } = props;
    renderComponents({
      parents,
      query: query || ".js-rate-buttons",
      render: render || RateButtons._renderComponent,
    });
  }

  static _renderComponent() {
    renderComponent({
      element: arguments[1],
      className: RateButtons.CLASS_NAME,
      someClass: RateButtons,
    });
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

export default RateButtons;
