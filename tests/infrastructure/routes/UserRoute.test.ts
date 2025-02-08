import request from 'supertest';
import express from 'express';
import { userRoute } from '@routes/UserRoute'; // Adjust the path accordingly
import { UserController } from '@controllers/UserController';

// Create an Express app
const app = express();
app.use(express.json()); // For parsing application/json
app.use('/users', userRoute);

// Mock the UserController methods
jest.mock('@controllers/UserController');

const mockedController = UserController as jest.MockedClass<typeof UserController>;

describe('User Routes', () => {
	beforeEach(() => {
		// Clear all instances and calls to constructor and all methods
		mockedController.mockClear();
	});

	it('GET /users/all - should return all users', async () => {
		const mockResponse = [{ id: 1, name: 'John Doe' }];
		mockedController.prototype.getAll.mockImplementation(async (req, res) => {
			res.status(200).json(mockResponse);
		});

		const response = await request(app).get('/users/all');
		expect(response.status).toBe(200);
		expect(response.body).toEqual(mockResponse);
	});

	it('POST /users/create - should create a new user', async () => {
		const newUser = { name: 'Jane Doe', cpf: '12345678901' };
		mockedController.prototype.createUser.mockImplementation(async (req, res) => {
			res.status(201).json({ id: 2, ...newUser });
		});

		const response = await request(app)
			.post('/users/create')
			.send(newUser)
			.set('Accept', 'application/json');
		expect(response.status).toBe(201);
		expect(response.body).toEqual({ id: 2, ...newUser });
	});

	it('GET /users/search/:cpf - should search for an user by CPF', async () => {
		const mockUser = { id: 1, name: 'John Doe', cpf: '12345678901' };
		mockedController.prototype.findUser.mockImplementation(async (req, res) => {
			res.status(200).json(mockUser);
		});

		const response = await request(app).get('/users/search/12345678901');
		expect(response.status).toBe(200);
		expect(response.body).toEqual(mockUser);
	});

	it('PUT /users/update/:id - should update an user by ID', async () => {
		const updatedUser = { name: 'John Smith', cpf: '12345678901' };
		mockedController.prototype.updateUser.mockImplementation(async (req, res) => {
			res.status(200).json({ id: req.params.id, ...updatedUser });
		});

		const response = await request(app)
			.put('/users/update/1')
			.send(updatedUser)
			.set('Accept', 'application/json');
		expect(response.status).toBe(200);
		expect(response.body).toEqual({ id: '1', ...updatedUser });
	});

	it('DELETE /users/delete/:id - should delete an user by ID', async () => {
		mockedController.prototype.deleteUser.mockImplementation(async (req, res) => {
			res.status(204).send();
		});

		const response = await request(app).delete('/users/delete/1');
		expect(response.status).toBe(204);
	});
});
