import { User, UserType } from "e-comm-gt-api";
import { userModel } from "../models/user.model";

export async function login(username: string, password: string) {
  const userSaved = await userModel.findOne({ username });

  if (userSaved?.password === password) {
    const user: any = userSaved.toObject();
    delete user.password;
    delete user.creditCards;
    return user;
  }
  throw new Error("The username or password is incorrect.");
}

export async function signUp(user: User) {
  user.userType = UserType.SELLER;
  const userSaved = await userModel.create(user);

  return userSaved;
}

export async function registerEmployee(user: User, admin: User) {
  if (admin.userType !== UserType.ADMIN) {
    throw new Error(
      "The user trying to register the new employee is not admin."
    );
  } else if (user.userType === UserType.SELLER) {
    throw new Error(
      "The admin can only register employees, for sellers go to sign up."
    );
  }
  const userSaved = await userModel.create(user);

  return userSaved;
}

export async function updateEmployee(user: User, admin: User) {
  if (admin.userType !== UserType.ADMIN) {
    throw new Error("The user trying to update the employee is not admin.");
  } else if (user.userType === UserType.SELLER) {
    throw new Error("The admin can only update employees info.");
  }
  const userUpdated = await userModel.updateOne(
    { username: user.username },
    user,
    { new: true }
  );

  return userUpdated;
}
