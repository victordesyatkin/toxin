import isEmpty from 'lodash.isempty';

import { Component } from '../../helpers/utils';
import LandingPage from '../landing-page/LandingPage';
import data from './data.json';
import './landing-page-dates-dropdown.scss';

class LandingPageDatesDropdown extends Component {
  static handleComponentLoad() {
    const landingPageDatesDropdown = new LandingPageDatesDropdown();
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

window.addEventListener('load', LandingPageDatesDropdown.handleComponentLoad);

export default LandingPageDatesDropdown;
