import "./dropdown.scss";

class Dropdown {
  constructor(element) {
    this._element = element;
    this._$element = $(element);
    this._$mainINput = $(".input__input", element);
    this._$dropdownMain = $(".dropdown__main", this._element);
    this._$buttonExpand = $(".input__button", this._element);
    this._$buttonExpand.on("click", this._handlerClickExpand.bind(this));
    this._$items = $(".dropdown__item", this._$dropdownMain);
    this._prepareItems(this._$items);
    this._updatePlaceHolder();
  }
}

Dropdown.prototype._inputs = {};

Dropdown.prototype._updatePlaceHolder = function () {
  let placeholder = "";
  let separator = "";
  Object.keys(this._inputs).forEach((key) => {
    const value = parseInt(this._inputs[key]);
    if (value > 0) {
      placeholder += `${separator}${value} ${key}`;
      if (!separator) {
        separator = ", ";
      }
    }
  });
  if (placeholder) {
    this._$mainINput.attr("placeholder", placeholder);
  }
};

Dropdown.prototype._handlerChangeChildInput = function (event) {
  const { target } = event || {};
  const $input = $(target);
  const title = $input.attr("data-title");
  this._inputs[title] = $input.val();
  this._updatePlaceHolder();
};

Dropdown.prototype._handlerClickExpand = function () {
  if (this._$element.hasClass("dropdown_expand")) {
    this._$dropdownMain.slideUp("slow", this._toggleClassExpand.bind(this));
  } else {
    this._$dropdownMain.slideDown("slow", this._toggleClassExpand.bind(this));
  }
};

Dropdown.prototype._toggleClassExpand = function () {
  this._$element.toggleClass("dropdown_expand");
};

Dropdown.prototype._prepareItems = function (items) {
  [].map.call(items, (item) => {
    const $input = $($("input", item));
    const title = $input.attr("data-title");
    $input.on("input", this._handlerChangeChildInput.bind(this));
    this._inputs[title] = parseInt($input.val()) || 0;
    return new Element(item);
  });
};

class Element {
  constructor(element) {
    this._element = element;
    this._$element = $(element);
    this._$hiddenInput = $("input", this._element);
    this._$buttonPlus = $('button[data-type="1"]', this._$element).on(
      "click",
      this._handlerClickButton.bind(this, 1)
    );
    this._$buttonMinus = $('button[data-type="0"]', this._$element).on(
      "click",
      this._handlerClickButton.bind(this, 0)
    );
    this._$fakeinput = $(".dropdown__item-value h3", this._element);
  }
}

Element.prototype._handlerClickButton = function (type) {
  let value = parseInt(this._$hiddenInput.val());
  let flag = 0;
  if (type === 0 && value > 0) {
    value--;
    flag = 1;
  } else if (type === 1) {
    value++;
    flag = 1;
  }
  if (flag) {
    if (value > 0) {
      this._$buttonMinus.removeClass("dropdown__button_fade");
    } else {
      this._$buttonMinus.addClass("dropdown__button_fade");
    }
    this._$fakeinput.text(value);
    this._$hiddenInput.val(value);
    const event = new Event("input");
    this._$hiddenInput[0].dispatchEvent(event);
  }
};

const renderComponent = () => {
  const elements = [].map.call($(".dropdown"), (element) => {
    return new Dropdown(element);
  });
};

renderComponent();
