import mongoose from "mongoose";

const msgSchema = new mongoose.Schema(
    {
        senderID: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "User", 
            required: true 
        },
        receiverID: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "User", 
            required: true 
        },
        productID: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Product"
        },
        text: { 
            type: String, 
        },
        image: { 
            type: String 
        },
        
    },
    { timestamps: true }
);

const Msg = mongoose.model("Msg", msgSchema);
export default Msg;