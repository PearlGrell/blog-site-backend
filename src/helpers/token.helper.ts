import jwt, { JwtPayload } from 'jsonwebtoken';
import { settings } from '../config/settings.js';

export function sign(id: string){
    const token = jwt.sign({ id },settings.jsonwebtoken.secret,{
        expiresIn: settings.jsonwebtoken.expires_in,
        algorithm: "HS256"
    });
    return token;
}

export function unsign(token: string){
    const id = jwt.verify(token, settings.jsonwebtoken.secret, {
        algorithms: ['HS256']
    }) as JwtPayload;
    return id['id'];
}