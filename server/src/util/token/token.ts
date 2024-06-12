import * as fs from "fs";
import * as crypto from "crypto";
import * as dotenv from "dotenv";
import * as jwt from "jsonwebtoken";
import path from "path";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
const secretKey: string = process.env.SECRET_KEY;
const tokenFilePath = path.resolve("./src/util/token/token.json");

const encrypt = (token: string): string => {
	const encryptedThirdPartyToken = jwt.sign({ data: token }, secretKey, { expiresIn: "24h" });
	return encryptedThirdPartyToken;
};

const decrypt = (entryptedToken: string): string => {
	try {
		const decodedToken = jwt.verify(entryptedToken, secretKey);
		return decodedToken.data;
	} catch (err) {
		return null;
	}
};

const saveToken = (token: string, expiration: number): void => {
	const encryptedToken = encrypt(token);
	const data = {
		token: encryptedToken,
		expiration: expiration,
	};

	fs.writeFileSync(tokenFilePath, JSON.stringify(data));
};

const loadToken = (): string | null => {
	if (fs.existsSync(tokenFilePath)) {
		const fileContent = fs.readFileSync(tokenFilePath, "utf8");
		if (!!fileContent) {
			const data = JSON.parse(fileContent);
			const token = decrypt(data.token);
			const expiration = data.expiration;
			if (new Date().getTime() < expiration) {
				return token;
			}
		}
	}
	return null;
};

const fetchToken = async (): Promise<string> => {
	const response = await fetch("https://openapi.koreainvestment.com:9443/oauth2/tokenP", {
		method: "POST",
		headers: {
			"Content-Type": "application/json; charset=UTF-8",
		},
		body: JSON.stringify({
			grant_type: "client_credentials",
			appkey: process.env.KIS_APP_KEY,
			appsecret: process.env.KIS_APP_SECRET,
		}),
	});

	const data: any = await response.json();
	const newToken = data.access_token;
	const newTokenExpiration = new Date().getTime() + 86400000; // 24 hours

	saveToken(newToken, newTokenExpiration);

	return newToken;
};

export const getToken = async (): Promise<string> => {
	const token = loadToken();

	if (token) {
		return token;
	}

	return await fetchToken();
};
