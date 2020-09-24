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

renderComponent();
