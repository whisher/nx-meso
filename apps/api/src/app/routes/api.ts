import * as express from 'express';
import authRouter from './auth';
import usersRouter from './users';
import postsRouter from './posts';

const app = express();

app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/posts', postsRouter);

export default app;
