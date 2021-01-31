import get from "lodash/get";

import {
  wordForm,
  renderComponents,
  renderComponent,
} from "../../assets/helpers/utils";
import "../comment";
import "./comments.scss";

class Comments {
  static CLASS_NAME = "COMMENTS";

  static renderComponents(props = {}) {
    const { parents, query, render } = props;
    renderComponents({
      parents,
      query: query || ".js-comments",
      render: render || Comments._renderComponent,
    });
  }

  static _renderComponent(index, element) {
    renderComponent({
      element,
      className: Comments.CLASS_NAME,
      someClass: Comments,
    });
  }

  constructor(el) {
    this._el = el;
    this._$el = $(el);
    this._init();
  }

  _init() {
    const data = this._$el.data();
    const units = get(data, ["units"]) || [];
    const count = get(data, ["count"]) || [];
    const $units = $(".js-comments__count-units", this._$el);
    if (units.length) {
      $units.html(wordForm(count, units));
    }
  }
}

export default Comments;
