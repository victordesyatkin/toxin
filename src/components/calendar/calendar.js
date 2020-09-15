import datepicker from "air-datepicker";
import get from "lodash/get";
import isArray from "lodash/isArray";
import "./calendar.scss";

class Calendar {
  constructor(component) {
    this._component = component;
    this._$component = $(component);
    this._$input = $("input", this._$component);
    this._rangeFromDate = "";
    this._init();
  }
}

Calendar.prototype._handlerSelect = function (formattedDate, date, inst) {
  if (Object.prototype.toString.call(date) !== "[object Array]") {
    return false;
  }
  const length = date.length;
  if (length === 1) {
    this._rangeFromDate = new Date(date[0]).getTime();
  } else if (this._rangeFromDate) {
    this._rangeFromDate = "";
  }
  return false;
};

Calendar.prototype._onRenderCell = function (date, cellType) {
  if (
    this._rangeFromDate &&
    cellType === "day" &&
    this._rangeFromDate === new Date(date).getTime()
  ) {
    return {
      classes: "-hide-in-range-",
    };
  }
};

Calendar.prototype._options = {
  inline: true,
  language: "ru",
  range: true,
  navTitles: {
    days: "MM yyyy",
    months: "yyyy",
    years: "yyyy1 - yyyy2",
  },
  nextHtml: '<span class="icon-arrow_forward"></span>',
  prevHtml: '<span class="icon-arrow_prev"></span>',
};

Calendar.prototype._handlerClean = function () {
  this._datepicker.clear();
};

Calendar.prototype._handlerApply = function () {};

Calendar.prototype._toggleVisibleButtonClean = function () {
  const selectedDatesLength = get(this._datepicker, ["selectedDates"], [])
    .length;
  if (
    !this._$buttonClean.hasClass("calendar__button_hide") &&
    !selectedDatesLength
  ) {
    this._$buttonClean.addClass("calendar__button_hide");
  } else if (
    this._$buttonClean.hasClass("calendar__button_hide") &&
    selectedDatesLength
  ) {
    this._$buttonClean.removeClass("calendar__button_hide");
  }
};

Calendar.prototype._handlerClickCalendar = function () {
  this._toggleVisibleButtonClean();
};

Calendar.prototype._init = function () {
  this._options = {
    ...this._options,
    ...get(this._$component.data(), ["options"]),
    onSelect: this._handlerSelect.bind(this),
    onRenderCell: this._onRenderCell.bind(this),
  };
  this._$input.datepicker(this._options);
  this._datepicker = this._$input.datepicker().data("datepicker");
  this._$buttonClean = $(".calendar__button_clean", this._$component).on(
    "click",
    this._handlerClean.bind(this)
  );
  this._$buttonApply = $(".calendar__button_apply", this._$component).on(
    "click",
    this._handlerApply.bind(this)
  );
  this._toggleVisibleButtonClean();
  this._$component.on("click", this._handlerClickCalendar.bind(this));
};

function renderComponent() {
  const components = [];
  $(".calendar", "body").each(function () {
    components.push(new Calendar(this));
  });
}

renderComponent();
