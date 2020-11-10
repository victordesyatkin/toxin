import "./expandable.scss";

function renderComponent() {
  $($(".expandable")).each(function () {
    $(".expandable__header", this).on(
      "click",
      function () {
        if ($(this).hasClass("expandable_forced-expanded")) {
          return false;
        }
        if ($(this).hasClass("expandable_expanded")) {
          $(this).removeClass("expandable_expanded");
          return false;
        }
        $(this).toggleClass("expandable_expand");
        $(".expandable__body", this).fadeToggle(1000);
      }.bind(this)
    );
  });
}

document.addEventListener("DOMContentLoaded", renderComponent);
