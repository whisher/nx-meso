// Libs
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as helmet from 'helmet';
import * as morgan from 'morgan';

// Core
import { join } from 'path';

// Env
import { environment } from './environments/environment';

// Routes
import indexRouter from './app/routes/index';
import apiRouter from './app/routes/api';

// Helpers
import {
  notFoundResponse,
  unauthorizedResponse,
} from './app/helpers/api-response.helper';

// Mongoose
import connection from './app/db/connect';

const corsOptions: cors.CorsOptions = {
  allowedHeaders: ['Origin', 'Content-Type', 'Accept', 'Authorization'],
  credentials: true,
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  origin: environment.baseUrlApi,
  preflightContinue: false,
};

connection();

const app = express();

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet());
app.use(cors(corsOptions));

// heroku to get https protocol
app.enable('trust proxy');
app.use(express.static(join(__dirname, 'assets')));

//Route Prefixes
app.use('/', indexRouter);
app.use('/api/', apiRouter);

// throw 404 if URL not found
app.all('*', (req, res) => {
  return notFoundResponse(res, 'Page not found');
});

app.use((err, req, res, next) => {
  if (err.name == 'UnauthorizedError') {
    return unauthorizedResponse(res, err.message);
  }
});

export default app;
