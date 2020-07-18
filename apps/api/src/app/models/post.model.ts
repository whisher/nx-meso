import { Document, model, Schema } from 'mongoose';
import * as mongodbErrorHandler from 'mongoose-mongodb-errors';

const { ObjectId } = Schema;

interface IPostSchema extends Document {
  text: string;
  image: string;
  likes: any[];
  comments: any[];
  postedBy: any[];
  createdAt: Date;
}

const postSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    likes: [{ type: ObjectId, ref: 'User' }],
    comments: [
      {
        text: String,
        createdAt: { type: Date, default: Date.now },
        postedBy: { type: ObjectId, ref: 'User' },
      },
    ],
    postedBy: { type: ObjectId, ref: 'User' },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  /* don't want to create our indices every time (nice for development, but can result in a performance hit) */
  { autoIndex: false }
);

/* Kind of like a middleware function after creating our schema (since we have access to next) */
/* Must be a function declaration (not an arrow function), because we want to use 'this' to reference our schema */
const autoPopulatePostedBy = function (next) {
  this.populate('postedBy', '_id username avatar');
  this.populate('comments.postedBy', '_id username avatar');
  next();
};

/* We're going to need to populate the 'postedBy' field virtually every time we do a findOne / find query, so we'll just do it as a pre hook here upon creating the schema */
postSchema
  .pre<IPostSchema>('findOne', autoPopulatePostedBy)
  .pre<IPostSchema>('find', autoPopulatePostedBy);
/* Create index on keys for more performant querying/post sorting */

postSchema.index({ postedBy: 1, createdAt: 1 });

postSchema.plugin(mongodbErrorHandler);

export default model<IPostSchema>('Post', postSchema);