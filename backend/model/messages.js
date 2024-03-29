const mongoose = require("mongoose");

const messagesSchema = new mongoose.Schema(
  {
    conversationId: {
      type: String,
    },
    sender: {
      type: String,
    },
    images: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    text:{
      type:String,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Messages", messagesSchema);
