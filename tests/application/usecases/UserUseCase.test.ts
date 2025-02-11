import { UserUseCase } from "@usecases/UserUseCase";
import { IUserGateway } from "@gateways/IUserGateway";
import { User } from "@entities/User";
import { UserNotFoundError, InvalidCPFError } from "@utils/errors/userErrors";
import { isValidCpf } from "@utils/valid";

jest.mock("@utils/valid");

jest.mock("@entities/User", () => {
	return {
		User: jest.fn().mockImplementation((id, name, cpf, position) => {
			return {
				getId: jest.fn(() => id),
				getName: jest.fn(() => name),
				getCpf: jest.fn(() => cpf),
				getPosition: jest.fn(() => position),
				setCpf: jest.fn(),
			};
		}),
	};
});

describe("UserUseCase", () => {
	let userGateway: jest.Mocked<IUserGateway>;
	let userUseCase: UserUseCase;
	let mockUser: User;

	beforeEach(() => {
		userGateway = {
			allUsers: jest.fn(),
			newUser: jest.fn(),
			getUserById: jest.fn(),
			findUser: jest.fn(),
			updateUser: jest.fn(),
			deleteUser: jest.fn(),
		};
		userUseCase = new UserUseCase(userGateway);
		(isValidCpf as jest.Mock).mockReturnValue(true); // Garante que CPF sempre seja considerado válido.
		mockUser = new User("78542341082", "Jane Doe", "12345678901", "Developer"); // Usando o mock.
	});

	describe("getAll", () => {
		it("should return all users", async () => {
			userGateway.allUsers.mockResolvedValue([mockUser]);
			const users = await userUseCase.getAll();
			expect(users).toEqual([mockUser]);
			expect(userGateway.allUsers).toHaveBeenCalled();
		});
	});

	describe("createUser", () => {
		it("should create an user with valid CPF", async () => {
			userGateway.newUser.mockResolvedValue(mockUser);
			const user = await userUseCase.createUser(mockUser);
			expect(user).toEqual(mockUser);
			expect(userGateway.newUser).toHaveBeenCalledWith(mockUser);
		});

		it("should throw an error if CPF is invalid", async () => {
			(isValidCpf as jest.Mock).mockReturnValue(false);
			await expect(userUseCase.createUser(mockUser)).rejects.toThrow(InvalidCPFError);
			expect(userGateway.newUser).not.toHaveBeenCalled();
		});
	});

	describe("getUserById", () => {
		it("should return an user by ID", async () => {
			userGateway.getUserById.mockResolvedValue(mockUser);
			const user = await userUseCase.getUserById(1);
			expect(user).toEqual(mockUser);
			expect(userGateway.getUserById).toHaveBeenCalledWith(1);
		});

		it("should return null if user is not found", async () => {
			userGateway.getUserById.mockResolvedValue(null);
			const user = await userUseCase.getUserById(1);
			expect(user).toBeNull();
			expect(userGateway.getUserById).toHaveBeenCalledWith(1);
		});
	});

	describe("findUser", () => {
		it("should return an user by CPF", async () => {
			userGateway.findUser.mockResolvedValue(mockUser);
			const user = await userUseCase.findUser("12345678901");
			expect(user).toEqual(mockUser);
			expect(userGateway.findUser).toHaveBeenCalledWith("12345678901");
		});

		it("should throw an error if CPF is invalid", async () => {
			(isValidCpf as jest.Mock).mockReturnValue(false);
			await expect(userUseCase.findUser("12345678901")).rejects.toThrow(InvalidCPFError);
			expect(userGateway.findUser).not.toHaveBeenCalled();
		});
	});

	describe("updateUser", () => {
		it("should update an user with valid data", async () => {
			userGateway.getUserById.mockResolvedValue(mockUser);
			await userUseCase.updateUser(1, mockUser);
			expect(userGateway.updateUser).toHaveBeenCalledWith(1, mockUser);
		});

		it("should throw an error if user is not found", async () => {
			userGateway.getUserById.mockResolvedValue(null);
			await expect(userUseCase.updateUser(1, mockUser)).rejects.toThrow(UserNotFoundError);
			expect(userGateway.updateUser).not.toHaveBeenCalled();
		});
	});

	describe("deleteUser", () => {
		it("should delete an user", async () => {
			await userUseCase.deleteUser(1);
			expect(userGateway.deleteUser).toHaveBeenCalledWith(1);
		});
	});
});
