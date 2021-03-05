import isEmpty from 'lodash/isEmpty';

import { Component } from '../../helpers/utils';
import LandingPage from '../landing-page/LandingPage';
import data from './data.json';
import './landing-page-guests-dropdown.scss';

class LandingPageGuestsDropdown extends Component {
  static handleComponentLoad() {
    // console.log('LandingPageGuestsDropdown handleComponentLoad : ', data);
    const landingPageDatesDropdown = new LandingPageGuestsDropdown();
    return landingPageDatesDropdown;
  }

  _query = 'body';

  _className = '';

  constructor(options) {
    // console.log('LandingPageGuestsDropdown constructor options : ', options);
    super(options);
    this._renderComponent();
  }

  _init() {
    console.log('LandingPageGuestsDropdown this._props : ', data);
    this._landingPage = new LandingPage({
      props: isEmpty(this._props) ? data : this._props,
    });
  }
}

window.addEventListener('load', LandingPageGuestsDropdown.handleComponentLoad);

export default LandingPageGuestsDropdown;
