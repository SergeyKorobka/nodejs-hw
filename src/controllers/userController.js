import createHttpError from 'http-errors';
import { User } from '../models/user.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

export const updateUserAvatar = async (req, res) => {
  if (!req.file) {
    throw createHttpError(400, 'No file');
  }

  const result = await saveFileToCloudinary(req.file.buffer);

  const user = await User.findByIdAndUpdate(
    req.user._id,
    { avatar: result.secure_url },
    { new: true },
  );

  res.status(200).json({ url: user.avatar });
};

export const updateUser = async (req, res) => {
  const { name } = req.body;
  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    { username: name },
    { returnDocument: 'after' },
  );

  res.status(200).json(updatedUser);
};
export const getUser = async (req, res) => {
  res.status(200).json(req.user);
};
