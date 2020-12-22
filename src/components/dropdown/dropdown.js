import "./dropdown.scss";

class Dropdown {
  constructor(element, zIndex = 1) {
    this._inputs = {};
    this._element = element;
    this._$element = $(element);
    this._type = parseInt(this._$element.attr("data-type"));
    this._$mainInput = $(".input__input", element);
    this._$mainInput.attr("disabled", true);
    this._$inputSection = $(".input__section", element);
    this._$inputSection.on("click", this._handlerClickExpand.bind(this));
    this._mainPlaceholder = this._$mainInput.attr("placeholder");
    this._$dropdownMain = $(".dropdown__main", this._element);
    this._$buttonExpand = $(".input__button", this._element);
    this._$buttonClean = $('button[name="clean"]', this._$dropdownMain);
    this._$buttonClean.on("click", this._handlerClickClean.bind(this));
    this._$buttonApply = $('button[name="apply"]', this._$dropdownMain);
    this._$buttonApply.on("click", this._handlerClickApply.bind(this));
    this._$main = $(".dropdown__main", this._$element);
    $("body").on("click", this._handlerClickDocument.bind(this));
    this._forcedExpand = this._$element.hasClass("dropdown_forced-expand");
    this._prepareItems();
    this._createPlaceholder();
    this._updatePlaceholder();
    this._toggleButtonClean();
  }
}

class Placeholder {
  constructor(inputs) {
    this._inputs = inputs;
  }
}

Placeholder.prototype._inputs = {};

Placeholder.prototype._toString = function () {
  return "";
};

Placeholder.prototype._wordForm = function (num, word) {
  const cases = [2, 0, 1, 1, 1, 2];
  return word[
    num % 100 > 4 && num % 100 < 20 ? 2 : cases[num % 10 < 5 ? num % 10 : 5]
  ];
};

class PlaceholderRooms extends Placeholder {
  constructor(props) {
    super(props);
    this._words = {
      спальни: ["спальня", "спальни", "спален"],
      кровати: ["кровать", "кровати", "кроватей"],
      "ванные комнаты": ["ванная комната", "ванные комнаты", "ванных комнат"],
    };
  }
}

PlaceholderRooms.prototype._toString = function () {
  let placeholder = "";
  let separator = "";
  Object.keys(this._inputs).forEach((key) => {
    const value = parseInt(this._inputs[key]);
    if (value > -1) {
      placeholder += `${separator}${value} ${this._wordForm(
        value,
        this._words[key] || []
      )}`;
      if (!separator) {
        separator = ", ";
      }
    }
  });
  return placeholder;
};

class PlaceholderGuests extends Placeholder {
  constructor(props) {
    super(props);
    this._words = {
      гость: ["гость", "гостя", "гостей"],
      младенцы: ["младенец", "младенца", "младенцев"],
    };
  }
}

PlaceholderGuests.prototype._toString = function () {
  let placeholder = "";
  let countGuests = 0;
  let countBaby = 0;
  let separator = "";
  Object.keys(this._inputs).forEach((key) => {
    if (["взрослые", "дети"].indexOf(key) > -1) {
      countGuests += parseInt(this._inputs[key]);
    } else if (["младенцы"].indexOf(key) > -1) {
      countBaby += parseInt(this._inputs[key]);
    }
  });
  if (countGuests > 0) {
    placeholder = `${separator}${countGuests} ${this._wordForm(
      countGuests,
      this._words["гость"] || []
    )}`;
    if (!separator) {
      separator = ", ";
    }
  }
  if (countBaby > 0) {
    placeholder += `${separator}${countBaby} ${this._wordForm(
      countBaby,
      this._words["младенцы"] || []
    )}`;
  }
  return placeholder;
};

Dropdown.prototype._inputs = {};

Dropdown.prototype._handlerClickApply = function () {
  this._handlerClickExpand();
};

Dropdown.prototype._handlerClickClean = function () {
  Object.keys(this._inputs).forEach((key) => {
    this._inputs[key] = 0;
  });
  $($(".dropdown__item", this._$dropdownMain)).each(function () {
    $("input", this).val(0);
    $(".dropdown__item-value", this).text(0);
  });
  this._updatePlaceholder();
  this._toggleButtonClean();
};

