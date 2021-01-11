import { renderComponents } from "../../assets/helpers/utils";
import DateDropdown from "../date-dropdown";
import Dropdown from "../dropdown";

import "./picker.scss";

export default class Picker {
  static renderComponents(props = {}) {
    const { parents, query, render } = props;
    renderComponents({
      parents,
      query: query || ".js-picker",
      render: render || Picker.renderComponent,
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
    DateDropdown.renderComponents({ parents: this._$el });
    Dropdown.renderComponents({ parents: this._$el });
  }
}
