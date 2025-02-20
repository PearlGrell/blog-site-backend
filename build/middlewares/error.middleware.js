import { settings } from "../config/settings.js";
import { environment } from "../types.js";
export class StatusError extends Error {
    statusCode;
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
    }
}
export default function ErrorMiddleware(err, req, res, next) {
    console.log(`Error encountered: ${err}`);
    const message = err.message || "Internal Server Error";
    const status_code = err.statusCode || 500;
    res.status(status_code).send({
        "status": false,
        message,
        "error_stack": settings.environment == environment.DEV ? err.stack || {} : {}
    });
}
//# sourceMappingURL=error.middleware.js.map