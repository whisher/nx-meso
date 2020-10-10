// Core
import React from 'react';

// Models
import { PostDto, UserDto } from '@iwdf/dto';

// Components
import Post from './post';

export interface PostsListProps {
  handleConfirmDeletePost?: (post:PostDto) => void;
  handleToggleLikePost: (post: PostDto) => void;
  posts: PostDto[];
  user: UserDto;
}

const Posts = ({ handleConfirmDeletePost,handleToggleLikePost, posts, user }: PostsListProps) => {
  const onConfirmDeletePost = (post:PostDto) => {
    handleConfirmDeletePost(post);
  };
  const onToggleLikePost = (post:PostDto) => {
    handleToggleLikePost(post);
  };
  return (
    <div>
      {posts.map((post) => (
        <Post
          handleConfirmDeletePost={onConfirmDeletePost} handleToggleLikePost={onToggleLikePost}
          key={post._id}
          user={user}
          post={post}
        />
      ))}
    </div>
  );
};

export default Posts;
