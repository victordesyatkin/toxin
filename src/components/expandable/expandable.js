import "./expandable.scss";

function renderComponent() {
  $($(".expandable")).each(function () {
    $(".expandable__header", this).on(
      "click",
      function () {
        $(this).toggleClass("expandable_expand");
        $(".expandable__body", this).fadeToggle(1000);
      }.bind(this)
    );
  });
}

renderComponent();
