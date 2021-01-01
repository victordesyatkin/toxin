import "./input.scss";

class Input {
  constructor(el) {
    this._el = el;
    this._$el = $el;
  }
}

function renderComponent() {
  $($(".input")).each(function () {
    // function _handlerIn() {
    //   $(_this).toggleClass("input_hovered-focused");
    // }
    // const _button = $("button", this);
    // $(_button).on("focus", _handlerIn);
    function _focusIn() {
      $(".js-input__section", this).addClass("input__section_hovered");
    }
    function _focusOut() {
      $(".js-input__section", this).removeClass("input__section_hovered");
    }
    $(this).on("focusin", _focusIn);
    $(this).on("focusout", _focusOut);
  });
}

document.addEventListener("DOMContentLoaded", renderComponent);
