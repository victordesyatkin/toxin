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
    console.log('options 2: ', options);
    this._renderComponent();
  }

  _init() {
    console.log('options init: ', $(`${this._query}__slider`, this._$element));
    const { slider, cardHeader, rateButton } = this._props;
    this._slider = new Slider({
      parent: $(`${this._query}__slider`, this._$element),
      props: slider,
    });
    this._cardHeader = new CardHeader({
      parent: $(`${this._query}__card-header`, this._$element),
      props: cardHeader,
    });
    this._rateButton = new RateButton({
      parent: $(`${this._query}__rate-button`, this._$element),
      props: rateButton,
    });
  }
}

export default CardSlider;
