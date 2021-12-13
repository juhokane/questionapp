import * as userService from "../../services/userService.js";
import { bcrypt } from "../../deps.js";

const loggingIn = async ({ request, response, state }) => {
  const body = request.body({ type: "form" });
  const params = await body.value;

  const findUser = await userService.findUser(
    params.get("email"),
  );
  if (findUser.length < 1) {
    response.redirect("/auth/login");
    return;
  }

  const user = findUser[0];
  const verifyPassword = await bcrypt.compare(params.get("password"), user.password);

  if (!verifyPassword) {
    response.redirect("/auth/login");
    return;
  }

  await state.session.set("user", user);
  response.redirect("/questions");
};

const showLoginPage = ({ render }) => {
  render("login.eta");
};

export { showLoginPage, loggingIn };
