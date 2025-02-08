import { User } from "@entities/User";

export class UserMapper {
	// Mapeia de UserModel (banco) para User (domínio)
	static toEntity(UserModel: any): User {
		return new User(
			UserModel.cpf,
			UserModel.name,
			UserModel.username,
			UserModel.password,
			UserModel.id
		);
	}
	// Mapeia de User (domínio) para UserModel (banco)
	static toModel(User: User): any {
		return {
			cpf: User.getCpf(),
			name: User.getName(),
			username: User.getUsername(),
			password: User.getPassword(),
			id: User.getId(),
		};
	}
}
