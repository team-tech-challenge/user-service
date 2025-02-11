import connection from "@config/connectionFactory";
import { User } from "@database/UserModel";

export default () => {
	connection.database.addModels([		
		User
	]);
};
