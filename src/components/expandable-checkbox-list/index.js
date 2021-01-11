import Expandable from "../expandable";
import { renderComponents } from "../../assets/helpers/utils";

import "./expandable-checkbox-list.scss";
export default class ExpandableCheckboxList {
  static renderComponents(props = {}) {
    const { parents, query, render } = props;
    renderComponents({
      parents,
      query: query || ".js-expandable-checkbox-list",
      render: render || ExpandableCheckboxList.renderComponent,
    });
  }

  static renderComponent() {
    new ExpandableCheckboxList(arguments[1]);
  }

  constructor(element) {
    this._element = element;
    this._$element = $(element);
    this._init();
  }

  _init() {
    Expandable.renderComponents({ parents: this._$element });
  }
}
