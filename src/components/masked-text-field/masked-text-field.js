import IMask from "imask";

import "./masked-text-field.scss";

export default class MaskedTextField {
  static renderComponents() {
    $(".js-masked-text-field").each(MaskedTextField.renderComponent);
  }

  static renderComponent() {
    new MaskedTextField(arguments[1]);
  }

  constructor(el) {
    this._el = el;
    this._$el = $(el);
    this._init();
  }

  _init() {
    const selector = $("input", this._$el);
    let maskOptions = selector.data("mask") || {
      mask: Date,
      lazy: false,
      overwrite: true,
      autofix: true,
      blocks: {
        d: {
          mask: IMask.MaskedRange,
          placeholderChar: "Д",
          from: 1,
          to: 31,
          maxLength: 2,
        },
        m: {
          mask: IMask.MaskedRange,
          placeholderChar: "М",
          from: 1,
          to: 12,
          maxLength: 2,
        },
        Y: {
          mask: IMask.MaskedRange,
          placeholderChar: "Г",
          from: 1999,
          to: 2999,
          maxLength: 4,
        },
      },
    };
    IMask(selector.get(0), maskOptions);
  }
}
