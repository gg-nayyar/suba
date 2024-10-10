import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  media: [
    {
      type: String,
      required: false,
    },
  ],
});

export default mongoose.model('Post', postSchema);