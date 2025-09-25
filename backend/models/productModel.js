import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: Array, required: true }, // Array of image URLs
    category: { type: String, required: true },
    stock: { type: Number, required: true },
    location: { type: String, required: true },
    active: { type: Boolean, default: true },
    date: { type: Date, default: Date.now },
    seller: { type: String },
    condition: { type: String, required: true },
});   
const productModel =  mongoose.models.product || mongoose.model('Product', productSchema);

export default productModel;
