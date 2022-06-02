import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';

export default class Token {
  private static secret: string = fs.readFileSync('jwt.evaluation.key', 'utf8');

  static create(payload: object) {
    return jwt.sign(payload, this.secret, { algorithm: 'HS256', expiresIn: '7d' });
  }

  static decode(token: string) {
    return jwt.verify(token, this.secret);
  }
}
