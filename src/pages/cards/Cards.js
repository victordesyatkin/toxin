import { Component } from '../../helpers';
import Picker from '../../components/picker';
import SignUp from '../../components/sign-up';
import SignIn from '../../components/sign-in';
import Calendar from '../../components/calendar';
import CardSlider from '../../components/card-slider';
import Book from '../../components/book';

class Cards extends Component {
  _query = '.js-cards';

  _className = 'cards';

  constructor(options) {
    super(options);
    this._renderComponent();
  }

  _init() {
    const {
      book,
      picker,
      signUp,
      signIn,
      calendar,
      cardSlider1,
      cardSlider2,
    } = this._props;
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
    this._signIn = new SignIn({
      parent: `${this._query}__sign-in`,
      props: signIn,
    });
    this._calendar = new Calendar({
      parent: `${this._query}__calendar`,
      props: calendar,
    });
    this._cardSlider1 = new CardSlider({
      parent: `${this._query}__card-slider-first`,
      props: cardSlider1,
    });
    this._cardSlider2 = new CardSlider({
      parent: `${this._query}__card-slider-second`,
      props: cardSlider2,
    });
  }
}

export default Cards;
