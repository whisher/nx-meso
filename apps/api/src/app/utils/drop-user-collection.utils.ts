import { connection } from 'mongoose';

export const dropUserCollection = () => {
  connection.db.dropCollection('User');
};
