import { Router } from "express";
import { UserAdapter } from "@adapters/UserAdapter";
import { UserUseCase } from "@usecases/UserUseCase";
import { UserController } from "@controllers/UserController";

export const userRoute = Router();

const userAdapter = new UserAdapter();
const userUseCase = new UserUseCase(userAdapter);
const userController = new UserController(userUseCase);

userRoute.get("/all", (req, res) => {
	// #swagger.tags = ['User']
	/* #swagger.responses[200] = {
            description: 'Return all user',
            schema: { $ref: '#/definitions/getUser' }
    } */
	userController.getAll(req, res);
});

userRoute.post("/create", (req, res) => {
	// #swagger.tags = ['User']
	// #swagger.description = 'Create a new user'
	/* #swagger.requestBody = {
            required: true,
            description: 'Create User',
            content: {
                "application/json": {
                    schema: { $ref: '#/definitions/User' }
                }
            }
        }
    */
	userController.createUser(req, res);
});

userRoute.get("/id/:id", (req, res) => {
	// #swagger.tags = ['User']
	/* #swagger.responses[200] = {
            description: 'Search user by ID',
            schema: { $ref: '#/definitions/getUser' }
    } */
	userController.getUserById(req, res);
});

userRoute.get("/search/:cpf", (req, res) => {
	// #swagger.tags = ['User']
	/* #swagger.responses[200] = {
            description: 'Search user by CPF',
            schema: { $ref: '#/definitions/getUser' }
    } */
	userController.findUser(req, res);
});

userRoute.put("/update/:id", (req, res) => {
	// #swagger.tags = ['User']
	// #swagger.description = 'Update user by ID'
	/* #swagger.requestBody = {
			required: true,
			description: 'Update User',
			content: {
				"application/json": {
					schema: { $ref: '#/definitions/User' }
				}
			}
		}
	*/
	userController.updateUser(req, res);
});

userRoute.delete("/delete/:id", (req, res) => {
	// #swagger.tags = ['User']
	// #swagger.description = 'Delete user by ID'
	userController.deleteUser(req, res);
});
