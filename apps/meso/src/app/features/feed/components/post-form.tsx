// Core
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';

type BreakpointOrNull = Breakpoint | null;

// Intl
import { FormattedMessage } from 'react-intl';

// Material
import IconButton from '@material-ui/core/IconButton';
import AddAPhoto from '@material-ui/icons/AddAPhoto';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';

// Material Theme
import { makeStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

// Env
import { environment } from '../../../../environments/environment';

// Models
import { UserDto } from '@iwdf/dto';

// Types
import { PostFormData } from '../../../types';

// Custom Hooks
import { useForm } from '../../../shared/hooks';

// UI
import LoaderButton from '../../../shared/ui/loader-button/loader-button';

function useWidth() {
  const theme: Theme = useTheme();
  const keys: Breakpoint[] = [...theme.breakpoints.keys].reverse();
  return (
    keys.reduce((output: BreakpointOrNull, key: Breakpoint) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const matches = useMediaQuery(theme.breakpoints.up(key));
      return !output && matches ? key : output;
    }, null) || 'xs'
  );
}
// Styles
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: useWidth() === 'lg' ? '450px' : 'auto',
    marginBottom: theme.spacing(3),
    backgroundColor: theme.palette.primary.light,
  },
  cardHeader: {
    backgroundColor: theme.palette.secondary.light,
  },
  cardContent: {
    backgroundColor: 'white',
  },
  input: {
    display: 'none',
  },
  cardActions: {
    display: 'flex',
  },
  thumb: {
    display: 'block',
    objectFit: 'cover',
    width: '30%',
    height: '50px',
  },
  thumbWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  uploadWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '60px',
  },
}));

export interface PostFormProps {
  isDisabled: boolean;
  isLoading: boolean;
  onSubmit: (data: PostFormData) => void;
  user: UserDto;
}

const PostForm = ({ isDisabled, isLoading, onSubmit, user }: PostFormProps) => {
  const classes = useStyles();
  const initialState: PostFormData = {
    text: '',
    image: null,
  };
  const [fileToUpLoad, setFileToUpLoad] = useState(null);
  const { state, bind } = useForm(initialState);

  const { text } = state;

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = fileToUpLoad ? { ...state, image: fileToUpLoad } : state;
    onSubmit(data);
  };

  const handleUploadImage = (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = (e.target as HTMLInputElement).files[0];
    setFileToUpLoad(file);
  };

  const createObjectURL = (file) => URL.createObjectURL(file);

  return (
    <Card className={classes.root}>
      <form onSubmit={submitHandler} noValidate autoComplete="off">
        <CardHeader
          avatar={<Avatar src={`${environment.baseUrlImage}${user?.avatar}`} />}
          title={
            <Typography variant="h6" component="h2">
              {user.username}
            </Typography>
          }
          className={classes.cardHeader}
        />
        <CardContent className={classes.cardContent}>
          <TextField
            label="Add a status"
            name="text"
            value={text}
            {...bind}
            placeholder={`What's on your mind, ${user.username}?`}
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <div className={classes.uploadWrapper}>
            <input
              accept="image/*"
              name="image"
              onChange={handleUploadImage}
              className={classes.input}
              type="file"
              id="icon-button-file"
            />
            <label htmlFor="icon-button-file">
              <IconButton color="secondary" component="span">
                <AddAPhoto />
              </IconButton>
            </label>

            {fileToUpLoad ? (
              <div className={classes.thumbWrapper}>
                <img
                  className={classes.thumb}
                  src={createObjectURL(fileToUpLoad)}
                />
              </div>
            ) : null}
          </div>
        </CardContent>
        <CardActions className={classes.cardActions}>
          <LoaderButton isDisabled={isDisabled} isLoading={isLoading}>
            <FormattedMessage id="post.submit" />
          </LoaderButton>
        </CardActions>
      </form>
    </Card>
  );
};

export default PostForm;
