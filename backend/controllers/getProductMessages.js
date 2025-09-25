import productModel from "../models/productModel";

export const getProductMessages = async (req, res) => {
    try {
        const productId = req.params;
        const filtered = await productModel.findById(productId);
    } catch (error) {
        
    }
}

export const getMessages = async (req, res) => {
try {
    const {id:userToChatId} = req.params;
    const myID = req.user._id;
    const messages = await Msg.find({
        $or:[
            {senderID:myID, recevierID:userToChatId},
            {senderID:userToChatId, recevierID:myID}
        ]
    })
    res.status(200).json(messages)
} catch (error) {
    console.log("Error in getMessages controller", error);
    res.status(500).json({message:"Internal server error"})
}
}


export const sendMessage = async (req, res) => {
    try {
        const{text,image} = req.body;
       const { id:receiverID} = req.params;
         const senderID = req.user._id;
         let imageUrl;
            if(image){
                const uploadedImage = await cloudinary.uploader.upload(image)
                imageUrl = uploadedImage.secure_url;
            }

            const newMessage = new Msg({
                senderID,
                receiverID,
                text,
                image:imageUrl
            })
            await newMessage.save();

            //socket io







            res.status(200).json(newMessage)
        
    } catch (error) {
        console.log("Error in sendMessage controller", error);
        res.status(500).json({message:"Internal server error"})
    }
}