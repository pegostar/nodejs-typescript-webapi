import { User } from "../models/User";

export class UserService {
    public static GetAll(): User[] {
        const users: User[] = [];

        users.push(new User(1, "Davide", "Pegoraro"));
        users.push(new User(2, "Giulia", "Paoli"));

        return users;
    }

    public static FindById(id: number): User {
        let user: User = undefined;
        const users: User[] = UserService.GetAll();
        for (let i = 0; i < users.length; i++) {
            if (users[i].Id == id) {
                user = users[i];
                break;
            }
        }

        return user;
    }
}