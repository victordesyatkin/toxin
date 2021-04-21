import 'air-range-slider';

import { Component } from '../../helpers';

class AirRangeSlider extends Component {
  _query = '.js-air-range-slider';

  _className = 'air-range-slider';

  constructor(options) {
    super(options);
    this._renderComponent(options);
  }

  _init() {
    this._$element.slider(this._props);
  }
}

export default AirRangeSlider;
