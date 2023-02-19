import { Schema, model } from 'mongoose';
import { Order } from './order.js';
var userSchema = new Schema({
    username: {
        type: String,
        required: true,
        match: /^[a-z0-9_]+$/
        // TODO: unique validator
    },
    password: {
        type: String,
        required: true
    },
    full_name: {
        type: String,
        required: true
    },
    history: {
        type: [Order.schema],
        default: []
    },
    cart: {
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
    }
});
userSchema.method('addItemToCart', function addItemToCart(pname, q) {
    if (q === void 0) { q = 1; }
    var hasFound = false;
    for (var i = 0; i < this.cart.length; i++) {
        if (this.cart[i].product_name === pname) {
            this.cart[i].quantity += q;
            this.save();
            hasFound = true;
        }
    }
    if (!hasFound) {
        this.cart.push({ product_name: pname, quantity: q });
        this.save(); // TODO: this is causing tests to hang after completion
    }
});
userSchema.method('incrementItemQuantity', function incrementItemQuantity(pname) {
    var hasFound = false;
    for (var i = 0; i < this.cart.length; i++) {
        if (this.cart[i].product_name === pname) {
            this.cart[i].quantity += 1;
            this.save();
            hasFound = true;
        }
    }
    if (!hasFound) {
        throw new Error('incrementItemQuantity: item not found in cart');
    }
});
userSchema.method('decrementItemQuantity', function decrementItemQuantity(pname) {
    var hasFound = false;
    for (var i = 0; i < this.cart.length; i++) {
        if (this.cart[i].product_name === pname) {
            this.cart[i].quantity -= 1;
            if (this.cart[i].quantity == 0) {
                this.cart.splice(i, 1);
            }
            this.save();
            hasFound = true;
        }
    }
    if (!hasFound) {
        throw new Error('decrementItemQuantity: item not found in cart');
    }
});
// userSchema.plugin(sanitizerPlugin);
var User = model('User', userSchema);
export { User };
