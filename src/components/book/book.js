import datepicker from "air-datepicker";
import "./book.scss";

class Book {
  constructor(component) {
    this._$component = $(component);
    this._init();
    this._words = ["сутки", "суток", "суток"];
  }
}

Book.prototype._wordForm = function (num, word) {
  const cases = [2, 0, 1, 1, 1, 2];
  return word[
    num % 100 > 4 && num % 100 < 20 ? 2 : cases[num % 10 < 5 ? num % 10 : 5]
  ];
};

Book.prototype._init = function () {
  this._$calc = $('.book__section[data-type="1"]', this._$component);
  this._$calcInfo = $(".book__section-info", this._$calc);
  this._$calcTotal = $(".book__section-total", this._$calc);
  this._$total = $('.book__section[data-type="2"]', this._$component);
  this._$totalTotal = $(".book__section-total", this._$total);
  this._props = this._$component.data("options");
  this._price = parseFloat(this._prepareNumber(this._props.price));
  this._discount = parseFloat(this._prepareNumber(this._props.discount));
  this._unit = this._props.unit;
  this._$calendar = $(".calendar", this._$component);
  this._$input = $(
    '.book__date-dropdown input[type="hidden"][date-isCalendar="1"]',
    this._$component
  );
  setTimeout(() => {
    this._datepicker = this._$input.datepicker().data("datepicker");
    this._prepareDaty();
    this._setCalc();
    this._$calendar.on("click", this._setCalc.bind(this));
  }, 100);
};

Book.prototype._options = {
  style: "decimal",
  currency: "RUB",
  minimumFractionDigits: 0,
};

Book.prototype._prepareNumber = function (n = "") {
  return n.split(" ").join("") || 0;
};

Book.prototype._setCalc = function () {
  let price = this._price;
  const selectedDates = this._datepicker.selectedDates || [];
  const [start, end] = selectedDates;
  let count = (end - start) / (1000 * 60 * 60 * 24);
  if (!count) {
    count = 0;
  }
  let total = price * count;
  this._setTotal(total);
  price = new Intl.NumberFormat("ru-RU", this._options).format(price);
  total = new Intl.NumberFormat("ru-RU", this._options).format(total);
  this._$calcInfo.html(
    `${price}${this._unit} x ${count} ${this._wordForm(count, this._words)}`
  );
  this._$calcTotal.html(`${total}${this._unit}`);
};

Book.prototype._setTotal = function (total = 0) {
  total += this._daty - this._discount;
  if (total < 0) {
    total = 0;
  }
  total = new Intl.NumberFormat("ru-RU", this._options).format(total);
  this._$totalTotal.html(`${total}<span>${this._unit}</span>`);
};

Book.prototype._prepareDaty = function () {
  const $daties = $(".book__section:not([data-type])");
  let daty = 0;
  Array.prototype.forEach.call(
    $(".book__section-total", $daties),
    function (element) {
      daty += parseFloat(this._prepareNumber($(element).html()));
    }.bind(this)
  );
  this._daty = daty;
};

document.addEventListener("DOMContentLoaded", function () {
  const books = Array.prototype.map.call($(".book"), function (component) {
    return new Book(component);
  });
});
