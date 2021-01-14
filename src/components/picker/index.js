import { renderComponents, renderComponent } from "../../assets/helpers/utils";
import DateDropdown from "../date-dropdown";
import Dropdown from "../dropdown";
import "../button";

import "./picker.scss";

export default class Picker {
  static CLASS_NAME = "PICKER";
  static renderComponents(props = {}) {
    const { parents, query, render } = props;
    renderComponents({
      parents,
      query: query || ".js-picker",
      render: render || Picker._renderComponent,
    });
  }

  static _renderComponent() {
    renderComponent({
      element: arguments[1],
      className: Picker.CLASS_NAME,
      someClass: Picker,
    });
  }

  constructor(element) {
    this._element = element;
    this._$element = $(element);
    this._init();
  }

  _init() {
    DateDropdown.renderComponents({ parents: this._$element });
    Dropdown.renderComponents({ parents: this._$element });
  }
}

console.log("HELLO picker.js");
