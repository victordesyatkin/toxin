import get from "lodash/get";
import "./date-dropdown.scss";
import { startCase } from "lodash";

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
    this._inputStart.val(start);
  } else {
    this._inputStart.val("");
  }
  if (end) {
    this._inputEnd.val(end);
  } else {
    this._inputEnd.val("");
  }
};

DateDropdown.prototype._handlerClickDocument = function (event) {
  if (
    !$(event.target).closest(this._$component).length &&
    !$(event.target, this._$component).hasClass("datepicker--cell")
  ) {
    this._datepicker.hide();
  }
};

DateDropdown.prototype._init = function () {
  this._$sections = $(".input__section", this._$component);
  this._inputStart = $(".input__input", this._$sections.get(0));
  this._inputEnd = $(".input__input", this._$sections.get(1));
  this._datepicker = $('input[type="hidden"]').datepicker().data("datepicker");
  this._$buttonStart = $("button", this._$sections.get(0));
  this._$buttonEnd = $("button", this._$sections.get(1));
  this._$buttonStart.on("click", this._toggleVisibleCalendar.bind(this));
  this._$buttonEnd.on("click", this._toggleVisibleCalendar.bind(this));
  this._buttonClean = $('button[data-type="0"]', this._$component);
  this._buttonApply = $('button[data-type="1"]', this._$component);
  this._buttonClean.on("click", this._handlerClean.bind(this));
  this._buttonApply.on("click", this._handlerApply.bind(this));
  $(document).on("click", this._handlerClickDocument.bind(this));
};

function renderComponent() {
  const components = [];
  [].map.call($(".date-dropdown"), function (component) {
    components.push(new DateDropdown(component));
  });
}

renderComponent();
