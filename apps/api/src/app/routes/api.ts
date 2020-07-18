import * as express from 'express';
import authRouter from './auth';
import usersRouter from './users';

const app = express();

app.use('/auth/', authRouter);
app.use('/users/', usersRouter);

export default app;
