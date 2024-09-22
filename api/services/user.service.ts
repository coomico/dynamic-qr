import { IUser, UserDB } from "../models";

import { ErrorCapture } from "../utils/error_capture";

export const create = async (data: IUser) => {
  let user = new UserDB({
    name: data.name,
    username: data.username,
    email: data.email,
    password: data.password,
    tokens: []
  });

  user = await user.save();
  return user;
};

export const getById = async (id: string) => {
  const user = await UserDB.findById(id);
  if (!user) throw new ErrorCapture('user not found', 404);

  return user;
};

export const getByEmail = async (email: string) => {
  const user = await UserDB.findOne({email: email});
  if (!user) throw new ErrorCapture('user not found', 404);

  return user;
};

export const getByUsername = async (username: string) => {
  const user = await UserDB.findOne({username: username});
  if (!user) throw new ErrorCapture('user not found', 404);

  return user;
};

export const saveUpdate = async (user: IUser) => {
  user = await user.save();
  return user;
};

export const destroy = async (data: IUser) => {
  const res = await UserDB.deleteOne({
    _id: data._id,
    username: data.username,
    email: data.email
  });

  if (!res.deletedCount) throw new ErrorCapture('user does not exist', 404);
};