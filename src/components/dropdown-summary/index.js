import bind from 'bind-decorator';

import { wordForm } from '../../helpers/utils';

class DropDownSummary {
  static WORDS = {
    comfort: {
      спальни: ['спальня', 'спальни', 'спален'],
      кровати: ['кровать', 'кровати', 'кроватей'],
      'ванные комнаты': ['ванная комната', 'ванные комнаты', 'ванных комнат'],
    },
    guests: {
      гость: ['гость', 'гостя', 'гостей'],
      младенцы: ['младенец', 'младенца', 'младенцев'],
    },
  };

  static TOOLS = {
    comfort: '',
    guests: '',
  };

  constructor(props = {}) {
    this._props = props;
    this._init();
  }

  renderSummary() {
    const { renderSummary } = this._props;
    if (renderSummary) {
      renderSummary(this._prepareSummary());
    }
  }

  _init() {
    const {
      type,
      separator = ', ',
      words,
      single,
      map = {},
      items,
      placeholder,
    } = this._props;
    this._separator = separator;
    this._single = single;
    this._map = map;
    this._words = words || DropDownSummary.WORDS[type] || {};
    this._placeholder = placeholder || DropDownSummary.PLACEHOLDERS[type] || {};
    this._items = items.reduce((accumulator, item) => {
      accumulator[item.name] = item;
      return accumulator;
    }, {});
    this.renderSummary();
  }

  _prepareSummary() {
    const total = Object.values(this._items).reduce((sum, item) => {
      return sum + item.value;
    }, {});
    let summary = this._placeholder;
    if (total || !summary) {
      summary = this._parseItems();
    }
    return summary;
  }

  @bind
  _parseComfortItems() {
    return Object.values(this._items).reduce((summary, item = {}, index) => {
      const separator = index === 0 ? '' : this._separator;
      const { name, value } = item;
      let word = this._map[name];
      word = wordForm(value, this._words[word]);
      return `${summary}${separator}${value} ${word}`;
    }, '');
  }

  @bind
  _parseGuestItems() {
    const common = {
      words: '',
      value: 0,
    };
    const single = {
      words: '',
      value: 0,
    };
    Object.values(this._items).forEach((item = {}) => {
      const { name, value } = item;
      const word = this._map[name];
      const words = this._words[word];
      if (this._single === name) {
        single.value += value;
        single.words = words;
      } else {
        common.value += value;
        common.words = words;
      }
    });
    const separator = common.value ? this._separator : '';
    let summary = '';
    if (common.value) {
      const { value, words } = common;
      summary += `${value} ${wordForm(value, words)}`;
    }
    if (single.value) {
      const { value, words } = single;
      summary += `${separator}${value} ${wordForm(value, words)}`;
    }
    return summary;
  }
}

export default DropDownSummary;
