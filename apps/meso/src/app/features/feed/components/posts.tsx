// Core
import React from 'react';

// Models
import { PostDto, UserDto } from '@iwdf/dto';

// Components
import Post from './post';

export interface PostsListProps {
  posts: PostDto[];
  user: UserDto;
}

const Posts = ({ posts, user }: PostsListProps) => {
  return (
    <div>
      {posts.map((post) => (
        <Post key={post._id} user={user} post={post} />
      ))}
    </div>
  );
};

export default Posts;
