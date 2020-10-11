import { RequestHandler } from 'express';
import { Types } from 'mongoose';
import {
  errorResponse,
  successResponseWithData,
  unauthorizedResponse,
} from '../helpers/api-response.helper';
import { stripsTags } from '../helpers/utils';
import { PostDto } from '@iwdf/dto';
import PostModel from '../models/post.model';
import UserModel from '../models/user.model';

export const addPost: RequestHandler = async (req, res) => {
  try {
    req.body.postedBy = req['user']._id;
    req.body.text = stripsTags(req.body.text);
    const post = await new PostModel(req.body).save();
    await PostModel.populate(post, {
      path: 'postedBy',
      select: '_id name avatar',
    });
    return successResponseWithData<PostDto>(res, post);
  } catch (err) {
    console.log('Error', err);
    return errorResponse(res, err);
  }
};

export const deletePost = async (req, res) => {
  try {
    const { _id, postedBy } = req.post;
    const currentUserId = req.user._id;

    if (String(currentUserId) !== String(postedBy._id)) {
      return unauthorizedResponse(
        res,
        'You are not authorized to perform this action'
      );
    }
    const post = await PostModel.findOneAndDelete({ _id });
    return successResponseWithData<PostDto>(res, post);
  } catch (err) {
    return errorResponse(res, err);
  }
};

export const getPostById = async (req, res, next, id) => {
  const post = await PostModel.findOne({ _id: id });
  req.post = post;

  const posterId = Types.ObjectId(req.post.postedBy._id);
  if (req.user && posterId.equals(req.user._id)) {
    req.isPoster = true;
    return next();
  }
  next();
};

export const getPostsByUserId = async (req, res) => {
  try {
    const postedBy = req['user']._id;
    const posts = await PostModel.find({ postedBy: postedBy }).sort({
      createdAt: 'desc',
    });
    return successResponseWithData<PostDto[]>(res, posts);
  } catch (err) {
    return errorResponse(res, err);
  }
};

export const getFeedByUserId = async (req, res) => {
  try {
    const id = req.params.userId;
    const user = await UserModel.findOne({ _id: id });
    const { following } = user;

    const posts = await PostModel.find({ postedBy: { $in: following } }).sort({
      createdAt: 'desc',
    });

    return successResponseWithData<PostDto[]>(res, posts);
  } catch (err) {
    return errorResponse(res, err);
  }
};

export const toggleLike = async (req, res) => {
  try {
    const { postId } = req.body;
    const post = await PostModel.findOne({ _id: postId });
    const likeIds = post.likes.map((id) => id.toString());
    const authUserId = req.user._id.toString();
    if (likeIds.includes(authUserId)) {
      const index = post.likes.indexOf(authUserId);
      if (index > -1) {
        post.likes.splice(index, 1);
      }
    } else {
      post.likes.push(authUserId);
    }
    await post.save();
    return successResponseWithData<PostDto>(res, post);
  } catch (err) {
    return errorResponse(res, err);
  }
};
