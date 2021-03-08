import isEmpty from 'lodash/isEmpty';

import { Component, requireAll } from '../../helpers/utils';
import Picker from '../../components/picker';
import Base from '../base/base';
import data from './data.json';
import './index';

requireAll(require.context('./images/', false, /\.jpg$/));
class LandingPage extends Component {
  static handleComponentLoad() {
    console.log('handleComponentLoad');
    const landingPage = new LandingPage();
    return landingPage;
  }

  _query = '.js-landing-page';

  _className = 'landing-page';

  constructor(options) {
    super(options);
    this._renderComponent();
  }

  _init() {
    console.log('LandingPage this._props : ', this._props);
    const { picker } = isEmpty(this._props) ? data : this._props;
    this._base = new Base({
      props: this._props,
    });
    this._picker = new Picker({
      parents: this._$element,
      props: picker,
    });
  }
}

export default LandingPage;
