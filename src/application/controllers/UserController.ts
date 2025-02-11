import { UserUseCase } from "@usecases/UserUseCase";
import { defaultReturnStatement } from "@utils/http";
import { User } from "@entities/User";

export class UserController {
	constructor(private userUseCase: UserUseCase) { }

	async getAll(req, res) {
		try {
			const users = await this.userUseCase.getAll();
			defaultReturnStatement(res, "Users", users);
		} catch (err) {
			console.error(err);
			res.status(400).json({ error: err.message });
		}
	}

	async createUser(req, res) {
		try {
			const {cpf, name, username, password} = req.body
			const userData = new User(cpf,name,username,password);	
			const user = await this.userUseCase.createUser(userData);
			defaultReturnStatement(res, "User Created", user);
		} catch (err) {
			console.error(err);
			res.status(400).json({ error: err.message });
		}
	}

	async getUserById(req, res) {
		try {
			const user = await this.userUseCase.getUserById(req.params.id);
			defaultReturnStatement(res, "user", user);
		} catch (err) {
			console.error(err);
			res.status(400).json({ error: err.message });
		}
	}

	async findUser(req, res) {
		try {
			const user = await this.userUseCase.findUser(req.params.cpf);
			defaultReturnStatement(res, "User Found", user);
		} catch (err) {
			console.error(err);
			res.status(400).json({ error: err.message });
		}
	}

	async updateUser(req, res) {
		try {
			const user = await this.userUseCase.updateUser(req.params.id, req.body);
			defaultReturnStatement(res, "User Updated", user);
		} catch (err) {
			console.error(err);
			res.status(400).json({ error: err.message });
		}
	}

	async deleteUser(req, res) {
		try {
			await this.userUseCase.deleteUser(req.params.id);
			defaultReturnStatement(res, "User Deleted", "Operation executed successfully.");
		} catch (err) {
			console.error(err);
			res.status(400).json({ error: err.message });
		}
	}
}
