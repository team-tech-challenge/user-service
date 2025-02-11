import { User } from "@entities/User"; // Adjust the path according to your structure
import { UserMapper } from "@mappers/UserMapper"; // Adjust the path accordingly

describe('UserMapper', () => {
    describe('toEntity', () => {
        it('should map UserModel to User entity correctly', () => {
            const userModel = {
                cpf: '12345678901',
                name: 'Jane Doe',
                username: 'jane.doe',
                password: 'securepassword',
                id: 1,
            };

            const userEntity = UserMapper.toEntity(userModel);

            expect(userEntity).toBeInstanceOf(User);
            expect(userEntity.getCpf()).toEqual(userModel.cpf);
            expect(userEntity.getName()).toEqual(userModel.name);
            expect(userEntity.getUsername()).toEqual(userModel.username);
            expect(userEntity.getPassword()).toEqual(userModel.password);
            expect(userEntity.getId()).toEqual(userModel.id);
        });
    });

    describe('toModel', () => {
        it('should map User entity to UserModel correctly', () => {
            const userEntity = new User('12345678901', 'Jane Doe', 'jane.doe', 'securepassword', 1);

            const userModel = UserMapper.toModel(userEntity);

            expect(userModel).toEqual({
                cpf: userEntity.getCpf(),
                name: userEntity.getName(),
                username: userEntity.getUsername(),
                password: userEntity.getPassword(),
                id: userEntity.getId(),
            });
        });
    });
});
