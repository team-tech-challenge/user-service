import { IUserGateway } from "@gateways/IUserGateway";
import { User as UserModel } from "@database/UserModel";
import { User } from "@entities/User";
import { UserMapper } from "@mappers/UserMapper";

export class UserAdapter implements IUserGateway {
	async allUsers(): Promise<User[]> {
		const userModels = await UserModel.findAll();
        return userModels.map(model => UserMapper.toEntity(model));		
	}

	async getUserById(id: number): Promise<User> {
        const userModels = await UserModel.findOne({ where: { id } });
        return UserMapper.toEntity(userModels);
    }

	async findUser(cpf: string): Promise<User> {
        const userModels = await UserModel.findOne({
            where: { cpf }
        });
        if (!userModels) throw new Error('User not found');
        return UserMapper.toEntity(userModels);
    }

	async newUser(user: any): Promise<User> {
		const userModels = await UserModel.create(user);
        return UserMapper.toEntity(userModels);		
	}
	
	async updateUser(id: number, user: User): Promise<void> {

		
        const existingUser = await UserModel.findOne({ where: { id } });

        if (!existingUser) {
            throw new Error("User not found");
        }

        try {
            await UserModel.update(user, {
                where: { id }
            });
        } catch (error) {
            console.error(error);
			throw new Error("User not updated");
        }
    }

	async deleteUser(id: number): Promise<void> {
        try {
            UserModel.destroy({ where: { id } });            
        } catch (error) {
            console.error(error);
			throw new Error("User not delete");
        }
	}
}
