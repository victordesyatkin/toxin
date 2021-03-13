import bind from 'bind-decorator';

import { wordForm } from '../../helpers/utils';

class DropDownSummary {
  static WORDS = {
    comfort: {
      bedroom: ['спальня', 'спальни', 'спален'],
      bed: ['кровать', 'кровати', 'кроватей'],
      bathroom: ['ванная комната', 'ванные комнаты', 'ванных комнат'],
    },
    guests: {
      guest: ['гость', 'гостя', 'гостей'],
      baby: ['младенец', 'младенца', 'младенцев'],
    },
  };

  static TOOLS = {
    comfort: '_parseComfortItems',
    guests: '_parseGuestItems',
  };

  static PLACEHOLDERS = {
    comfort: 'Удобства',
    guests: 'Сколько гостей',
  };

  static MAPS = {
    comfort: {
      'comfort[bedroom]': 'bedroom',
      'comfort[bed]': 'bed',
      'comfort[bathroom]': 'bathroom',
    },
    guests: {
      'guests[adult]': 'guest',
      'guests[child]': 'guest',
      'guests[baby]': 'baby',
    },
  };

  static TOGETHER = {
    guests: {
      'guests[adult]': 'guest',
      'guests[child]': 'guest',
    },
  };

  constructor(props = {}) {
    this._props = props;
    this._init();
  }

  updateItems(items) {
    const { updateItems } = this._props;
    this._items = {
      ...this._items,
      ...items,
    };
    this.updateSummary();
    if (updateItems) {
      updateItems();
    }
  }

  updateSummary() {
    const { updateSummary } = this._props;
    if (updateSummary) {
      updateSummary(this._prepareSummary());
    }
  }

  _init() {
    const {
      type,
      separator = ', ',
      words,
      map,
      items,
      placeholder,
      together,
    } = this._props;
    this._type = type;
    this._separator = separator;
    this._map = map || DropDownSummary.MAPS[this._type] || {};
    this._words = words || DropDownSummary.WORDS[this._type] || {};
    this._together = together || DropDownSummary.TOGETHER[this._type] || {};
    this._placeholder = placeholder || DropDownSummary.PLACEHOLDERS[this._type];
    this._items =
      items?.reduce((accumulator, item) => {
        accumulator[item.name] = item;
        return accumulator;
      }, {}) || {};
    this.updateSummary();
  }

  _prepareSummary() {
    const total = Object.values(this._items)?.reduce((sum, item) => {
      return sum + item.value;
    }, 0);
    if (!total) {
      const { handleEmptySummary } = this._props;
      if (handleEmptySummary) {
        handleEmptySummary();
      }
    } else {
      const { handleFillSummary } = this._props;
      if (handleFillSummary) {
        handleFillSummary();
      }
    }
    let summary = this._placeholder;
    const parseItems = this[DropDownSummary.TOOLS[this._type]];
    if (total || !summary) {
      summary = parseItems ? parseItems() : '';
    }
    return summary;
  }

  @bind
  _parseComfortItems() {
    return Object.values(this._items)?.reduce((summary, item = {}) => {
      const separator = summary ? this._separator : '';
      const { name, value } = item;
      let word = this._map[name];
      const words = this._words[word];
      if (words) {
        word = wordForm(value, words);
        return `${summary}${separator}${value} ${word}`;
      }
      return summary;
    }, '');
  }

  @bind
  _parseGuestItems() {
    const forTogether = 'together';
    const data = Object.values(this._items).reduce((accumulator, item = {}) => {
      let { name, value: passValue } = item;
      const word = this._map[name];
      const words = this._words[word];
      passValue = parseInt(passValue || 0, 10) || 0;
      let value = passValue;
      if (words) {
        if (this._together[name]) {
          name = forTogether;
          value += parseInt(accumulator?.[name]?.value || 0, 10);
        }
        accumulator[name] = {
          value: parseInt(value, 10),
          words,
        };
      }
      return accumulator;
    }, {});
    return Object.values(data).reduce((summary, item) => {
      const { value, words } = item;
      if (!value) {
        return summary;
      }
      const separator = summary ? this._separator : '';
      const word = wordForm(value, words);
      return `${summary}${separator}${value} ${word}`;
    }, '');
  }
}

export default DropDownSummary;
