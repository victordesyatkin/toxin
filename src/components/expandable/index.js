import { renderComponents } from "../../assets/helpers/utils";
import "./expandable.scss";

export default class Expandable {
  static renderComponents(props = {}) {
    const { parents, query, render } = props;
    renderComponents({
      parents,
      query: query || ".js-expandable",
      render: render || Expandable.renderComponent,
    });
  }

  static renderComponent() {
    new Expandable(arguments[1]);
  }

  constructor(el) {
    this._el = el;
    this._$el = $(el);
    this._init();
  }

  _init() {
    this._$header = $(".js-expandable__header", this._$el);
    this._$body = $(".js-expandable__body", this._$el);
    this._$header.on("click", this._toggleClass.bind(this));
  }

  _toggleClass() {
    if (this._$el.hasClass("expandable_forced-expanded")) {
      return false;
    }
    if (this._$el.hasClass("expandable_expanded")) {
      this._$el.removeClass("expandable_expanded");
      return false;
    }
    this._$el.toggleClass("expandable_expand");
    this._$body.fadeToggle(1000);
    if (this._$el.hasClass("expandable_expand")) {
      let zIndex = parseFloat(this._$el.css("z-index"));
      if (zIndex) {
        zIndex += 1;
        this._$el.css({ "z-index": zIndex });
      }
    } else {
      this._$el.css({ "z-index": "" });
    }
  }
}
