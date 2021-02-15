import bind from 'bind-decorator';

import { renderComponents, renderComponent } from '../../assets/helpers/utils';
import Picker from '../../components/picker';
import Footer from '../../components/footer';
import '../base/base';
import '../cards/cards';
import './landing-page.scss';

class LandingPage {
  static CLASS_NAME = 'LANDING_PAGE';
  static renderComponents(props = {}) {
    const { parents, query, render } = props;
    renderComponents({
      parents,
      query: query || '.js-landing-page',
      render: render || LandingPage._renderComponent,
    });
  }

  static _renderComponent() {
    renderComponent({
      element: arguments[1],
      className: LandingPage.CLASS_NAME,
      someClass: LandingPage,
    });
  }

  constructor(element) {
    this._element = element;
    this._$element = $(element);
    this._init();
  }

  _init() {
    Picker.renderComponents({ parents: this._$element });
    Footer.renderComponents();
    localStorage.clear();
    this._$form = $('form', this._$element);
    this._$form.on('submit', this._handleSubmitButtonClick);
  }

  _parseFormItem(data, index, element) {
    const name = element.name;
    if (Object.keys(data).indexOf(name) !== -1) {
      data[name] = $(element).val();
    }
  }

  @bind
  _handleSubmitButtonClick() {
    const data = {
      startDate: '',
      endDate: '',
      adults: '',
      children: '',
      babies: '',
    };
    $('input[name]', this._$form).each(this._parseFormItem.bind(this, data));
    localStorage.setItem('landingPage', JSON.stringify(data));
  }
}

window.addEventListener('load', LandingPage.renderComponents);

export default LandingPage;
