import datepicker from "air-datepicker";
import get from "lodash/get";

import "./calendar.scss";

class Calendar {
  static OPTIONS = {
    inline: true,
    language: "ru",
    range: true,
    navTitles: {
      days: "MM yyyy",
      months: "yyyy",
      years: "yyyy1 - yyyy2",
    },
    multipleDates: true,
    nextHtml: '<span class="icon-arrow_forward"></span>',
    prevHtml: '<span class="icon-arrow_prev"></span>',
  };

  constructor(component) {
    this._component = component;
    this._$component = $(component);
    this._$input = $("input", this._$component);
    this._rangeFromDate = "";
    this._init();
  }

  _init() {
    this._options = {
      ...Calendar.OPTIONS,
      ...get(this._$component.data(), ["options"]),
      onSelect: this._handlerSelect.bind(this),
      onRenderCell: this._onRenderCell.bind(this),
      onShow: this._toggleVisibleMain.bind(this),
      onHide: this._toggleVisibleMain.bind(this),
    };
    this._options = this._prepareOptions(this._options);
    this._$input.datepicker(this._options);
    this._datepicker = this._$input.datepicker().data("datepicker");
    this._$main = $(".js-calendar__main", this._$component);
    this._$buttonClean = $(".js-calendar__button_clean", this._$component).on(
      "click",
      this._handlerClean.bind(this)
    );
    this._$buttonApply = $(".js-calendar__button_apply", this._$component).on(
      "click",
      this._handlerApply.bind(this)
    );
    this._$component.on("click", this._handlerClickCalendar.bind(this));
    this._toggleVisibleButtonClean();
    this._isOpen = get(this._$component.data(), ["options", "isOpen"]);
    this._isOpen && this._datepicker.show();
    this._selectDate();
  }

  _handlerSelect(formattedDate, date = {}, inst) {
    if (this._options.range) {
      if (Object.prototype.toString.call(date) !== "[object Array]") {
        return false;
      }
      const length = date.length;
      if (length === 1) {
        this._rangeFromDate = new Date(date[0]).getTime();
      } else if (this._rangeFromDate) {
        this._rangeFromDate = "";
      }
    }
    this._toggleVisibleButtonClean();
    return false;
  }

  _onRenderCell(date, cellType) {
    if (
      this._rangeFromDate &&
      cellType === "day" &&
      this._rangeFromDate === new Date(date).getTime()
    ) {
      return {
        classes: "-hide-in-range-",
      };
    }
  }

  _handlerClean() {
    this._datepicker.clear();
  }

  _handlerApply() {}

  _toggleVisibleButtonClean() {
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
  }

  _toggleVisibleMain() {
    if (get(this._options, ["forceVisible"])) {
      return false;
    }
    const visible = get(this._datepicker, ["visible"]);
    if (visible && this._$main.hasClass("calendar__main_hidden")) {
      this._$main.removeClass("calendar__main_hidden");
    } else if (!visible && !this._$main.hasClass("calendar__main_hidden")) {
      this._$main.addClass("calendar__main_hidden");
      this._$main.removeClass("calendar__main_opened");
    } else if (!visible && this._$main.hasClass("calendar__main_opened")) {
      this._$main.removeClass("calendar__main_opened");
      this._$main.addClass("calendar__main_hidden");
    }
    return false;
  }

  _handlerClickCalendar() {
    this._toggleVisibleButtonClean();
  }

  _prepareOptions(options) {
    options = { ...options };
    const minDateType = get(this._$component.data(), [
      "options",
      "minDateType",
    ]);
    switch (minDateType) {
      case "current": {
        options = { ...options, minDate: new Date() };
        break;
      }
      default: {
      }
    }
    return options;
  }

  _selectDate() {
    let start = this._value2Date(
      get(this._$component.data(), ["options", "start"])
    );
    let end = this._value2Date(
      get(this._$component.data(), ["options", "end"])
    );
    if (end && !start) {
      start = new Date();
      start = start.setDate(end.getDate() - 1);
    }
    if (start && !end) {
      end = new Date();
      end = end.setDate(start.getDate() + 1);
    }
    if (start && end) {
      this._datepicker.selectDate([start, end]);
    }
  }

  _value2Date(value = "") {
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
  }
}

function renderComponent() {
  const components = [];
  $(".js-calendar", "body").each(function () {
    components.push(new Calendar(this));
  });
}

document.addEventListener("DOMContentLoaded", renderComponent);
