
type DonutInfo = {
  title: string;
  quantity: number;
}


type CheckoutInfo = {
  cart: DonutInfo[]
  address: string;
  credit_card: string;
}

export default CheckoutInfo