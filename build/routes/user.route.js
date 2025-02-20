import { Router } from "express";
import { createUser, getUser, getUsers, loginUser } from "../controllers/user.controller.js";
import { UserValidateMiddleware } from "../middlewares/validator.middleware.js";
import AuthMiddleware from "../middlewares/auth.middleware.js";
const userRouter = Router();
userRouter.get('/', getUsers);
userRouter.get('/current', AuthMiddleware, getUser);
userRouter.get('/:id', getUser);
userRouter.post('/', UserValidateMiddleware(true), createUser);
userRouter.post('/login', UserValidateMiddleware(false), loginUser);
export default userRouter;
//# sourceMappingURL=user.route.js.map