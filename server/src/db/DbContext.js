import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { ValueSchema } from '../models/Value'
import { PostSchema } from '../models/Post.js';
import { LikeSchema } from '../models/Like.js';
import { CatagorySchema } from '../models/Category.js';

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);

  Posts = mongoose.model('Post', PostSchema)

  Likes = mongoose.model('Like', LikeSchema)

  Categories = mongoose.model('Category', CatagorySchema)
}

export const dbContext = new DbContext()
