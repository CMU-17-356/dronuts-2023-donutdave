interface CustomerOrder {
    username: string,
    id: string,
    items: [{
        title: string;
        quantity: number;
      }],
    address: string,
    totals: number,
  }

export default CustomerOrder