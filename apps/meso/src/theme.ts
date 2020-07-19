import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    layout: {
      header: {
        height: string;
      };
      footer: {
        height: string;
      };
    };
  }
  // allow configuration using `createMuiTheme`
  interface ThemeOptions {
    layout: {
      header: {
        height: string;
      };
      footer: {
        height: string;
      };
    };
  }
}
const theme = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      '@global': {
        body: {
          backgroundColor: '#ffffff',
          color: '#263238',
        },
      },
    },
  },
  palette: {
    primary: {
      main: '#6ACAD5',
    },
    secondary: {
      main: '#D36532',
    },
    background: {
      default: '#303030',
    },
  },
  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    fontWeightMedium: 500,
    h1: {
      fontSize: '2.986rem',
    },
    h2: {
      fontSize: '2.488rem',
    },
    h3: {
      fontSize: '2.074rem',
    },
    h4: {
      fontSize: '1.728rem',
    },
    h5: {
      fontSize: '1.44rem',
    },
    h6: {
      fontSize: '1.2rem',
    },
    body1: {
      fontWeight: 500,
    },
    subtitle1: {
      fontSize: 12,
    },
    button: {
      fontStyle: 'italic',
    },
  },
  layout: {
    header: {
      height: '80px',
    },
    footer: {
      height: '60px',
    },
  },
});

export default responsiveFontSizes(theme);

/*
background: rgb(9,141,138);
background: linear-gradient(90deg, rgba(9,141,138,1) 0%, rgba(106,202,213,1) 38%, rgba(106,202,213,1) 100%);*/
