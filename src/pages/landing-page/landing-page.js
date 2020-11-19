import get from "lodash/get";
import "./landing-page.scss";

class LandingPage {
  constructor(component) {
    this._component = component;
    this._$component = $(component);
    this._init();
  }
}

LandingPage.prototype._handler = function (e) {
  const action = get($(get(e, ["target"])).data(), ["action"]) || {};
  const { payload, type } = action;
  switch (type) {
    case "SUBMIT": {
      e.preventDefault();
      const { href } = payload || {};
      const data = {
        startDate: "",
        endDate: "",
        adults: "",
        children: "",
        babies: "",
      };
      $("input[name]", this._$form).each(function () {
        console.log("name", this.name);
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

LandingPage.prototype._init = function () {
  localStorage.clear();
  this._$form = $("form", this._$component);
  this._$buttons = $("button[data-action]", this._$form);
  this._$buttons.on("click", this._handler.bind(this));
};

function renderComponent() {
  const components = [];
  $(".landing-page").each(function () {
    components.push(new LandingPage(this));
  });
}

document.addEventListener("DOMContentLoaded", renderComponent);
