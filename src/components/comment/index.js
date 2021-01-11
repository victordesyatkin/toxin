import { renderComponents } from "../../assets/helpers/utils";

import LikeButton from "../like-button";

import "./comment.scss";

export default class Comment {
  static renderComponents(props = {}) {
    const { parents, query, render } = props;
    renderComponents({
      parents,
      query: query || ".js-comment",
      render: render || Comment.renderComponent,
    });
  }

  static renderComponent() {
    new Comment(arguments[1]);
  }

  constructor(el) {
    this._el = el;
    this._$el = $(el);
    this._init();
  }

  _init() {
    LikeButton.renderComponents({ parents: this._$el });
  }
}
