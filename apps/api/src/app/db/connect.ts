import Debug from 'debug';
const debuger = Debug('app:server');
import { connect } from 'mongoose';
import { environment } from '../../environments/environment';

const connection = () => {
  const MONGODB_URL =
    'mongodb+srv://URL_TO_MONGODB/';
  const DB = environment.production ? 'mesoprod' : 'mesodev';
  const options = { useNewUrlParser: true };
  const URI = `${MONGODB_URL}${DB}?retryWrites=true&w=majority`;
  connect(URI, options)
    .then(() => {
      debuger('Connected to database!');
    })
    .catch(() => {
      debuger('Connection failed!');
    });
};

export default connection;
