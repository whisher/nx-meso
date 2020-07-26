import * as jimp from 'jimp';
import { join } from 'path';

export const resizeImage = async (req, res, next) => {
  if (!req.file) {
    return next();
  }
  const extension = req.file.mimetype.split('/')[1];
  req.body.image = `${req.user.username}-${Date.now()}.${extension}`;
  const image = await jimp.read(req.file.buffer);
  await image.resize(750, jimp.AUTO);
  const path = join(__dirname, 'assets/images/');
  await image.write(`${path}${req.body.image}`);
  next();
};
