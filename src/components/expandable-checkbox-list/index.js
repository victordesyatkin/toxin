import { renderComponents, renderComponent } from "../../assets/helpers/utils";
import Expandable from "../expandable";
import "./expandable-checkbox-list.scss";
class ExpandableCheckboxList {
  static CLASS_NAME = "EXPANDABLE_CHECKBOX_LIST";

  static renderComponents(props = {}) {
    const { parents, query, render } = props;
    renderComponents({
      parents,
      query: query || ".js-expandable-checkbox-list",
      render: render || ExpandableCheckboxList._renderComponent,
    });
  }

  static _renderComponent() {
    renderComponent({
      element: arguments[1],
      className: ExpandableCheckboxList.CLASS_NAME,
      someClass: ExpandableCheckboxList,
    });
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

export default ExpandableCheckboxList;
