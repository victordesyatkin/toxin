// import { renderComponents, renderComponent } from '../../helpers/utils';
// import Book from '../../components/book';
// import Comments from '../../components/comments';
// import Footer from '../../components/footer';
// import Rate from '../../components/rate';
// import LikeButton from '../../components/like-button';
// import Slider from '../../components/slider';
// import '../../components/info';
// import '../../components/card';
// import '../../components/bullet-list';
// import '../../components/description';
// import '../base/base';
// import './room-details.scss';

// class RoomDetails {
//   static CLASS_NAME = 'ROOM_DETAILS';

//   static renderComponents(props = {}) {
//     const { parents, query, render } = props;
//     renderComponents({
//       parents,
//       query: query || '.js-room-details',
//       render: render || RoomDetails._renderComponent,
//     });
//   }

//   static _renderComponent(index, element) {
//     renderComponent({
//       element,
//       className: RoomDetails.CLASS_NAME,
//       someClass: RoomDetails,
//     });
//   }

//   constructor(element) {
//     this._element = element;
//     this._$element = $(element);
//     this._init();
//   }

//   _init() {
//     const parents = this._$element;
//     Book.renderComponents({ parents });
//     Rate.renderComponents({ parents });
//     LikeButton.renderComponents({ parents });
//     Comments.renderComponents({ parents });
//     Slider.renderComponents({ parents });
//     Footer.renderComponents();
//   }
// }

// // window.addEventListener('load', RoomDetails.renderComponents);
// export default RoomDetails;
