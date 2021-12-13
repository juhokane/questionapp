import * as userService from "../services/userService.js";

const userMiddleware = async (context, next) => {
  const user = await context.state.session.get("user");

  if (user) {
    const getUser = await userService.findUser(user.email);
    context.user = getUser[0];
  }

  await next();
};

export { userMiddleware };
