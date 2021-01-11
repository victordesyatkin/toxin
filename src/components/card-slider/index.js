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
      render: render || CardSlider.renderComponent,
    });
  }

  static renderComponent() {
    new CardSlider(arguments[1]);
  }

  constructor(el) {
    this._el = el;
    this._$el = $(el);
    this._init();
  }

  _init() {
    Slider.renderComponents({ parents: this._$el });
    CardHeader.renderComponents({ parents: this._$el });
    RateButton.renderComponents({ parents: this._$el });
  }
}
