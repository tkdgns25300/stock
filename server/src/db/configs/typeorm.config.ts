import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as dotenv from "dotenv";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

export const typeOrmModuleOptions: TypeOrmModuleOptions = {
	type: "mysql",
	host: process.env.DB_HOST,
	port: parseInt(process.env.DB_PORT),
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
	entities: ["dist/**/*.entity.js"],
	synchronize: process.env.DB_TYPEORM_SYNCHRONIZE === "true",
	logging: false,
	migrations: [],
	subscribers: [],
};
