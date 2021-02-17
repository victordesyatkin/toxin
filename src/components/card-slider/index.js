import { Component } from '../../helpers/utils';
import Slider from '../slider';
import CardHeader from '../card-header';
import RateButton from '../rate-button';

import './card-slider.scss';

class CardSlider extends Component {
  static QUERY = '.js-card-slider';

  constructor(options = {}) {
    const { query, ...props } = options;
    super({
      query: query || CardSlider.QUERY,
      props,
    });
    this.init();
  }

  _init() {
    const { slider, cardHeader, rateButton } = this._props;
    this._slider = Slider({
      parents: $(`${CardSlider.QUERY}__slider`, this._$element),
      props: slider,
    });
    this._cardHeader = CardHeader({
      parents: $(`${CardSlider.QUERY}__card-header`, this._$element),
      props: cardHeader,
    });
    this._rateButton = RateButton({
      parents: $(`${CardSlider.QUERY}__rate-button`, this._$element),
      props: rateButton,
    });
  }
}

export default CardSlider;
