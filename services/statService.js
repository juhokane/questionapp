import { executeQuery } from "../database/database.js";

const getCount = async (user_id) => {
  const result = await executeQuery(
    `SELECT COUNT(user_id) FROM question_answers WHERE user_id = $1`,
    user_id,
  );
  console.log(result.rows[0]);
  return result.rows[0];
};

const correctAnswers = async (user_id) => {
  const result = await executeQuery(
    `SELECT COUNT(correct) FROM question_answers WHERE user_id = $1 AND correct = true`,
    user_id,
  );
  console.log(result.rows[0]);
  return result.rows[0];
};

const ownQuestionAnswers = async (user_id) => {
  const result = await executeQuery(
    `SELECT COUNT(question_id) FROM question_answers WHERE user_id = $1`,
    user_id,
  );
  console.log(result.rows[0]);
  return result.rows[0];
};

const topUsers = async () => {
  const result = await executeQuery(
    `SELECT users.email, COUNT(question_answers.user_id) FROM users INNER JOIN question_answers ON users.id = question_answers.user_id GROUP BY users.email LIMIT 5`,
  );
  console.log(result.rows);
  return result.rows;
};


export { getCount, correctAnswers, ownQuestionAnswers, topUsers };

