import { executeQuery } from "../database/database.js";

const addUser = async (email, password) => {
  await executeQuery(
    `INSERT INTO users (email, password) VALUES ($1, $2, $3, $4)`,
    email,
    password,
  );
};

const findUser = async (email) => {
  const result = await executeQuery(`SELECT * FROM users WHERE email = $1`, email);
  
  return result.rows;
};
  
export { addUser, findUser };