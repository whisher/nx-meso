// Core
import React, { useState } from 'react';

// Material
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import PeopleIcon from '@material-ui/icons/People';
import PersonIcon from '@material-ui/icons/Person';

// Material Theme
import { makeStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

// Models
import { UserDto, PostDto } from '@iwdf/dto';

// Components
import Feed from './feed';
import Posts from './posts';

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

const TabPanel = ({ children, value, index, ...other }: TabPanelProps) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`switcher-post-${index}`}
      aria-labelledby={`switcher-post-tab-${index}`}
      {...other}
    >
      {value === index && <div>{children}</div>}
    </div>
  );
};

export interface ThreadSwitcherProps {
  handleChange: (event: React.ChangeEvent<{}>, value: number) => void;
  handleConfirmDeletePost: (post:PostDto) => void;
  feed: PostDto[];
  posts: PostDto[];
  user: UserDto;
  value: number;
}

// Styles
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
}));

const ThreadSwitcher = ({
  handleChange,
  handleConfirmDeletePost,
  feed,
  posts,
  user,
  value,
}: ThreadSwitcherProps) => {
  const classes = useStyles();

  const onConfirmDeletePost = (post:PostDto) => {
    handleConfirmDeletePost(post);
  };

  return (
    <div className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="fullWidth"
        indicatorColor="primary"
        textColor="primary"
        aria-label="switcher tabs"
      >
        <Tab icon={<PeopleIcon />} aria-label="feed" />
        <Tab icon={<PersonIcon />} aria-label="posts" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Posts posts={feed} user={user}  />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Posts
          posts={posts}
          user={user} handleConfirmDeletePost={onConfirmDeletePost} 
        />
      </TabPanel>
    </div>
  );
};

export default ThreadSwitcher;
