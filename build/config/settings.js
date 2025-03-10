import { environment } from "../types.js";
import { config } from 'dotenv';
config();
export const settings = {
    environment: process.env.ENV === "DEV" ? environment.DEV : environment.PROD,
    server: {
        port: Number(process.env.PORT)
    },
    database_url: process.env.DATABASE_URL,
    frontend_url: process.env.FRONTEND_URL ?? "http://localhost:5173",
    jsonwebtoken: {
        secret: process.env.JWT_SECRET,
        expires_in: process.env.JWT_EXPIRES_IN
    }
};
//# sourceMappingURL=settings.js.map