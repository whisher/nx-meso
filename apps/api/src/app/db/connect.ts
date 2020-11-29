import Debug from 'debug';
const debuger = Debug('app:server');
import mongoose from 'mongoose';
import { environment } from '../../environments/environment';

const connection = () => {
  const MONGODB_URL =
    'mongodb+srv://meso1:BQZt5REQILyLk7Ac@cluster0.bgvll.mongodb.net/';
  const DB = environment.production ? 'mesoprod' : 'mesodev';
  const options = { useNewUrlParser: true };
  const URI = `${MONGODB_URL}${DB}?retryWrites=true&w=majority`;
  mongoose
    .connect(URI, options)
    .then(() => {
      debuger('Connected to database!');
    })
    .catch(() => {
      debuger('Connection failed!');
    });
};

export default connection;
