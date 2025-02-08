import { User } from '@entities/User'; // Caminho para o seu arquivo

describe('User', () => {
	describe('getId', () => {
		it('deve retornar o id se existir', () => {
			const user = new User('78542341082', 'John Doe', 'user', 'password123', 1);

			expect(user.getId()).toBe(1);
		});

		it('deve retornar undefined se o id não existir', () => {
			const user = new User('78542341082', 'John Doe', 'user', 'password123');

			expect(user.getId()).toBeUndefined();
		});
	});

	describe('getCpf', () => {
		it('deve retornar o CPF corretamente', () => {
			const user = new User('78542341082', 'John Doe', 'user', 'password123');

			expect(user.getCpf()).toBe('78542341082');
		});
	});

	describe('getName', () => {
		it('deve retornar o nome corretamente', () => {
			const user = new User('78542341082', 'John Doe', 'user', 'password123');

			expect(user.getName()).toBe('John Doe');
		});
	});

	describe('getUsername', () => {
		it('deve retornar o username corretamente', () => {
			const user = new User('78542341082', 'John Doe', 'user', 'password123');

			expect(user.getUsername()).toBe('user');
		});
	});

	describe('getPassword', () => {
		it('deve retornar a senha corretamente', () => {
			const user = new User('78542341082', 'John Doe', 'user', 'password123');

			expect(user.getPassword()).toBe('password123');
		});
	});
});
