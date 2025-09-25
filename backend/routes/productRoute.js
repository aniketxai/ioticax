import express from "express";
import { addProduct, getAllProducts, deleteProduct, getSingleProduct } from "../controllers/productController.js";
import upload from "../middleware/multer.js";

const productRouter = express.Router();
productRouter.post('/add', upload.fields([{ name: 'image1', maxCount: 1 }, { name: 'image2', maxCount: 1 }, { name: 'image3', maxCount: 1 }, { name: 'image4', maxCount: 1 }]), addProduct);
productRouter.get('/list', getAllProducts);
productRouter.delete('/delete/:id', deleteProduct);
productRouter.get('/single/:productId', getSingleProduct);
export default productRouter;