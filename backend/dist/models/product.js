import { Schema, model } from 'mongoose';
var productSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        default: "" // TODO: or some other default image path
    }
});
// productSchema.plugin(sanitizerPlugin);
var Product = model('Product', productSchema);
export { Product };
