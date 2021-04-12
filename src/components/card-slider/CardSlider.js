import { Component } from '../../helpers/utils';
import Slider from '../slider';
import CardHeader from '../card-header';
import RateButton from '../rate-button';

import './card-slider.scss';

class CardSlider extends Component {
  _query = '.js-card-slider';

  _className = 'card-slider';

  constructor(options) {
    super(options);
    this._renderComponent();
  }

  _init() {
    const { slider, cardHeader, rating } = this._props;
    this._slider = new Slider({
      parent: $(`${this._query}__slider`, this._$element),
      props: slider,
    });
    this._cardHeader = new CardHeader({
      parent: $(`${this._query}__card-header`, this._$element),
      props: cardHeader,
    });
    const { button } = rating;
    this._rateButton = new RateButton({
      parent: $(`${this._query}__rating-button`, this._$element),
      props: button,
    });
  }
}

export default CardSlider;
