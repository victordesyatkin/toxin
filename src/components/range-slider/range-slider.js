import "./range-slider.scss";

class RangeSlider {
  constructor(component) {
    this.component = component;
    this.class = (this.component.classList || {}).value;
    this.nodeListInputs = this.component.querySelectorAll("input");
    this.nodeListPoints = this.component.querySelectorAll(
      ".range-slider__point"
    );
    this.track = this.component.querySelector(".range-slider__track");
    this.info = this.component.querySelector(".range-slider__info");
    this.total = this.component.dataset.total;
    this.separator = this.component.dataset.separator;
    this.parentElement = this.component.parentElement;
    this.points = {};
    this.inputs = {};
    this.type = null;
    this._attachEventHandlers();
    this._prepareInfo();
    this._preparePoints();
    this._prepareTrack();
  }

  _attachEventHandlers() {
    if (this.component) {
      this.component.addEventListener("mousedown", this._mousedown);
      document.addEventListener("mouseup", this._mouseup);
      this.parentElement.addEventListener("mousemove", this._mousemove);
      this.parentElement.addEventListener("mouseout", this._mouseout);
    }
  }

  _mousedown = (event) => {
    const el = event.target || {};
    const { type } = el.dataset;
    if (type !== "start" && type !== "end") {
      return null;
    }
    this.type = type;
  };

  _mouseup = () => {
    if (this.type) {
      this.type = null;
    }
  };

  _mouseout = (event) => {
    const el = event.target || {};
    const e = Object.assign({}, event);
    let elementForClosest = (this.parentElement.classList || {}).value;
    if (elementForClosest) {
      elementForClosest = `.${elementForClosest}`;
    } else {
      elementForClosest = "body";
    }
    if (el.closest(elementForClosest)) {
      return null;
    }
    if (this.type) {
      this.type = null;
    }
  };

  _mousemove = (event) => {
    if (!this.type) {
      return null;
    }
    const { offsetWidth, offsetLeft } = this.component;
    const { clientX } = event;
    let value;
    if (this.type) {
      if (this.points && this.points[this.type]) {
        const pointWidth =
          (100 * parseFloat(this.points[this.type].offsetWidth)) /
          (2 * offsetWidth);
        value = (100 * parseFloat(clientX - offsetLeft)) / offsetWidth;
        const separator = 100 * (this.separator / this.total);
        if (this.type === "start") {
          const end = parseFloat(this.points["end"].style.left);
          if (value <= end - separator && value >= 0) {
            this.points[this.type].style.left = `${value - pointWidth}%`;
          } else {
            value = undefined;
          }
        } else if (this.type === "end") {
          const start = parseFloat(this.points["start"].style.left);
          if (value >= start + separator && value <= 100) {
            this.points[this.type].style.left = `${value - pointWidth}%`;
          } else {
            value = undefined;
          }
        }
        if (value !== undefined) {
          this._prepareTrack();
          this._setInput({ type: this.type, value });
        }
      }
    }
  };

  _preparePoints = () => {
    [].forEach.call(this.nodeListPoints, (point) => {
      const { type } = point.dataset;
      this.points[type] = point;
      const input = this.inputs[type];
      if (input && input.value !== undefined) {
        const value = parseFloat(input.value);
        if (type === "start") {
          point.style.left = `${Math.round((value / this.total) * 100)}%`;
        } else if (type === "end") {
          point.style.left = `${Math.round((value / this.total) * 100)}%`;
        }
      }
    });
  };

  _prepareTrack = () => {
    this.track.style.left = this.points.start.style.left;
    this.track.style.right = `${100 - parseFloat(this.points.end.style.left)}%`;
  };

  _prepareInfo = () => {
    let start = 0,
      end = 0,
      startStyle = "currency",
      startCurrency = "RUB",
      startUnit = "&#8381;",
      endStyle = "currency",
      endCurrency = "RUB",
      endUnit = "&#8381;";

    [].forEach.call(this.nodeListInputs, (input) => {
      const {
        type,
        style = "decimal",
        currency = "RUB",
        unit = "&#8381;",
      } = input.dataset;
      switch (type) {
        case "start": {
          start = input.value;
          startStyle = style;
          startCurrency = currency;
          startUnit = unit;
        }
        case "end": {
          end = input.value;
          endStyle = style;
          endCurrency = currency;
          endUnit = unit;
        }
        default: {
        }
      }
      if (type && !this.inputs[type]) {
        this.inputs[type] = input;
      }
    });
    const startOptions = {
      style: startStyle,
      currency: startCurrency,
      minimumFractionDigits: 0,
    };
    const endOptions = {
      style: endStyle,
      currency: endCurrency,
      minimumFractionDigits: 0,
    };
    start = new Intl.NumberFormat("ru-RU", startOptions).format(start);
    end = new Intl.NumberFormat("ru-RU", endOptions).format(end);
    if (this.info) {
      this.info.innerHTML = `${start}${startUnit} - ${end}${endUnit}`;
    }
  };

  _setInput = (o = {}) => {
    const r = null;
    const { type = "" } = o;
    let { value } = o;
    if (!this.inputs) {
      return r;
    }
    value = Math.ceil((value / 100) * this.total);
    if (type === "start") {
      if (value > this.inputs.end.value) {
        value = this.inputs.end.value;
      }
    } else if (type === "end") {
      if (value < this.inputs.start.value) {
        value = this.inputs.start.value;
      } else if (value > this.total) {
        value = total;
      }
    }
    this.inputs[type].value = value;
    this._prepareInfo();
  };
}

export default function renderComponent(callbackWhenInitialized) {
  (() => {
    const buttons = [].map.call(
      document.querySelectorAll(".range-slider"),
      (node) => {
        return new RangeSlider(node);
      }
    );

    if (
      callbackWhenInitialized &&
      typeof callbackWhenInitialized === "function"
    ) {
      callbackWhenInitialized(buttons);
    }
  })();
}

renderComponent();
