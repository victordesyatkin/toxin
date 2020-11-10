import "./card-header.scss";

const renderComponent = () => {
  const options = { style: "decimal", currency: "RUB" };
  $(".card-header__price-content").each(function () {
    $(this).html(
      new Intl.NumberFormat("ru-RU", options).format(
        parseFloat($(this).html().replace(" ", ""))
      )
    );
  });
};

document.addEventListener("DOMContentLoaded", renderComponent);
