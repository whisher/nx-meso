import UserModel from '../models/user.model';

export const getUsers = async (req, res) => {
  const users = await UserModel.find().select(
    '_id username email createdAt updatedAt'
  );
  res.json(users);
};
