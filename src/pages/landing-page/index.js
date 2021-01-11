import get from "lodash/get";

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
      render: render || LandingPage.renderComponent,
    });
  }

  static renderComponent() {
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
    this._$buttons = $("button[type=submit]", this._$form);
    this._$buttons.on("click", this._handler.bind(this));
  }

  _handler = function (e) {
    const type = $(get(e, ["currentTarget"])).attr("type");
    switch (type) {
      case "submit": {
        e.preventDefault();
        const href = "search-room-filter.html";
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
        window.location.href = href;
      }
      default: {
      }
    }
  };
}

function renderComponent() {
  LandingPage.renderComponents();
}

document.addEventListener("DOMContentLoaded", renderComponent);
