import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // reference to User model
      required: true
    },

    title: {
      type: String,
      default: 'New Chat'
    }
  },
  {
    timestamps: true // adds createdAt & updatedAt automatically
  }
);

const chatModel = mongoose.model('Chat', chatSchema);

export default chatModel;