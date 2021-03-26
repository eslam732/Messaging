const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema=new Schema({
from:{
    type:Schema.Types.ObjectId,
    ref:"User"
},
chatId:{
    type:Schema.Types.ObjectId,
    ref:"Chat"
},
content:{
    type:String
},
status:{
type:Boolean,
default:false
}

});

module.exports=mongoose.model('Message',messageSchema);