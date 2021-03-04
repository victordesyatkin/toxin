import bind from 'bind-decorator';

import { Component } from '../../helpers/utils';
// import Picker from '../../components/picker';
// import Footer from '../../components/footer';
// import '../cards/cards';
import Base from '../base/base';
import './landing-page.scss';
import data from './data.json';

class LandingPage extends Component {
  static handleComponentLoad() {
    const headersAndFooters = new LandingPage({ props: data });
    return headersAndFooters;
  }

  _query = 'js-landing-page';

  _className = 'landing-page';

  _init() {
    this._base = new Base();
    // Picker.renderComponents({ parents: this._$element });
    // Footer.renderComponents();
    // localStorage.clear();
    // this._$form = $('form', this._$element);
    // this._$form.on('submit', this._handleSubmitButtonClick);
  }

  //   @bind
  //   _parseFormItem(index, element) {
  //     const { name } = element;
  //     if (Object.keys(this.data).indexOf(name) !== -1) {
  //       this.data[name] = $(element).val();
  //     }
  //   }

  //   @bind
  //   _handleSubmitButtonClick() {
  //     $('input[name]', this._$form).each(this._parseFormItem);
  //     localStorage.setItem('landingPage', JSON.stringify(this.data));
  //   }
}

window.addEventListener('load', LandingPage.handleComponentLoad);

export default LandingPage;
