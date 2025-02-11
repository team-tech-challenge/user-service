import { UserError, InvalidCPFError, UserNotFoundError } from '@utils/errors/userErrors'; // Ajuste o caminho conforme necessário

describe('Testes das classes de erro', () => {

	// Testes para UserError
	describe('UserError', () => {
		it('deve criar um erro com a mensagem e o nome corretos', () => {
			const errorMessage = 'Ocorreu um erro no empregado';
			const error = new UserError(errorMessage);

			expect(error.message).toBe(errorMessage);
			expect(error.name).toBe('UserError');
		});
	});

	// Testes para InvalidCPFError
	describe('InvalidCPFError', () => {
		it('deve herdar de UserError e ter o nome correto', () => {
			const errorMessage = 'CPF inválido';
			const error = new InvalidCPFError(errorMessage);

			expect(error.message).toBe(errorMessage);
			expect(error.name).toBe('InvalidCPFError');
			expect(error instanceof UserError).toBe(true);  // Verifica se herda de UserError
		});
	});

	// Testes para UserNotFoundError
	describe('UserNotFoundError', () => {
		it('deve herdar de UserError e ter o nome correto', () => {
			const errorMessage = 'Empregado não encontrado';
			const error = new UserNotFoundError(errorMessage);

			expect(error.message).toBe(errorMessage);
			expect(error.name).toBe('UserNotFoundError');
			expect(error instanceof UserError).toBe(true);  // Verifica se herda de UserError
		});
	});

});
