const Conversation = require("../model/conversation");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const express = require("express");
const router = express.Router();
const { isSeller, isAuthenticated } = require("../middleware/auth");

router.post(
  "/create-new-conversation",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { groupTitle, userId, sellerId } = req.body;

      const isConversationExists = await Conversation.findOne({ groupTitle });
      if (isConversationExists) {
        const conversation = isConversationExists;
        return res.status(201).json({
          success: true,
          conversation,
        });
      }

      const conversation = await Conversation.create({
        members: [userId, sellerId],
        groupTitle: groupTitle,
      });

      res.status(201).json({
        success: true,
        conversation,
      });
    } catch (error) {
      return next(new ErrorHandler(error.response.data.message, 500));
    }
  })
);

router.get(
  "/get-all-conversation-seller/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const conversations = await Conversation.find({
        members: {
          $in: [req.params.id],
        },
      }).sort({ updatedAt: -1, createdAt: -1 });

      res.status(201).json({
        success: true,
        conversations,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  })
);
router.get(
  "/get-all-conversation-user/:id",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const conversations = await Conversation.find({
        members: {
          $in: [req.params.id],
        },
      }).sort({ updatedAt: -1, createdAt: -1 });

      res.status(201).json({
        success: true,
        conversations,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  })
);

router.put('/update-last-message/:id', catchAsyncErrors(async(req, res, next)=>{
  try{
    const {lastMessage, lastMessageId}=req.body;

    const conversation=await Conversation.findById(req.params.id);


    conversation.lastMessage=lastMessage;
    conversation.lastMessageId=lastMessageId;

    await conversation.save();

    res.status(200).json({
      success:true,
      conversation,
    })

  }
  catch(error){
    return next(new ErrorHandler(error, 500));
  }
}))

module.exports = router;
