
interface Order {
    username : String,
   items: [{
       title: String,
       quantity: Number,
   }],
   transaction_id: String
   totals : Number,
   address : String    // Delivery address
   status: String      // unpaid -> paid -> sent -> delivered
   id: string;

}

export default Order