import type { StringValue } from "ms";

export enum environment{
    PROD,
    DEV
}

export type tSettings  ={
    environment: environment
    server: {
        port: number
    }
    database_url : string
    frontend_url: string
    jsonwebtoken: {
        secret: string,
        expires_in: StringValue,
    }
};