import * as jwt from 'jsonwebtoken';
import Users from '../database/models/Users';

export default class LoginService {
  private info = { email: 'string', password: 'string' };

  async postLogin(info: { email: 'string', password: 'string' }) {
    this.info = info;
    const user = await Users.findOne({ where: { email: info.email } });
    if (user === null) {
      return 'Invalid email or password';
    }
    const status = user.password === info.password;
    if (status === false) {
      return 'Invalid email or password';
    }
    const { id, email, role, username } = user;
    const payload = { id, email, role, username };
    return {
      user: { id, username, role, email },
      token: jwt.sign(payload, 'super_senha', { algorithm: 'HS256' }),
    };
  }
}
