import { wordForm, renderComponents } from "../../assets/helpers/utils";

import Input from "../input";

import "./dropdown.scss";

export default class Dropdown {
  static renderComponents(props = {}) {
    const { parents, query, render } = props;
    renderComponents({
      parents,
      query: query || ".js-dropdown",
      render: render || Dropdown.renderComponent,
    });
  }

  static renderComponent() {
    new Dropdown(arguments[1]);
  }

  constructor(element) {
    this._element = element;
    this._$element = $(element);
    this._init();
  }

  _init() {
    Input.renderComponents({ parents: this._$element });
    this._inputs = {};
    this._type = parseInt(this._$element.attr("data-type"));
    this._$mainInput = $(".js-input__input", this._element);
    this._$mainInput.attr("disabled", true);
    this._$inputSection = $(".js-input__section", this._element);
    this._$inputSection.on("click", this._handlerClickExpand.bind(this));
    this._mainPlaceholder = this._$mainInput.attr("placeholder");
    this._$dropdownMain = $(".js-dropdown__main", this._element);
    this._$buttonExpand = $(".js-input__button", this._element);
    this._$buttonClean = $('button[name="clean"]', this._$dropdownMain);
    this._$buttonClean.on("click", this._handlerClickClean.bind(this));
    this._$buttonApply = $('button[name="apply"]', this._$dropdownMain);
    this._$buttonApply.on("click", this._handlerClickApply.bind(this));
    this._$main = $(".js-dropdown__main", this._$element);
    $("body").on("click", this._handlerClickDocument.bind(this));
    this._forcedExpand = this._$element.hasClass("dropdown_forced-expanded");
    this._prepareItems();
    this._createPlaceholder();
    this._updatePlaceholder();
    this._toggleButtonClean();
  }

  _toggleButtonClean() {
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
  }

  _handlerClickExpand() {
    if (this._forcedExpand) {
      return false;
    }
    if (this._$element.hasClass("dropdown_expanded")) {
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
  }

  _handlerClickClean() {
    Object.keys(this._inputs).forEach((key) => {
      this._inputs[key] = 0;
    });
    $($(".js-dropdown__item", this._$dropdownMain)).each(function () {
      $("input", this).val(0);
      $(".js-dropdown__item-value", this).text(0);
    });
    this._updatePlaceholder();
    this._toggleButtonClean();
  }

  _createPlaceholder() {
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
  }

  _updatePlaceholder() {
    let placeholder = this._placeholder._toString();
    if (placeholder) {
      this._$mainInput.attr("placeholder", placeholder);
      this._$mainInput.val(placeholder);
    } else {
      this._$mainInput.attr("placeholder", this._mainPlaceholder);
      this._$mainInput.val(this._mainPlaceholder);
    }
  }

  _handlerChangeChildInput(event) {
    const { target } = event || {};
    const $input = $(target);
    const title = $input.attr("data-title");
    this._inputs[title] = $input.val();
    this._updatePlaceholder();
    this._toggleButtonClean();
  }

  _toggleZIndex(zIndex = 1) {
    this._$main.css("z-index", zIndex);
    return false;
  }

  _handlerClickApply() {
    this._handlerClickExpand();
  }

  _rollOtherDropdown() {}

  _handlerClickDocument(event) {
    if (
      this._$element.hasClass("dropdown_expanded") &&
      !$(event.target).closest(this._$element).length
    ) {
      this._handlerClickExpand();
    }
  }

  _toggleClassExpand() {
    this._$element.toggleClass("dropdown_expanded");
  }

  _prepareItems() {
    this._$items = $(".js-dropdown__item", this._$dropdownMain);
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
  }
}
class Placeholder {
  constructor(inputs) {
    this._inputs = inputs;
  }

  _inputs = {};

  _toString() {
    return "";
  }
}

class PlaceholderRooms extends Placeholder {
  constructor(props) {
    super(props);
    this._init();
  }

  _init() {
    this._words = {
      спальни: ["спальня", "спальни", "спален"],
      кровати: ["кровать", "кровати", "кроватей"],
      "ванные комнаты": ["ванная комната", "ванные комнаты", "ванных комнат"],
    };
  }

  _toString() {
    let placeholder = "";
    let separator = "";
    Object.keys(this._inputs).forEach((key) => {
      const value = parseInt(this._inputs[key]);
      if (value > -1) {
        placeholder += `${separator}${value} ${wordForm(
          value,
          this._words[key] || []
        )}`;
        if (!separator) {
          separator = ", ";
        }
      }
    });
    return placeholder;
  }
}

class PlaceholderGuests extends Placeholder {
  constructor(props) {
    super(props);
    this._init();
  }

  _init() {
    this._words = {
      гость: ["гость", "гостя", "гостей"],
      младенцы: ["младенец", "младенца", "младенцев"],
    };
  }

  _toString() {
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
      placeholder = `${separator}${countGuests} ${wordForm(
        countGuests,
        this._words["гость"] || []
      )}`;
      if (!separator) {
        separator = ", ";
      }
    }
    if (countBaby > 0) {
      placeholder += `${separator}${countBaby} ${wordForm(
        countBaby,
        this._words["младенцы"] || []
      )}`;
    }
    return placeholder;
  }
}
class Element {
  static TYPE_PLUS = 1;
  static TYPE_MINUS = 0;

  constructor(element, value) {
    this._element = element;
    this._$element = $(element);
    this._$hiddenInput = $("input", this._element);
    this._$buttonPlus = $(
      `button[data-type="${Element.TYPE_PLUS}"]`,
      this._$element
    ).on("click", this._handlerClickButton.bind(this, Element.TYPE_PLUS));
    this._$buttonMinus = $(
      `button[data-type="${Element.TYPE_MINUS}"]`,
      this._$element
    ).on("click", this._handlerClickButton.bind(this, Element.TYPE_MINUS));
    this._$fakeInput = $(".js-dropdown__item-value", this._element);
    if (typeof value !== "undefined") {
      this._$fakeInput.html(value);
    }
  }

  _handlerClickButton(type) {
    let value = parseInt(this._$hiddenInput.val());
    let flag = 0;
    if (type === Element.TYPE_MINUS && value > 0) {
      value--;
      flag = 1;
    } else if (type === Element.TYPE_PLUS) {
      value++;
      flag = 1;
    }
    if (flag) {
      if (value > 0) {
        this._$buttonMinus.removeClass("dropdown__button_fade");
      } else {
        this._$buttonMinus.addClass("dropdown__button_fade");
      }
      this._$fakeInput.text(value);
      this._$hiddenInput.val(value);
      const event = new Event("input");
      this._$hiddenInput[0].dispatchEvent(event);
    }
  }
}
