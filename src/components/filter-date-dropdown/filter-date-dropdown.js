import get from "lodash/get";
import "./filter-date-dropdown.scss";

class FilterDateDropdown {
  constructor(component) {
    this._component = component;
    this._$component = $(component);
    this._init();
  }
}

FilterDateDropdown.prototype._prepareDate = function (date) {
  if (!date) {
    return this._dummy;
  }
  date = new Date(date);
  date = date
    .toLocaleString("ru", { day: "2-digit", month: "short" })
    .replace(".", "");
  return date;
};

FilterDateDropdown.prototype._changeFake = function () {
  const selectedDates = this._$input.val();
  const [start, end] = (selectedDates && JSON.parse(selectedDates)) || [];
  this._$fake.val(
    `${this._prepareDate(start)} ${this._separator} ${this._prepareDate(end)}`
  );
};

FilterDateDropdown.prototype._handlerClean = function () {
  this._$input.val("");
  this._changeFake();
};

FilterDateDropdown.prototype._handlerApply = function () {
  const selectedDates = this._datepicker.selectedDates || [];
  const [start, end] = selectedDates;
  this._$input.val(JSON.stringify(selectedDates));
  this._changeFake();
  this._toggleMainBlock();
};

FilterDateDropdown.prototype._toggleMainBlock = function () {
  if (this._forcedVisible) {
    return false;
  }
  this._$mainBlock.fadeToggle("fast");
  this._$component.toggleClass("filter-date-dropdown_expanded");
};

FilterDateDropdown.prototype._handlerClickDocument = function (event) {
  if (this._forcedVisible) {
    return false;
  }
  const classTarget = `.${$(event.target, this._$component).attr("class")}`;
  if (
    !$(event.target).closest(this._component).length &&
    !$(event.target, this._$component).hasClass("datepicker--cell") &&
    !$(classTarget, this._$component).length
  ) {
    this._$mainBlock.slideUp();
    this._$component.removeClass("filter-date-dropdown_expanded");
  }
};

FilterDateDropdown.prototype._init = function () {
  this._options = this._$component.data("options");
  this._dummy = this._options.dummy || "ДД МЕС";
  this._separator = this._options.separator || "-";
  this._$fake = $('input[data-type="0"]', this._$component);
  this._$sectionUp = $(".filter-date-dropdown__section-up", this._$component);
  this._$sectionUp.on("click", this._toggleMainBlock.bind(this));
  this._$mainBlock = $('div[data-type="3"]', this._$component);
  this._$input = $('input[type="hidden"][data-type="1"]', this._$component);
  this._datepicker = $(
    'input[type="hidden"][date-iscalendar="1"]',
    this._$component
  )
    .datepicker()
    .data("datepicker");
  this._buttonClean = $('button[data-type="0"]', this._$component);
  this._buttonApply = $('button[data-type="1"]', this._$component);
  this._buttonClean.on("click", this._handlerClean.bind(this));
  this._buttonApply.on("click", this._handlerApply.bind(this));
  $(document).on("click", this._handlerClickDocument.bind(this));
  this._forcedVisible = this._$component.hasClass(
    "filter-date-dropdown_forced-expanded"
  );
  this._setDates(this._getValue());
  this._changeFake();
};

FilterDateDropdown.prototype._setDates = function ([start, end] = []) {
  if (!start && !end) {
    return false;
  }
  this._datepicker.selectDate([new Date(start), new Date(end)]);
};

FilterDateDropdown.prototype._setValue = function (value = []) {
  this._$input.val(JSON.stringify(value));
};

FilterDateDropdown.prototype._value2Date = function (value) {
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

FilterDateDropdown.prototype._getValue = function () {
  if (localStorage && localStorage.getItem("landingPage")) {
    let landingPage = localStorage.getItem("landingPage") || "{}";
    landingPage = JSON.parse(landingPage);
    let { startDate, endDate } = landingPage;
    if (!isNaN(parseFloat(startDate)) && !isNaN(parseFloat(endDate))) {
      startDate = this._value2Date(startDate);
      endDate = this._value2Date(endDate);
      this._setValue([startDate, endDate]);
      if (startDate && endDate) {
        return [startDate, endDate];
      }
    }
  }
  return JSON.parse(this._$input.val() || "[]");
};

function renderComponent() {
  const components = Array.prototype.map.call(
    $(".filter-date-dropdown"),
    (element) => {
      return new FilterDateDropdown(element);
    }
  );
  return components;
}

document.addEventListener("DOMContentLoaded", renderComponent);
