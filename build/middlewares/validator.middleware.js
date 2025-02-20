import { StatusError } from "./error.middleware.js";
export const UserValidateMiddleware = (_name) => {
    return (req, res, next) => {
        const { name, email, password } = req.body;
        if (!name && _name) {
            return next(new StatusError(400, "Name is required"));
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            return next(new StatusError(400, "Invalid email format"));
        }
        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{6,}$/;
        if (!password || !passwordRegex.test(password)) {
            return next(new StatusError(400, "Password must be at least 6 characters long and contain at least one letter and one number"));
        }
        next();
    };
};
export const PostValidateMiddleware = (req, res, next) => {
    const { title, content } = req.body;
    const id = req.params.id;
    if (!id) {
        return next(new StatusError(401, "Authentication Error: User not logged in"));
    }
    if (!title) {
        return next(new StatusError(400, "Title is required"));
    }
    if (!content) {
        return next(new StatusError(400, "Content is required"));
    }
    next();
};
//# sourceMappingURL=validator.middleware.js.map