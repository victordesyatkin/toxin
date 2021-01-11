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

  constructor(element) {
    this._element = element;
    this._$element = $(element);
    this._init();
  }

  _init() {
    this._$header = $(".js-expandable__header", this._$element);
    this._$body = $(".js-expandable__body", this._$element);
    this._$header.on("click", this._toggleClass.bind(this));
  }

  _toggleClass() {
    if (this._$element.hasClass("expandable_forced-expanded")) {
      return false;
    }
    if (this._$element.hasClass("expandable_expanded")) {
      this._$element.removeClass("expandable_expanded");
      return false;
    }
    this._$element.toggleClass("expandable_expand");
    this._$body.fadeToggle(1000);
    if (this._$element.hasClass("expandable_expand")) {
      let zIndex = parseFloat(this._$element.css("z-index"));
      if (zIndex) {
        zIndex += 1;
        this._$element.css({ "z-index": zIndex });
      }
    } else {
      this._$element.css({ "z-index": "" });
    }
  }
}