import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import faker from "faker";
import User from "@/models/user.model";
import { User as UserObj } from "@/interfaces/entities/user.interface";

const password = "password1";
const salt = bcrypt.genSaltSync(8);
const hashedPassword = bcrypt.hashSync(password, salt);

export const userOne = {
  _id: mongoose.Types.ObjectId(),
  name: faker.name.findName(),
  email: faker.internet.email().toLowerCase(),
  password,
  role: "user",
  isEmailVerified: false,
} as UserObj;

export const userTwo = {
  _id: mongoose.Types.ObjectId(),
  name: faker.name.findName(),
  email: faker.internet.email().toLowerCase(),
  password,
  role: "user",
  isEmailVerified: false,
} as UserObj;

export const admin = {
  _id: mongoose.Types.ObjectId(),
  name: faker.name.findName(),
  email: faker.internet.email().toLowerCase(),
  password,
  role: "admin",
  isEmailVerified: false,
} as UserObj;

export const insertUsers = async (users: UserObj[]) => {
  await User.insertMany(users.map((user) => ({ ...user, password: hashedPassword })));
};
