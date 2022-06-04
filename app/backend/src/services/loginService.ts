import * as Bcrypt from 'bcryptjs';
import Users from '../database/models/Users';
import Token from '../utils/Token';

export default class LoginService {
  static async postLogin(info: { email: 'string', password: 'string' }) {
    const user = await Users.findOne({ where: { email: info.email } });
    if (user === null) {
      return false;
    }
    const status = Bcrypt.compareSync(info.password, user.password);
    if (status === false) {
      return false;
    }
    const { id, email, role, username } = user;
    const payload = { id, email, role, username };
    const token = Token.create(payload);
    return {
      user: { id, username, role, email },
      token,
    };
  }

  static async validator(authorization: string) {
    if (typeof authorization === 'string') {
      const payload = Token.decode(authorization);
      return payload;
    }
  }
}
