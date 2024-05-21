import { Faker } from '@faker-js/faker';
import { setSeederFactory } from 'typeorm-extension';
import {User} from "../../entities/user.entity";

export const UserFactory = setSeederFactory(User, (faker: Faker) => {
    const user = new User();
    user.username = faker.internet.userName();
    user.password = faker.internet.password();
    user.hashPassword();
    user.generateToken();
    return user;
});
