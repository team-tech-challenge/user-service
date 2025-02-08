import { User } from "@entities/User";

export interface IUserGateway {
	allUsers(): Promise<User[]>;

	getUserById(id: number): Promise<User>;
	
	newUser(user: User): Promise<User>;

	findUser(id: string): Promise<User>;

	updateUser(id: number, user: User): Promise<void>;
	
	deleteUser(id: number): Promise<void>;
}
