import mongoose, { model } from 'mongoose';

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String },
  cover_img: { type: String },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tags: [{ type: String }],
  status: { type: String, enum: ['draft', 'published'], default: 'draft' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
});

const Post = model('Post', postSchema);
export default Post;
