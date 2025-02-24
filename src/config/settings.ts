import { environment, tSettings } from "../types.js";
import { config } from 'dotenv';
import type { StringValue } from "ms";


config();

export const settings : tSettings = {
    environment: process.env.ENV === "DEV" ? environment.DEV : environment.PROD,
    server: {
        port : Number(process.env.PORT!)
    },
    database_url: process.env.DATABASE_URL!,
    frontend_url: process.env.FRONTEND_URL ?? "localhost:5173",
    jsonwebtoken:{
        secret: process.env.JWT_SECRET!,
        expires_in: process.env.JWT_EXPIRES_IN! as StringValue
    }
};