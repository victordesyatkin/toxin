import Footer from "../../components/footer";

import "./headers-and-footers.scss";

function renderComponents() {
  Footer.renderComponents({ parents: ".js-headers-and-footers__footer" });
}

document.addEventListener("DOMContentLoaded", renderComponents);
