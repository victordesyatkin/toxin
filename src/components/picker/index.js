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
      render: render || Picker._renderComponent,
    });
  }

  static _renderComponent() {
    new Picker(arguments[1]);
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
