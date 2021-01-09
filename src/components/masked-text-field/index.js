import IMask from "imask";

import { renderComponents } from "../../assets/helpers/utils";

import "./masked-text-field.scss";

export default class MaskedTextField {
  static defaultProps = {
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
  static renderComponents(parents) {
    renderComponents({
      parents,
      render: MaskedTextField.renderComponent,
      query: ".js-masked-text-field",
    });
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
    const maskOptions = this._$el.data("mask") || MaskedTextField.defaultProps;
    const regexp = this._$el.data("regexp");
    if (regexp) {
      maskOptions.mask = new RegExp(maskOptions.mask);
    }
    IMask(selector.get(0), maskOptions);
  }
}
