const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema =new Schema({
    users:[{
        type:Schema.Types.ObjectId,
        ref:"User"
    }],
    messages:[{
        type:Schema.Types.ObjectId,
        ref:"Message"
    }],
    chatName:String
});
module.exports=mongoose.model('Chat',chatSchema);