import "./input.scss";

(function () {
  $($(".input")).each(function () {
    const _handlerIn = () => {
      $(this).toggleClass("input_hover-focus");
    };
    const _button = $("button", this);
    const _handlerOut = _handlerIn;
    $(_button).hover(_handlerIn, _handlerOut);
  });
})();
