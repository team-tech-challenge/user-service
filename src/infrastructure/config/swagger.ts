import swaggerAutogen from "swagger-autogen";

const doc = {
	info: {
		version: "v1.0.0",
		title: "Swagger Tech Challenge",
		description: "Tech Challenge API",
	},
	servers: [
		{
			url: "http://user-service:3001",
		},
	],
	definitions: {		
		User: {
			cpf: "555.555.555-55",
			name: "Name of user",
			username: "user@user",
			password: "E$%0of323!@#",
		},
		getUser: {
			cpf: "555.555.555-55",
			name: "Name of user",
			username: "user@user",
		}
	},
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./src/infrastructure/config/routes.ts"];

swaggerAutogen({ openapi: "3.0.0" })(outputFile, endpointsFiles, doc);
