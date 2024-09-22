import { IUser } from "../../models"

export const userResponse = (user: IUser, authenticated?: boolean) => {
  if (!authenticated) return {
    name: user.name,
    username: user.username
  }

  return {
    name: user.name,
    username: user.username,
    email: user.email
  }
};