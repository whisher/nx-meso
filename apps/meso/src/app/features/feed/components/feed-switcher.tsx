// Core
import React from 'react';

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
import { Posts } from '../components';

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

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
export interface FeedSwitcherProps {
  posts: PostDto[];
  user: UserDto;
}
// Styles
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
}));
const FeedSwitcher = ({ posts, user }: FeedSwitcherProps) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
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
        <Tab icon={<PeopleIcon />} aria-label="phone" />
        <Tab icon={<PersonIcon />} aria-label="favorite" />
      </Tabs>
      <TabPanel value={value} index={0}>
        Item One
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Posts posts={posts} user={user} />
      </TabPanel>
    </div>
  );
};

export default FeedSwitcher;
