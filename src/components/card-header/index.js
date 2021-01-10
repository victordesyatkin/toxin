import get from "lodash/get";

import "./card-header.scss";

class CardHeader {
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

const renderComponent = () => {
  const options = { style: "decimal", currency: "RUB" };
  $(".js-card-header").each(function () {
    return new CardHeader(this);
  });
};

document.addEventListener("DOMContentLoaded", renderComponent);
