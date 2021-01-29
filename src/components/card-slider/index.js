import { renderComponents } from "../../assets/helpers/utils";
import Slider from "../slider";
import CardHeader from "../card-header";
import RateButton from "../rate-button";

import "./card-slider.scss";

export default class CardSlider {
  static renderComponents(props = {}) {
    const { parents, query, render } = props;
    renderComponents({
      parents,
      query: query || ".js-card-slider",
      render: render || CardSlider._renderComponent,
    });
  }

  static _renderComponent() {
    new CardSlider(arguments[1]);
  }

  constructor(element) {
    this._element = element;
    this._$element = $(element);
    this._init();
  }

  _init() {
    const parents = this._$element;
    Slider.renderComponents({ parents });
    CardHeader.renderComponents({ parents });
    RateButton.renderComponents({ parents });
  }
}
