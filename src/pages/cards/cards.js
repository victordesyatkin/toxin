import { renderComponent, renderComponents } from '../../helpers/utils';
// import Picker from '../../components/picker';
// import SignUp from '../../components/sign-up';
// import SignIn from '../../components/sign-in';
// import Calendar from '../../components/calendar';
// import CardSlider from '../../components/card-slider';
import Book from '../../components/book';
import '../../components/card';
import '../../index';
import '../demo-base/demo-base';
import './cards.scss';
import data from './data.json';

class Cards {
  static CLASS_NAME = 'CARDS';

  static renderComponents(options = {}) {
    const { query, parents } = options;
    renderComponents({
      parents,
      query,
      props: options,
      render: Cards._renderComponent,
    });
  }

  static _renderComponent(options = {}) {
    const { element, props } = options;
    renderComponent({
      element,
      props,
      SomeClass: Cards,
    });
  }

  constructor({ element, props = {} }) {
    this._element = element;
    this._$element = $(element);
    this._props = props;
    this._init();
  }

  _init() {
    const { book, query } = this._props;
    // Picker.renderComponents({ parents });
    Book.renderComponents({
      parents: $(`${query}__book`, this._$element),
      props: book,
    });
    // SignUp.renderComponents({ parents });
    // SignIn.renderComponents({ parents });
    // Calendar.renderComponents({ parents });
    // CardSlider.renderComponents({ parents });
  }
}

function render() {
  Cards.renderComponents(data);
}

window.addEventListener('load', render);

export default Cards;
