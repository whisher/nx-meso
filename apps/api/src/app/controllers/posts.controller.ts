import { RequestHandler } from 'express';
import { Types } from 'mongoose';
import {
  errorResponse,
  successResponseWithData,
} from '../helpers/api-response.helper';
import { PostDto } from '@iwdf/dto';
import PostModel from '../models/post.model';

export const addPost: RequestHandler = async (req, res) => {
  try {
    req.body.postedBy = req['user']._id;
    const post = await new PostModel(req.body).save();
    await PostModel.populate(post, {
      path: 'postedBy',
      select: '_id name avatar',
    });
    return successResponseWithData<PostDto>(res, post);
  } catch (err) {
    return errorResponse(res, err);
  }
};

export const deletePost = async (req, res) => {
  try {
    const { _id } = req.post;

    if (!req.isPoster) {
      return res.status(400).json({
        message: 'You are not authorized to perform this action',
      });
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
    const { following, _id } = req.profile;
    following.push(_id);
    const posts = await PostModel.find({ postedBy: { $in: following } }).sort({
      createdAt: 'desc',
    });
    return successResponseWithData<PostDto[]>(res, posts);
  } catch (err) {
    return errorResponse(res, err);
  }
};
