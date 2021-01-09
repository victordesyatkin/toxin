import get from "lodash/get";
import { wordForm, renderComponents } from "../../assets/helpers/utils";

import("./comments.scss");

export default class Comments {
  static renderComponents(parents) {
    renderComponents({
      parents,
      query: ".js-comments",
      render: Comments.renderComponent,
    });
  }
  renderComponent() {
    new Comments(arguments[1]);
  }

  constructor(el) {
    this._el = el;
    this._$el = $(el);
    this._init();
  }

  _init() {
    const data = this._$el.data();
    const units = get(data, ["units"]) || [];
    const count = get(data, ["count"]) || [];
    const $units = $(".js-comments__count-units", this._$el);
    if (units.length) {
      $units.html(wordForm(count, units));
    }
  }
}
