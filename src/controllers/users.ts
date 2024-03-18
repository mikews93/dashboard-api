import { users } from "db/models/users";
import { DefaultController } from "shared/utils/controllers";

export const usersController = new DefaultController("/users", users).server;
