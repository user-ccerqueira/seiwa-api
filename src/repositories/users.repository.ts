import { User } from "../models";

export class UserRepository {
  create(user): Promise<User> {
    return User.create(user);
  }

  static findByAPIToken(token: string): Promise<User> {
    return User.findOne({
      where: { apiKey: token.replace("Bearer ", "") },
    });
  }
}

export default UserRepository;
