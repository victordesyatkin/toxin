import { Component } from '../../helpers/utils';
import Picker from '../../components/picker';
import SignUp from '../../components/sign-up';
// // import SignIn from '../../components/sign-in';
// // import Calendar from '../../components/calendar';
// // import CardSlider from '../../components/card-slider';
import Book from '../../components/book';
import '../../components/card';
import '../demo-base/demo-base';
import './cards.scss';
import data from './data.json';

class Cards extends Component {
  static handleComponentLoad() {
    console.log('this._init props : ', data);
    const cards = new Cards({ props: data });
    return cards;
  }

  _query = '.js-cards';

  _className = 'cards';

  constructor(options) {
    super(options);
    console.log('options : ', options);
    this._renderComponent();
  }

  _init() {
    const { book, picker, signUp } = this._props;
    console.log('this._init props : ', this._props);
    this._picker = new Picker({
      parent: `${this._query}__picker`,
      props: picker,
    });
    this._signUp = new SignUp({
      parent: `${this._query}__sign-up`,
      props: signUp,
    });
    this._book = new Book({
      parent: `${this._query}__book`,
      props: book,
    });
    // Book.renderComponents({
    //   parents: $(`${query}__book`, this._$element),
    //   props: book,
    // });
    // SignUp.renderComponents({ parents });
    // SignIn.renderComponents({ parents });
    // Calendar.renderComponents({ parents });
    // CardSlider.renderComponents({ parents });
  }
}

window.addEventListener('load', Cards.handleComponentLoad);

export default Cards;
