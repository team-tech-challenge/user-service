import { Table, Column, DataType, Model } from "sequelize-typescript";

@Table({
	timestamps: true,
	tableName: "user",
	modelName: "User",
})
export class User extends Model {
	@Column({
		type: DataType.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	})
	declare id: number;

	@Column({
		type: DataType.STRING,
		allowNull: false,
		unique: true,
	})
	cpf: string;

	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	name: string;

	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	username: string;

	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	password: string;
}
