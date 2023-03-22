interface CustomerOrder {
    name: string,
    id: string,
    items: [{
        title: string;
        quantity: number;
      }],
    address: string,
    price: number,
  }

export default CustomerOrder