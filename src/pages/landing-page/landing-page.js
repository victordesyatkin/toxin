import { renderComponents, renderComponent } from "../../assets/helpers/utils";

import Picker from "../../components/picker";
import Footer from "../../components/footer";
import "../base/base";
import "../cards/cards";

import "./landing-page.scss";

export default class LandingPage {
  static CLASS_NAME = "LANDING_PAGE";
  static renderComponents(props = {}) {
    const { parents, query, render } = props;
    renderComponents({
      parents,
      query: query || ".js-landing-page",
      render: render || LandingPage._renderComponent,
    });
  }

  static _renderComponent() {
    renderComponent({
      element: arguments[1],
      className: LandingPage.CLASS_NAME,
      someClass: LandingPage,
    });
  }

  constructor(element) {
    this._element = element;
    this._$element = $(element);
    this._init();
  }

  _init() {
    Picker.renderComponents({ parents: this._$element });
    Footer.renderComponents();
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

window.addEventListener("load", LandingPage.renderComponents);
