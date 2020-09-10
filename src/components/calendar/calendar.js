import datepicker from "air-datepicker";
import get from "lodash/get";

import "./calendar.scss";

class Calendar {
  constructor(component) {
    this._component = component;
    this._$component = $(component);
    this._$input = $("input", this._$component);
    this._init();
  }
}

Calendar.prototype._options = {
  inline: true,
  language: "ru",
  navTitles: {
    days: "MM yyyy",
    months: "yyyy",
    years: "yyyy1 - yyyy2",
  },
  nextHtml: '<span class="icon-arrow_forward"></span>',
  prevHtml: '<span class="icon-arrow_prev"></span>',
};

Calendar.prototype._init = function () {
  this._options = {
    ...this._options,
    ...get(this._$component.data(), ["options"]),
  };
  this._datepicker = this._$input.datepicker(this._options);
};

function renderComponent() {
  const components = [];
  $(".calendar", "body").each(function () {
    components.push(new Calendar(this));
  });
}

renderComponent();
