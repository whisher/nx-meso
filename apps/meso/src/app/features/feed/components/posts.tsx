// Core
import React from 'react';

// Models
import { PostDto, UserDto } from '@iwdf/dto';

// Components
import Post from './post';

export interface PostsListProps {
  handleConfirmDeletePost?: (post:PostDto) => void;
  posts: PostDto[];
  user: UserDto;
}

const Posts = ({ handleConfirmDeletePost, posts, user }: PostsListProps) => {
  const onConfirmDeletePost = (post:PostDto) => {
    handleConfirmDeletePost(post);
  };
  return (
    <div>
      {posts.map((post) => (
        <Post
          handleConfirmDeletePost={onConfirmDeletePost} 
          key={post._id}
          user={user}
          post={post}
        />
      ))}
    </div>
  );
};

export default Posts;
