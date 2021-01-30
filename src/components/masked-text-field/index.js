import get from "lodash/get";
import IMask from "imask";

import { renderComponents, renderComponent } from "../../assets/helpers/utils";
import "./masked-text-field.scss";
import Input from "../input";

class MaskedTextField {
  static CLASS_NAME = "MASKED_TEXT_FIELD";

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

  static renderComponents(props = {}) {
    const { parents, query, render } = props;
    renderComponents({
      parents,
      query: query || ".js-masked-text-field",
      render: render || MaskedTextField._renderComponent,
    });
  }

  static _renderComponent(index, element) {
    renderComponent({
      element,
      className: MaskedTextField.CLASS_NAME,
      someClass: MaskedTextField,
    });
  }

  constructor(element) {
    this._element = element;
    this._$element = $(element);
    this._init();
  }

  _init() {
    Input.renderComponents({ parents: this._$element });
    const selector = $("input", this._$element);
    const options = this._$element.data("options");
    let maskOptions = {};
    const mask = get(options, ["mask"]);
    const regexp = get(options, ["regexp"]);
    if (mask && regexp) {
      maskOptions.mask = new RegExp(mask);
    } else if (mask) {
      maskOptions.mask = mask;
    } else {
      maskOptions = MaskedTextField.defaultProps;
    }
    IMask(selector.get(0), maskOptions);
  }
}

export default MaskedTextField;
