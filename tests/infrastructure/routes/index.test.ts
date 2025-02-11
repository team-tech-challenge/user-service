import request from 'supertest';
import express from 'express';
import { apiRoutes } from '@routes/index'; // Adjust the path accordingly
import { UserController } from '@controllers/UserController';

// Create an Express app
const app = express();
app.use(express.json()); // For parsing application/json
app.use('/api', apiRoutes); // Using the apiRoutes under /api

jest.mock('@controllers/UserController');

const mockedUserController = UserController as jest.MockedClass<typeof UserController>;

describe('API Routes', () => {
	beforeEach(() => {
		// Clear all instances and calls to constructor and all methods
		mockedUserController.mockClear();
	});
	describe('User Routes', () => {
		it('GET /api/user/all - should return all users', async () => {
			const mockResponse = [{ id: 1, name: 'John Doe' }];
			mockedUserController.prototype.getAll.mockImplementation(async (req, res) => {
				res.status(200).json(mockResponse);
			});

			const response = await request(app).get('/api/user/all');
			expect(response.status).toBe(200);
			expect(response.body).toEqual(mockResponse);
		});

		it('POST /api/user/create - should create a new user', async () => {
			const newUser = { name: 'Jane Doe', cpf: '12345678901' };
			mockedUserController.prototype.createUser.mockImplementation(async (req, res) => {
				res.status(201).json({ id: 2, ...newUser });
			});

			const response = await request(app)
				.post('/api/user/create')
				.send(newUser)
				.set('Accept', 'application/json');
			expect(response.status).toBe(201);
			expect(response.body).toEqual({ id: 2, ...newUser });
		});
	});
});
