import Expandable from "../expandable";
import { renderComponents } from "../../assets/helpers/utils";

import "./expandable-checkbox-list.scss";
export default class ExpandableCheckboxList {
  static renderComponents(parents) {
    renderComponents({
      parents,
      query: ".js-expandable-checkbox-list",
      render: ExpandableCheckboxList.renderComponent,
    });
  }

  static renderComponent() {
    new ExpandableCheckboxList(arguments[1]);
  }

  constructor(el) {
    this._el = el;
    this._$el = $(el);
    this._init();
  }

  _init() {
    Expandable.renderComponents(this._$el);
  }
}
