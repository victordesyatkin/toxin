import get from "lodash/get";
import upperFirst from "lodash/upperFirst";

import "./date-dropdown.scss";

class DateDropdown {
  static TYPE_CLEAN = 0;
  static TYPE_APPLY = 1;
  static IS_CALENDAR = 1;

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
    console.log("this.datepicker", this._datepicker);
    this._datepicker.show();
  }
};

DateDropdown.prototype._handlerClean = function () {
  this._setValue("start", "");
  this._setValue("end", "");
};

DateDropdown.prototype._handlerApply = function (isToggle = true) {
  const [start, end] = this._datepicker.selectedDates;
  if (start) {
    this._setValue("start", this._prepareDate(start));
  } else {
    this._setValue("start", "");
  }
  if (end) {
    this._setValue("end", this._prepareDate(end));
  } else {
    this._setValue("end", "");
  }
  isToggle && this._toggleVisibleCalendar();
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

DateDropdown.prototype._value2Date = function (value) {
  const parts = value.split(".");
  const partDay = parts[0];
  const partMonth = parts[1];
  const partYear = parts[2];
  let date = "";
  if (partDay && partMonth && partYear) {
    date = `${partMonth}.${partDay}.${partYear}`;
  }
  if (date) {
    date = new Date(date);
    if (!(date instanceof Date)) {
      date = "";
    }
  }
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
  this._$sections = $(".js-input__section", this._$component);
  this._inputStart = $(".js-input__input", this._$sections.get(0));
  this._inputStart.attr("disabled", true);
  this._inputEnd = $(".js-input__input", this._$sections.get(1));
  this._inputEnd.attr("disabled", true);
  this._$sections.on("click", this._toggleVisibleCalendar.bind(this));
  this._$calendar = $(".js-date-dropdown__section-calendar", this._$component);
  this._datepicker = $(
    `input[type="hidden"][date-isCalendar="${DateDropdown.IS_CALENDAR}"]`,
    this._$calendar
  )
    .datepicker()
    .data("datepicker");
  this._setDates({
    start: this._value2Date(this._getValue("start")),
    end: this._value2Date(this._getValue("end")),
  });
  this._buttonClean = $(
    `button[data-type="${DateDropdown.TYPE_CLEAN}"]`,
    this._$calendar
  );
  this._buttonApply = $(
    `button[data-type="${DateDropdown.TYPE_APPLY}"]`,
    this._$calendar
  );
  this._buttonClean.on("click", this._handlerClean.bind(this));
  this._buttonApply.on("click", this._handlerApply.bind(this));
  $(document).on("click", this._handlerClickDocument.bind(this));
};

DateDropdown.prototype._setDates = function ({ start, end } = {}) {
  if (!start && end) {
    start = new Date(end);
    start.setDate(start.getDate() - 1);
  }
  if (start && !end) {
    end = new Date(start);
    end.setDate(end.getDate() + 1);
  }
  this._datepicker.selectDate([start, end]);
};

DateDropdown.prototype._getValue = function (type = "") {
  if (this._checkType(type)) {
    return this[`_input${upperFirst(type)}`].val();
  }
  return "";
};

DateDropdown.prototype._setValue = function (type = "", value = "") {
  if (this._checkType(type)) {
    return this[`_input${upperFirst(type)}`].val(value);
  }
  return "";
};

DateDropdown.prototype._types = ["start", "end"];

DateDropdown.prototype._checkType = function (type = "") {
  return this._types.indexOf(type) > -1;
};

function renderComponent() {
  const components = [];
  Array.prototype.map.call($(".js-date-dropdown"), function (component) {
    components.push(new DateDropdown(component));
  });
}

document.addEventListener("DOMContentLoaded", renderComponent);
