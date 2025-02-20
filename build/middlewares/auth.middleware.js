import { StatusError } from "./error.middleware.js";
import { unsign } from "../helpers/token.helper.js";
export default function AuthMiddleware(req, res, next) {
    try {
        const auth = req.headers['authorization'];
        const token = auth?.split(" ")[1];
        if (!token) {
            return next(new StatusError(401, "Unauthorized: No token provided"));
        }
        const id = unsign(token);
        req.params.id = id;
        next();
    }
    catch (error) {
        next(error);
    }
}
;
//# sourceMappingURL=auth.middleware.js.map