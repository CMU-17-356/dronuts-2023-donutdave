import { Schema, model } from 'mongoose';
var orderSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    items: {
        type: [{
                product_name: {
                    type: String,
                    required: true
                },
                quantity: {
                    type: Number,
                    default: 1,
                    validate: {
                        validator: Number.isInteger,
                        message: '{VALUE} is not an integer value'
                    }
                },
            }],
        default: []
    },
    totals: {
        type: Number,
        default: 0.0, // TODO: add a function to auto calculate cart totals
    },
    address: {
        type: String,
        default: ""
    }
});
orderSchema.method('addItemToOrder', function addItemToOrder(pname, q) {
    if (q === void 0) { q = 1; }
    for (var i = 0; i < this.items.length; i++) {
        if (this.items[i].product_name === pname) {
            throw new Error('addItemToOrder: item already exists in order');
        }
    }
    this.items.push({ product_name: pname, quantity: q });
    this.save(); // TODO: this is causing tests to hang after completion
});
// orderSchema.plugin(sanitizerPlugin);
var Order = model('Order', orderSchema);
export { Order };
