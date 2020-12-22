import "./input.scss";

function renderComponent() {
  $($(".input")).each(function () {
    const _handlerIn = () => {
      $(this).toggleClass("input_hovered-focused");
    };
    const _button = $("button", this);
    const _handlerOut = _handlerIn;
    $(_button).on("hover", _handlerIn);
  });
}

document.addEventListener("DOMContentLoaded", renderComponent);
