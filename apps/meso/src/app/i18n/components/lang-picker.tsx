import React from 'react';

// Material
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

// Material Theme
import { makeStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

// Styles
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    '& > .Mui-selected': {
      backgroundColor: 'rgba(255,255,255,.2)',
    },
  },
  button: {
    'border-color': theme.palette.secondary.main,
  },
}));
export interface LangPickerProps {
  currentLang: string;
  supportedLanguages: string[];
  onChangeLang: (lang: string) => void;
}
const LangPicker = ({
  currentLang,
  supportedLanguages,
  onChangeLang,
}: LangPickerProps) => {
  const classes = useStyles();
  const onSetLang = (event: React.MouseEvent<HTMLElement>, current: string) => {
    onChangeLang(current);
  };

  return (
    <ToggleButtonGroup
      className={classes.root}
      value={currentLang}
      exclusive
      onChange={onSetLang}
      aria-label="lang"
    >
      {supportedLanguages.map((lang, index) => (
        <ToggleButton
          className={classes.button}
          key={index}
          value={lang}
          size="small"
          aria-label="current lang"
        >
          {lang}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

export default LangPicker;
