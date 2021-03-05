import isEmpty from 'lodash/isEmpty';

import { Component } from '../../helpers/utils';
import LandingPage from '../landing-page/LandingPage';
import data from './data.json';
import './landing-page-dates-dropdown.scss';

class LandingPageDatesDropdown extends Component {
  static handleComponentLoad() {
    console.log('handleComponentLoad');
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
    console.log('LandingPageDatesDropdown this._props : ', this._props);
    this.landingPage = new LandingPage({
      props: isEmpty(this._props) ? data : this._props,
    });
  }
}

window.addEventListener('load', LandingPageDatesDropdown.handleComponentLoad);

export default LandingPageDatesDropdown;
