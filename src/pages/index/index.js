import isEmpty from 'lodash.isempty';

import { Component } from '../../helpers/utils';
import LandingPage from '../landing-page/LandingPage';
import data from './data.json';
import './index.scss';

class LandingPageGeneral extends Component {
  static handleComponentLoad() {
    const landingPageDatesDropdown = new LandingPageGeneral();
    return landingPageDatesDropdown;
  }

  _query = 'body';

  _className = '';

  constructor(options) {
    super(options);
    this._renderComponent();
  }

  _init() {
    this.landingPage = new LandingPage({
      props: isEmpty(this._props) ? data : this._props,
    });
  }
}

window.addEventListener('load', LandingPageGeneral.handleComponentLoad);

export default LandingPageGeneral;
