import { Component } from '../../helpers';
import Expandable from '../expandable';

class ExpandableCheckboxList extends Component {
  _query = '.js-expandable-checkbox-list';

  _className = 'expandable-checkbox-list';

  constructor(options) {
    super(options);
    this._renderComponent();
  }

  _init() {
    const { expandable } = this._props;
    this._expandable = new Expandable({
      parent: this._$element,
      props: expandable,
    });
  }
}

export default ExpandableCheckboxList;
