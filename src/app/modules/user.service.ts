import config from '../../config'
import { generateUserID } from './user.utils'
import { IUser } from './user/user.interface'
import { User } from './user/user.model'

const createUser = async (user: IUser): Promise<IUser | null> => {
  // auto generated incremental id
  const id = await generateUserID()
  user.id = id
  if (!user.password) {
    // setting default password
    user.password = config.default_password as string
  }
  const createdUser = await User.create(user)

  if (!createUser) {
    throw new Error('Failed to create user')
  }
  return createdUser
}

export default { createUser }
