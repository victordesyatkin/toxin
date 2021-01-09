import { renderComponents } from "../../assets/helpers/utils";
import LikeButton from "../like-button";

import "./like-buttons.scss";

export default class LikeButtons {
  static renderComponents(parents) {
    renderComponents({
      parents,
      query: ".js-like-buttons",
      render: LikeButtons.renderComponent,
    });
  }

  static renderComponent() {
    new LikeButtons(arguments[1]);
  }

  constructor(el) {
    this._el = el;
    this._$el = $(el);
    this._init();
  }

  _init() {
    LikeButton.renderComponents(this._$el);
  }
}
