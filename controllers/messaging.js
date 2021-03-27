const User = require('../models/users');
const MessageModel = require('../models/messages');
const ChatModel = require('../models/chats');
const socketIo = require('../socketIo');




const sendMessage=async (req,res,next)=>{
    
// const textMessage=req.body.textMessage;
// const chatId=req.body.chatId;
// const reciverId=req.body.reciverId;
const {textMessage,chatId,reciverId}=req.body
let chat;
let message;

// if(!(chatId&&reciverId)){
    
// }

if(!chatId && !reciverId){

   
return res.status(400).json({message:'must send reciver id or chat id '})
}

if(!textMessage){   
return res.status(400).json({message:'message cannot be null '})
}

try{


    if (chatId) {
        const chat = await ChatModel.findById(chatId);
        if (!chat) {
            return res.status(400).json({ message: "chat not found" });
        }
        message = new MessageModel({
            content: textMessage,
            sender: req.userId,
            chatId: chatId
        });
        chat.messages.push(message._id);
        chat.save();
        message.save();
        const data={
            message:textMessage,
            sender:req.userId,
            chatId:chatId
        }
        socketIo.getIO().emit(`receiveMessage::${chatId}`,data)
        return res.status(200).json({ message: message });


    }

    if (reciverId) {
        const currentUser = await User.findById(req.userId);
        const reciver = await User.findById(reciverId);
        if (!reciver) {
            return res.status(400).json({ message: "reciver not found" });
        }
        chat = await ChatModel.findOne({ users: [req.userId.toString(), reciverId.toString()] });

        // $or:[{fildName:value},{filedName:value}]
        console.log(('chaaaaaaaat'),chat)

        if(!chat){
            
            console.log(reciverId.toString())
                
                chat = await ChatModel.findOne({ users: [reciverId.toString(), req.userId.toString()] });
            
        }
        
       if(!chat) {
        chat = new ChatModel({
           
            users: [req.userId, reciverId],

        })}
        message = new MessageModel({
            content: textMessage,
            from: req.userId,
            chatId: chat._id
        });
          

        chat.messages.push(message._id);
        res.status(200).json({ message: message });
        currentUser.chats.push(chat._id);
        reciver.chats.push(chat._id);
        currentUser.save();
        reciver.save();

        chat.save();
        message.save();



    }
}
catch(error){
    console.log(error)
}
}
const getAllChats = async (req, res, next) => {
    try {

        const chats = await User.findById(req.userId,{chats:1}).populate('chats',{users:1,_id:1});
        
        
        //console.log(user.chats)
        return res.status(200).json({ chats: chats });

    } catch (error) {

    }
}

const getMessages=async(req,res,next)=>{
    const {chatId}=req.body;
let messages;
    if(!chatId){
        return res.status(400).json({message:'must send chat id '})
    }
    try{
messages =await ChatModel.findById(chatId).populate('messages',{content:1});
if(!messages){
    return res.status(400).json({message:'chat not found '})
}
return res.status(200).json({message:messages})

    }
    catch(error){

    }
}

module.exports={
    sendMessage,
    getAllChats,
    getMessages
}