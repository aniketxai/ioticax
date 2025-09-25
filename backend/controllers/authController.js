import axios from "axios";
import oauth2Client from "../utils/googleConfig.js";
// ...existing code...
import userModel from "../models/authModel.js";
import jwt from "jsonwebtoken";

const googleLogin = async (req, res) => {
   try {
      const { code } = req.query;
     const googleResponse = await oauth2Client.getToken(code);
oauth2Client.setCredentials(googleResponse.tokens);

      const userResponse = await axios.get(
  `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleResponse.tokens.access_token}`
);
      const { email,name , picture } = userResponse.data;
      let user = await userModel.findOne({ email });
      if (!user) {
         user = await userModel.create({ name, email, image: picture, verified: true });

      }
         const { _id } = user;
         const token = jwt.sign({ id: _id, email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_TIMEOUT });
         return res.status(200).json({ message:'success',token, user });
     
    
   } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
   }
}

export { googleLogin };