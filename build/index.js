import express from 'express';
import { settings } from './config/settings.js';
import { environment } from './types.js';
import cors from 'cors';
import userRouter from './routes/user.route.js';
import ErrorMiddleware from './middlewares/error.middleware.js';
import postRouter from './routes/post.route.js';
const port = settings.server.port;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: settings.frontend_url,
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true
}));
app.options("*", cors());
app.use('/api/user', userRouter);
app.use('/api/post', postRouter);
app.use(ErrorMiddleware);
app.listen(port, () => {
    if (settings.environment == environment.DEV) {
        console.log(`Server started on http://localhost:${port}`);
    }
});
export default app;
//# sourceMappingURL=index.js.map