// Core
import React from 'react';

// Models
import { PostDto, UserDto } from '@iwdf/dto';

import PostBox from './post-box';

export interface PostsListProps {
  posts: PostDto[];
  user: UserDto;
}

const PostsList = ({ posts, user }: PostsListProps) => {
  return (
    <div>
      {posts.map((post) => (
        <PostBox key={post._id} user={user} post={post}></PostBox>
      ))}
    </div>
  );
};

export default PostsList;
