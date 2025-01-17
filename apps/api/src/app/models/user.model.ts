import { Document, model, Schema, Types } from 'mongoose';
import * as mongodbErrorHandler from 'mongoose-mongodb-errors';

const { ObjectId } = Types;

interface IUserSchema extends Document {
  about: string;
  avatar: string;
  email: string;
  password: string;
  status: boolean;
  username: string;
  following: any[];
  followers: any[];
}
const userSchema = new Schema(
  {
    about: {
      type: String,
      trim: true,
    },
    avatar: {
      type: String,
      default: 'profile-image.jpg',
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: true,
    },
    password: { type: String, required: true },
    status: { type: Boolean, required: true, default: true },
    username: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: true,
    },
    following: [{ type: ObjectId, ref: 'User' }],
    followers: [{ type: ObjectId, ref: 'User' }],
  },
  { timestamps: true }
);

const autoPopulateFollowingAndFollowers = function (next) {
  this.populate('following', '_id username avatar');
  this.populate('followers', '_id username avatar');
  next();
};

userSchema.pre<IUserSchema>('findOne', autoPopulateFollowingAndFollowers);

userSchema.plugin(mongodbErrorHandler);

export default model<IUserSchema>('User', userSchema);
