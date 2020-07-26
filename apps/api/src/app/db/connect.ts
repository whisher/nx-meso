import Debug from 'debug';
const debuger = Debug('app:server');
import { connect } from 'mongoose';
import { environment } from '../../environments/environment';

const connection = () => {
  const MONGODB_URL = environment.mongoDb;
  const DB = environment.production ? 'production1' : 'development5';
  const options = { useNewUrlParser: true, useUnifiedTopology: true };
  const uri = `${MONGODB_URL}/${DB}`;
  connect(uri, options)
    .then(() => {
      debuger('Connected to database!');
    })
    .catch(() => {
      debuger('Connection failed!');
    });
};

export default connection;
