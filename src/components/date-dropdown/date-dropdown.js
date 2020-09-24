import get from "lodash/get";
import "./date-dropdown.scss";

class DateDropdown {
  constructor(component) {
    this._component = component;
    this._$component = $(component);
    this._init();
  }
}

DateDropdown.prototype._toggleVisibleCalendar = function () {
  if (get(this._datepicker, ["visible"])) {
    this._datepicker.hide();
  } else {
    this._datepicker.show();
  }
};

DateDropdown.prototype._handlerClean = function () {
  this._inputStart.val("");
  this._inputEnd.val("");
};

DateDropdown.prototype._handlerApply = function () {
  const [start, end] = this._datepicker.selectedDates;
  if (start) {
    this._inputStart.val(this._prepareDate(start));
  } else {
    this._inputStart.val("");
  }
  if (end) {
    this._inputEnd.val(this._prepareDate(end));
  } else {
    this._inputEnd.val("");
  }
  this._toggleVisibleCalendar();
};

DateDropdown.prototype._prepareDate = function (date) {
  date = new Date(date);
  let day = date.getDate();
  let month = date.getMonth() + 1;
  if (day < 10) {
    day = `0${day}`;
  }
  if (month < 10) {
    month = `0${month}`;
  }
  date = `${day}.${month}.${date.getFullYear()}`;
  return date;
};

DateDropdown.prototype._handlerClickDocument = function (event) {
  const classTarget = `.${$(event.target, this._$component).attr("class")}`;
  if (
    !$(event.target).closest(this._$component).length &&
    !$(event.target, this._$component).hasClass("datepicker--cell") &&
    !$(classTarget, this._$component).length
  ) {
    this._datepicker.hide();
  }
};

DateDropdown.prototype._init = function () {
  this._$sections = $(".input__section", this._$component);
  this._inputStart = $(".input__input", this._$sections.get(0));
  this._inputStart.attr("disabled", true);
  this._inputEnd = $(".input__input", this._$sections.get(1));
  this._inputEnd.attr("disabled", true);
  this._$sections.on("click", this._toggleVisibleCalendar.bind(this));
  this._datepicker = $('input[type="hidden"]', this._$component)
    .datepicker()
    .data("datepicker");
  this._$buttonStart = $("button", this._$sections.get(0));
  this._$buttonEnd = $("button", this._$sections.get(1));
  // this._$buttonStart.on("click", this._toggleVisibleCalendar.bind(this));
  // this._$buttonEnd.on("click", this._toggleVisibleCalendar.bind(this));
  this._buttonClean = $('button[data-type="0"]', this._$component);
  this._buttonApply = $('button[data-type="1"]', this._$component);
  this._buttonClean.on("click", this._handlerClean.bind(this));
  this._buttonApply.on("click", this._handlerApply.bind(this));
  $(document).on("click", this._handlerClickDocument.bind(this));
};

function renderComponent() {
  const components = [];
  Array.prototype.map.call($(".date-dropdown"), function (component) {
    components.push(new DateDropdown(component));
  });
}

renderComponent();
