import { sign, verify_password } from "../helpers/password.helper.js";
import { StatusError } from "../middlewares/error.middleware.js";
class UserModel {
    id;
    name;
    email;
    password;
    salt;
    constructor(user) {
        this.id = user.id || crypto.randomUUID();
        this.name = user.name;
        this.email = user.email || "";
        if (user.salt && user.password) {
            this.salt = user.salt;
            this.password = user.password;
        }
        else if (user.password) {
            [this.salt, this.password] = sign(user.password);
        }
        else {
            throw new StatusError(409, "Password cannot be undefined");
        }
    }
    loginUser(pswd) {
        if (this.salt && this.password) {
            return verify_password(pswd, this.salt, this.password);
        }
        else {
            throw new StatusError(409, "Password cannot be undefined");
        }
    }
    toJSON() {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            password: this.password,
            salt: this.salt
        };
    }
}
export default UserModel;
//# sourceMappingURL=user.model.js.map