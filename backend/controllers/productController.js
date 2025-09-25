import { v2 as cloudinary } from "cloudinary"
import productModel from "../models/productModel.js";


// Add Product

const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, stock, location, active, date, condition } = req.body;
        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined);
let imagesUrl = await Promise.all(
    images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {resource_type: "image"});
        return result.secure_url;
    })
);

        const productData = {
            name,
            description,
            price,
            category,
            stock,
            location,
            active,
            date,
            condition,
            image: imagesUrl
        };
        console.log(productData)
        const product = new productModel(productData);
        await product.save();
        
       res.json({sucess:true,message:"Product Added"})
    } catch (error) {
        console.error("Error adding product:", error);
        res.json({sucess:false,message:error.message})
    }


}


// Get All Products
const getAllProducts = async (req, res) => {
    try {
        const products = await productModel.find({});
        res.json({sucess:true,products})
    

    } catch(error){
        console.log(error)
        res.json({sucess:false,message: error.message})
    }


}

// delete Product
const deleteProduct = async (req, res) => {
    
}

// get single product
const getSingleProduct = async (req, res) => {
    try {
        const {productId} = req.params;
        const product = await productModel.findById(productId);
        res.json({sucess:true,product})
        
    } catch (error) {
        res.json({sucess:false,message:error.message})
        
    }

}


export { addProduct, getAllProducts, deleteProduct, getSingleProduct };