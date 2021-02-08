import upperFirst from "lodash/upperFirst";
import bind from "bind-decorator";

import { renderComponents, renderComponent } from "../../assets/helpers/utils";
import MaskedTextField from "../masked-text-field";
import Calendar from "../calendar";
import "./date-dropdown.scss";

class DateDropdown {
  static CLASS_NAME = "DATE_DROPDOWN";
  static TYPE_CLEAN = 0;
  static TYPE_APPLY = 1;
  static IS_CALENDAR = 1;
  static TYPES = ["start", "end"];

  static renderComponents(props = {}) {
    const { parents, query, render } = props;
    renderComponents({
      parents,
      query: query || ".js-date-dropdown",
      render: render || DateDropdown._renderComponent,
    });
  }

  static _renderComponent() {
    renderComponent({
      element: arguments[1],
      className: DateDropdown.CLASS_NAME,
      someClass: DateDropdown,
    });
  }

  constructor(element) {
    this._element = element;
    this._$element = $(element);
    this._init();
  }

  _init() {
    MaskedTextField.renderComponents({ parents: this._$element });
    Calendar.renderComponents({ parents: this._$element });
    this._$sections = $(".js-input__section", this._$element);
    this._inputStart = $(".js-input__input", this._$sections.get(0));
    this._inputStart.attr("disabled", true);
    this._inputEnd = $(".js-input__input", this._$sections.get(1));
    this._inputEnd.attr("disabled", true);
    this._$sections.on("click", this._handleInputClick);
    this._$calendar = $(".js-date-dropdown__section-calendar", this._$element);
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
    this._buttonClean.on("click", this._handleCleanButtonClick);
    this._buttonApply.on("click", this._handleApplyButtonClick);
    $(document).on("click", this._handleDocumentClick);
  }

  _setZIndex(value) {
    this._$calendar.css({ "z-index": value });
  }

  @bind
  _handleInputClick() {
    if (this._$calendar.is(":visible")) {
      this._$calendar.slideUp("fast", this._setZIndex.bind(this, ""));
    } else {
      this._setZIndex(99);
      this._$calendar.slideDown("fast");
    }
  }

  _handleCleanButtonClick() {
    this._setValue("start", "");
    this._setValue("end", "");
  }

  @bind
  _handleApplyButtonClick(isToggle = true) {
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
    isToggle && this._handleInputClick();
  }

  _prepareDate(date) {
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
  }

  _value2Date(value) {
    const parts = value.split(".");
    const partDay = parseFloat(parts[0]);
    const partMonth = parseFloat(parts[1]);
    const partYear = parseFloat(parts[2]);
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
  }

  @bind
  _handleDocumentClick(event) {
    const targetClass = `.${$(event.target, this._$element).attr("class")}`;
    if (
      !$(event.target).closest(this._$element).length &&
      !$(event.target, this._$element).hasClass("datepicker--cell") &&
      !$(targetClass, this._$element).length
    ) {
      this._datepicker.hide();
    }
  }

  _setDates({ start, end } = {}) {
    if (!start && end) {
      start = new Date(end);
      start.setDate(start.getDate() - 1);
    }
    if (start && !end) {
      end = new Date(start);
      end.setDate(end.getDate() + 1);
    }
    this._datepicker.selectDate([start, end]);
  }

  _getValue(type = "") {
    if (this._checkType(type)) {
      return this[`_input${upperFirst(type)}`].val();
    }
    return "";
  }

  _setValue(type = "", value = "") {
    if (this._checkType(type)) {
      return this[`_input${upperFirst(type)}`].val(value);
    }
    return "";
  }

  _checkType(type = "") {
    return DateDropdown.TYPES.indexOf(type) > -1;
  }
}

export default DateDropdown;
