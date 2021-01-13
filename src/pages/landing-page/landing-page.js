import { renderComponents } from "../../assets/helpers/utils";

import Picker from "../../components/picker";
import Footer from "../../components/footer";

import "./landing-page.scss";

export default class LandingPage {
  static renderComponents(props = {}) {
    const { parents, query, render } = props;
    renderComponents({
      parents,
      query: query || ".js-landing-page",
      render: render || LandingPage._renderComponent,
    });
  }

  static _renderComponent() {
    new LandingPage(arguments[1]);
  }

  constructor(element) {
    this._element = element;
    this._$element = $(element);
    this._init();
  }

  _init() {
    Picker.renderComponents({ parents: this._$element });
    Footer.renderComponents({ parents: ".js-landing-page__footer" });
    localStorage.clear();
    this._$form = $("form", this._$element);
    this._$form.on("submit", this._handler.bind(this));
  }

  _handler = function () {
    const data = {
      startDate: "",
      endDate: "",
      adults: "",
      children: "",
      babies: "",
    };
    $("input[name]", this._$form).each(function () {
      if (Object.keys(data).indexOf(this.name) !== -1) {
        data[this.name] = $(this).val();
      }
    });
    localStorage.setItem("landingPage", JSON.stringify(data));
  };
}

function renderComponent() {
  LandingPage.renderComponents();
}
