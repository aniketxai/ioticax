import express from 'express'
import { getMessages, sendMessage, getProductMessages} from '../controllers/getProductMessages.js'

const msgRouter = express.Router()

msgRouter.get('/product',getProductMessages)
msgRouter.get('/:id',getMessages)
msgRouter.post('/send/:id',sendMessage)




export default msgRouter;