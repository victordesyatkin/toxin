import { Component } from '../../helpers';
import Picker from '../../components/picker';
import Base from '../../templates/base';

class LandingPage extends Component {
  _query = '.js-landing-page';

  _className = 'landing-page';

  constructor(options) {
    super(options);
    this._renderComponent();
  }

  _init() {
    const { picker, backgroundImage } = this._props;
    this._base = new Base({
      props: this._props,
    });
    this._picker = new Picker({
      parents: this._$element,
      props: picker,
    });
    if (backgroundImage) {
      this._$element.css({ 'background-image': `url("${backgroundImage}")` });
    }
  }
}

export default LandingPage;
