import { Schema, model } from 'mongoose';
import { Product } from './product.js';
// const sanitizerPlugin = require('mongoose-sanitizer-plugin');
var defaultMerchant = "Lawrenceville Donut Store";
var merchantSchema = new Schema({
    name: {
        type: String,
        default: defaultMerchant,
        // TODO: unique validator
    },
    location: {
        type: String,
        default: "Lawrenceville",
    },
    menu: {
        type: [Product.schema],
        default: [],
    }
});
// merchantSchema.plugin(sanitizerPlugin);
var Merchant = model('Merchant', merchantSchema);
export { Merchant, defaultMerchant };
