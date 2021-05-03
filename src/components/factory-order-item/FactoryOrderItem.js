import OrderItem from '../order-item';
import OrderItemBasis from '../order-item-basis';
import OrderItemDiscount from '../order-item-discount';
import OrderItemTax from '../order-item-tax';

class FactoryOrderItem {
  constructor(props) {
    this._props = props;
  }

  create({ parent, item }) {
    const { type } = item;
    let SomeClass = null;
    switch (type) {
      case 'basis': {
        SomeClass = OrderItemBasis;
        break;
      }
      case 'discount': {
        SomeClass = OrderItemDiscount;
        break;
      }
      case 'tax': {
        SomeClass = OrderItemTax;
        break;
      }
      default: {
        SomeClass = OrderItem;
      }
    }
    return new SomeClass({
      parent,
      props: { ...this._props, ...item },
    });
  }
}

export default FactoryOrderItem;
