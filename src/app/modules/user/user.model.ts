import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '../../../config';
import { IUser, IUserMethods, UserModel } from './user.interface';

const userSchema = new Schema<IUser, Record<string, never>, IUserMethods>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

userSchema.methods.doesUserExist = async function (
  email: string,
): Promise<Partial<IUser> | null> {
  return await User.findOne(
    { email },
    { email: 1, password: 1, needsPasswordChange: 1 },
  )
};

userSchema.methods.doPasswordsMatch = async function (
  givenPassword: string,
  hashedPassword: string,
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, hashedPassword);
};

// pre hook middleware
userSchema.pre('save', async function (next) {
  //hash password
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

export const User = model<IUser, UserModel>('User', userSchema);
