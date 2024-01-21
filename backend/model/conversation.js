const mongoose=require('mongoose');


const conversationSchema=new mongoose.Schema({
    members:{
        type:Array,
    },
    lastMessage:{
        type:String,
    },
    lastMessageId:{
        type:String,
    },
    groupTitle:{
        type:String,
    }
},
{timestamps:true})

module.exports=mongoose.model('Conversation', conversationSchema);