Dropdown.prototype._createPlaceholder = function () {
  switch (this._type) {
    case 0: {
      this._placeholder = new PlaceholderRooms(this._inputs);
      break;
    }
    case 1: {
      this._placeholder = new PlaceholderGuests(this._inputs);
      break;
    }
    default: {
      return new Placeholder(this._inputs);
    }
  }
};

Dropdown.prototype._toggleButtonClean = function () {
  let flag = false;
  const inputs = Object.values(this._inputs);
  for (let i = 0, { length } = inputs; i < length; i++) {
    if (parseInt(inputs[i])) {
      flag = true;
      break;
    }
  }
  if (flag) {
    this._$buttonClean.removeClass("dropdown__control-button_hide");
  } else {
    this._$buttonClean.addClass("dropdown__control-button_hide");
  }
};

Dropdown.prototype._updatePlaceholder = function () {
  let placeholder = this._placeholder._toString();
  if (placeholder) {
    this._$mainInput.attr("placeholder", placeholder);
    this._$mainInput.val(placeholder);
  } else {
    this._$mainInput.attr("placeholder", this._mainPlaceholder);
    this._$mainInput.val(this._mainPlaceholder);
  }
};

Dropdown.prototype._handlerChangeChildInput = function (event) {
  const { target } = event || {};
  const $input = $(target);
  const title = $input.attr("data-title");
  this._inputs[title] = $input.val();
  this._updatePlaceholder();
  this._toggleButtonClean();
};

Dropdown.prototype._toggleZIndex = function (zIndex = 1) {
  this._$main.css("z-index", zIndex);
  return false;
};

Dropdown.prototype._rollOtherDropdown = function () {};

Dropdown.prototype._handlerClickDocument = function (event) {
  if (
    this._$element.hasClass("js-dropdown_expanded") &&
    !$(event.target).closest(this._$element).length
  ) {
    this._handlerClickExpand();
  }
};

Dropdown.prototype._handlerClickExpand = function () {
  if (this._forcedExpand) {
    return false;
  }
  if (this._$element.hasClass("js-dropdown_expanded")) {
    this._$dropdownMain.slideUp("slow", () => {
      this._toggleClassExpand();
      this._toggleZIndex(10);
    });
  } else {
    this._$dropdownMain.slideDown("slow", () => {
      this._toggleClassExpand();
      this._toggleZIndex(100);
    });
  }
};

Dropdown.prototype._toggleClassExpand = function () {
  this._$element.toggleClass(["dropdown_expanded", "js-dropdown_expanded"]);
};

Dropdown.prototype._prepareItems = function () {
  this._$items = $(".dropdown__item", this._$dropdownMain);
  const data = {};
  const names = ["adults", "babies", "children"];
  if (localStorage && localStorage.getItem("landingPage")) {
    let landingPage = localStorage.getItem("landingPage") || "{}";
    landingPage = JSON.parse(landingPage);
    Object.keys(landingPage).forEach((name) => {
      if (names.indexOf(name) === -1) {
        return false;
      }
      if (!isNaN(parseFloat(landingPage[name]))) {
        data[name] = parseFloat(landingPage[name]);
      }
    });
  }

  Array.prototype.map.call(this._$items, (item) => {
    const $input = $($("input", item));
    const title = $input.attr("data-title");
    $input.on("input", this._handlerChangeChildInput.bind(this));
    const name = $input.attr("name");
    if (typeof data[name] !== "undefined") {
      const value = data[name];
      $input.val(value);
    }
    this._inputs[title] = parseInt($input.val()) || 0;
    return new Element(item, this._inputs[title]);
  });
};

class Element {
  constructor(element, value) {
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
    this._$fakeInput = $(".js-dropdown__item-value", this._element);
    if (typeof value !== "undefined") {
      this._$fakeInput.html(value);
    }
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
      this._$buttonMinus.removeClass([
        "dropdown__button_fade",
        "js-dropdown__button_fade",
      ]);
    } else {
      this._$buttonMinus.addClass([
        "dropdown__button_fade",
        "js-dropdown__button_fade",
      ]);
    }
    this._$fakeInput.text(value);
    this._$hiddenInput.val(value);
    const event = new Event("input");
    this._$hiddenInput[0].dispatchEvent(event);
  }
};

const renderComponent = () => {
  const elements = Array.prototype.map.call($(".js-dropdown"), (element) => {
    return new Dropdown(element);
  });
};

document.addEventListener("DOMContentLoaded", renderComponent);
