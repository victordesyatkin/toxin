import get from "lodash/get";

import { renderComponents } from "../../assets/helpers/utils";

import "./card-header.scss";

export default class CardHeader {
  static renderComponents(props = {}) {
    const { parents, query, render } = props;
    renderComponents({
      parents,
      query: query || ".js-card-header",
      render: render || CardHeader.renderComponent,
    });
  }

  static renderComponent() {
    new CardHeader(arguments[1]);
  }

  constructor(el) {
    this._el = el;
    this._$el = $(el);
    this.init();
  }

  init() {
    const data = this._$el.data();
    const numberFormat = get(data, ["numberFormat"]);
    const options = get(data, ["options"]);
    $(".js-card-header__price-content", this._$el).each(function () {
      $(this).html(
        new Intl.NumberFormat(numberFormat, options).format(
          parseFloat($(this).html().replace(" ", ""))
        )
      );
    });
  }
}
