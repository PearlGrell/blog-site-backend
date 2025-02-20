import jwt from 'jsonwebtoken';
import { settings } from '../config/settings.js';
export function sign(id) {
    const token = jwt.sign({ id }, settings.jsonwebtoken.secret, {
        expiresIn: settings.jsonwebtoken.expires_in,
        algorithm: "HS256"
    });
    return token;
}
export function unsign(token) {
    const id = jwt.verify(token, settings.jsonwebtoken.secret, {
        algorithms: ['HS256']
    });
    return id['id'];
}
//# sourceMappingURL=token.helper.js.map