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

const Feed = ({handleToggleLikePost, posts, user }: FeedListProps) => {
  const onToggleLikePost = (post:PostDto) => {
    handleToggleLikePost(post);
  };
  return (
    <div>
      {posts.map((post) => (
        <Post key={post._id} handleToggleLikePost={onToggleLikePost} user={user} post={post} />
      ))}
    </div>
  );
};

export default Feed;
