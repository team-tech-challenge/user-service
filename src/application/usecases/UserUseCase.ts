import { IUserGateway } from "@gateways/IUserGateway";
import { User } from "@entities/User";
import { isValidCpf } from "@utils/valid";
import { UserNotFoundError, InvalidCPFError } from "@utils/errors/userErrors";

export class UserUseCase {
	constructor(private readonly userGateway: IUserGateway) { }

	async getAll(): Promise<User[]> {
		return await this.userGateway.allUsers();
	}

	async createUser(user: User): Promise<User> {	
		if (user.getCpf() && ! isValidCpf(user.getCpf())) {
			throw new InvalidCPFError("Invalid CPF format");	
		}
		return await this.userGateway.newUser(user);
	}

	async getUserById(id: number): Promise<User | null> {
		const user = await this.userGateway.getUserById(id);
		return user ? user : null;
	}

	async findUser(cpf: string): Promise<User | null> {
		if(!isValidCpf(cpf)) throw new InvalidCPFError("Invalid CPF format");
		return await this.userGateway.findUser(cpf);
	}

	async updateUser(id: number, data: User): Promise<void> {
        const user = await this.getUserById(id);
        if (!user) throw new UserNotFoundError("User not found");
		
        await this.userGateway.updateUser(id, data);
    }

	async deleteUser(id: number): Promise<void> {
		await this.userGateway.deleteUser(id);
	}
}
