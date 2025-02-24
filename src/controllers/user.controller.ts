import { NextFunction, Request, Response } from "express";
import { client } from "../database/index.js";
import { StatusError } from "../middlewares/error.middleware.js";
import UserModel from "../models/user.model.js";
import { sign } from "../helpers/token.helper.js";
import respond from "../middlewares/response.middleware.js";

export async function getUsers(req: Request, res: Response, next: NextFunction) {
    try{

        const {limit, offset} = req.query;

        const users = await client.users.findMany({
            select: {
                id: true,
                name: true,
                email: true
            },
            skip: Number(offset) || undefined,
            take: Number(limit) || undefined
        });

        if(limit)

        if(users.length === 0){
            return next(new StatusError(404, "Users not found"))
        }

        return respond({
            message: "Users found",
            status_code: 200,
            label: "users",
            data: users
        }, res);
    } catch(error){
        next(error);
    }
}

export async function createUser(req: Request, res: Response, next: NextFunction) {
    try {
        const { name, email, password } = req.body;

        const exists = await client.users.findUnique({ where: { email } });
        if (exists) {
            return next(new StatusError(400, "User already exists"))
        }

        const user = new UserModel({ name, email, password });

        await client.users.create({
            data: user.toJSON()
        });

        const token = sign(user.id!);

        return respond({
            message: "User created successfully",
            status_code: 201,
            label: "authtoken",
            data: token
        }, res);
    } catch (error) {
        next(error);
    }
}

export async function getUser(req: Request, res: Response, next: NextFunction) {
    try {
        const id = req.params.id;

        const user = await client.users.findUnique({
            where: { id }, select: {
                id: true,
                name: true,
                email: true
            }
        });

        if (!user) {
            return next(new StatusError(404, "User not found"));
        }

        return respond({
            message: "User found",
            status_code: 200,
            label: "user",
            data: user
        }, res);
    } catch (error) {
        next(error);
    }
}

export async function loginUser(req: Request, res: Response, next: NextFunction) {
    try {
        const { email, password } = req.body;

        const _user = await client.users.findFirst({ where: { email } });

        if (!_user) {
            return next(new StatusError(404, "User not found"));
        }

        const user = new UserModel({
            email: _user.email,
            password: _user.password!,
            name: _user.name!,
            id: _user.id!,
            salt: _user.salt!
        });

        if (user.loginUser(password) === true) {
            const token = sign(user.id!);
            return respond({
                message: "User logged in successfully",
                status_code: 200,
                label: "authtoken",
                data: token
            }, res);
        } else {
            return next(new StatusError(401, "Incorrect Password"));
        }
    } catch (error) {
        next(error);
    }
}
