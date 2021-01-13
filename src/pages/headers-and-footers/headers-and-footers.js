import Footer from "../../components/footer";

import "./headers-and-footers.scss";

function renderComponents() {
  console.log("headers-and-footers");
  Footer.renderComponents({ parents: ".js-headers-and-footers__footer" });
}

document.addEventListener("DOMContentLoaded", renderComponents);
