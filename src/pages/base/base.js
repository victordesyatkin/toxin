import isString from "lodash/isString";
import isUndefined from "lodash/isUndefined";

class Base {
  constructor() {
    this._init();
  }
}

Base.prototype._init = function () {
  this._$buttons = $("button");
  this._$buttons.on("click", this._handler);
};

Base.prototype._handler = function () {
  const action = $(this).data("action");
  if (!isUndefined(action)) {
    const { type, payload } = action || {};
    switch (type) {
      case "LINK": {
        const { href } = payload || {};
        if (isString(href) && href.trim().length) {
          window.location.href = href;
        }
      }
    }
  }
};

function renderComponent() {
  const component = new Base();
}

$(renderComponent);
