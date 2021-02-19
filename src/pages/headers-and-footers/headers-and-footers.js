// import { renderComponents, renderComponent } from '../../helpers/utils';
// import Footer from '../../components/footer';
// import '../demo-base/demo-base';
// import './headers-and-footers.scss';

// class HeadersAndFooters {
//   static CLASS_NAME = 'HEADERS_AND_FOOTERS';

//   static renderComponents(props = {}) {
//     const { parents, query, render } = props;
//     renderComponents({
//       parents,
//       query: query || '.js-headers-and-footers__footer',
//       render: render || HeadersAndFooters._renderComponent,
//     });
//   }

//   static _renderComponent(index, element) {
//     renderComponent({
//       element,
//       className: HeadersAndFooters.CLASS_NAME,
//       someClass: HeadersAndFooters,
//     });
//   }

//   constructor(element) {
//     this._element = element;
//     this._$element = $(element);
//     this._init();
//   }

//   _init() {
//     Footer.renderComponents({ parents: this._$element });
//   }
// }

// // window.addEventListener('load', HeadersAndFooters.renderComponents);

// export default HeadersAndFooters;
