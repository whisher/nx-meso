// Core
import React from 'react';

// Models
import { PostDto, UserDto } from '@iwdf/dto';

// Components
import Post from './post';

export interface FeedListProps {
  handleToggleLikePost: (post: PostDto) => void;
  posts: PostDto[];
  user: UserDto;
}

const Feed = ({ posts, user }: FeedListProps) => {
  return (
    <div>
      {posts.map((post) => (
        <Post key={post._id}  user={user} post={post} />
      ))}
    </div>
  );
};

export default Feed;
