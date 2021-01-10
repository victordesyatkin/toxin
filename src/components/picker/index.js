import { renderComponents } from "../../assets/helpers/utils";
import DateDropdown from "../date-dropdown";
import Dropdown from "../dropdown";

import "./picker.scss";

export default class Picker {
  static renderComponents(parents) {
    renderComponents({
      parents,
      query: ".js-picker",
      render: Picker.renderComponent,
    });
  }

  static renderComponent() {
    new Picker(arguments[1]);
  }

  constructor(el) {
    this._el = el;
    this._$el = $(el);
    this._init();
  }

  _init() {
    DateDropdown.renderComponents(this._$el);
    Dropdown.renderComponents(this._$el);
  }
}
