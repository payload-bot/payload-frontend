import { json } from "remix";

export const badRequest = <T>(data: T) => json(data, { status: 400 });

export const unauthorized = <T>(data: T) => json(data, { status: 401 });

export const forbidden = <T>(data: T) => json(data, { status: 403 });
