import { UserController } from '@controllers/UserController';
import { UserUseCase } from '@usecases/UserUseCase';
import { User } from '@entities/User';
import { defaultReturnStatement } from '@utils/http';

jest.mock('@usecases/UserUseCase');
jest.mock('@utils/http');

describe('UserController', () => {
	let userController: UserController;
	let userUseCaseMock: jest.Mocked<UserUseCase>;

	beforeEach(() => {
		// Criando a instância mockada de UserUseCase
		userUseCaseMock = new UserUseCase(null) as jest.Mocked<UserUseCase>;
		// Instanciando o controlador com a dependência mockada
		userController = new UserController(userUseCaseMock);
	});

	describe('getAll', () => {
		it('deve retornar todos os funcionários com sucesso', async () => {
			const mockUsers = [
				new User('78542341082', 'John Doe', 'johndoe', 'password123'),
			];
			// Mock da função getAll retornando os funcionários
			userUseCaseMock.getAll.mockResolvedValue(mockUsers);

			const req = {};  // Request mockado
			const res = {  // Response mockado
				status: jest.fn().mockReturnThis(),
				json: jest.fn(),
			};

			// Chamando o método do controller
			await userController.getAll(req, res);

			// Verificando se a resposta foi enviada corretamente
			expect(defaultReturnStatement).toHaveBeenCalledWith(res, "Users", mockUsers);
		});

		it('deve retornar erro ao buscar todos os funcionários', async () => {
			const error = new Error('Database error');
			userUseCaseMock.getAll.mockRejectedValue(error);

			const req = {};
			const res = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn(),
			};

			await userController.getAll(req, res);

			expect(res.status).toHaveBeenCalledWith(400);
			expect(res.json).toHaveBeenCalledWith({ error: error.message });
		});
	});

	describe('createUser', () => {
		it('deve criar um novo funcionário com sucesso', async () => {
			const newUser = new User('78542341082', 'John Doe', 'johndoe', 'password123');
			userUseCaseMock.createUser.mockResolvedValue(newUser);

			const req = {
				body: { cpf: '78542341082', name: 'John Doe', username: 'johndoe', password: 'password123' },
			};
			const res = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn(),
			};

			await userController.createUser(req, res);

			expect(defaultReturnStatement).toHaveBeenCalledWith(res, "User Created", newUser);
		});

		it('deve retornar erro ao criar um novo funcionário', async () => {
			const error = new Error('Invalid data');
			userUseCaseMock.createUser.mockRejectedValue(error);

			const req = {
				body: { cpf: '78542341082', name: 'John Doe', username: 'johndoe', password: 'password123' },
			};
			const res = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn(),
			};

			await userController.createUser(req, res);

			expect(res.status).toHaveBeenCalledWith(400);
			expect(res.json).toHaveBeenCalledWith({ error: error.message });
		});
	});

	describe('findUser', () => {
		it('deve retornar um funcionário pelo CPF', async () => {
			const userData = new User('78542341082', 'John Doe', 'johndoe', 'password123');
			userUseCaseMock.findUser.mockResolvedValue(userData);

			const req = { params: { cpf: '78542341082' } };
			const res = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn(),
			};

			await userController.findUser(req, res);

			expect(defaultReturnStatement).toHaveBeenCalledWith(res, "User Found", userData);
		});

		it('deve retornar erro ao buscar funcionário por CPF', async () => {
			const error = new Error('User not found');
			userUseCaseMock.findUser.mockRejectedValue(error);

			const req = { params: { cpf: '78542341082' } };
			const res = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn(),
			};

			await userController.findUser(req, res);

			expect(res.status).toHaveBeenCalledWith(400);
			expect(res.json).toHaveBeenCalledWith({ error: error.message });
		});
	});

	describe('deleteUser', () => {
		it('deve deletar o funcionário com sucesso', async () => {
			userUseCaseMock.deleteUser.mockResolvedValue();

			const req = { params: { id: '1' } };
			const res = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn(),
			};

			await userController.deleteUser(req, res);

			expect(defaultReturnStatement).toHaveBeenCalledWith(res, "User Deleted", "Operation executed successfully.");
		});

		it('deve retornar erro ao tentar excluir o funcionário', async () => {
			const error = new Error('User not found');
			userUseCaseMock.deleteUser.mockRejectedValue(error);

			const req = { params: { id: '999' } };
			const res = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn(),
			};

			await userController.deleteUser(req, res);

			expect(res.status).toHaveBeenCalledWith(400);
			expect(res.json).toHaveBeenCalledWith({ error: error.message });
		});
	});
});
