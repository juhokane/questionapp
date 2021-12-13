import { executeQuery } from "../database/database.js";

const addQuestion = async (user_id, title, question_text) => {
  await executeQuery(
    `INSERT INTO questions (user_id, title, question_text) VALUES ($1, $2, $3)`,
    user_id,
    title,
    question_text,
  );
};

const listQuestions = async (user_id) => {
  const result = await executeQuery(
    `SELECT * FROM questions WHERE user_id = $1`,
    user_id,
  );
  return result.rows;
};

const getQuestion = async (id, user_id) => {
  const result = await executeQuery(
    `SELECT * FROM questions WHERE id = $1 AND user_id = $2`,
    id,
    user_id,
  );
  return result.rows[0];
};

const deleteQuestion = async (user_id, id) => {
  await executeQuery(
    `DELETE FROM question_answers WHERE question_id = $1`,
    id,
  );
  await executeQuery(
    `DELETE FROM question_answer_options WHERE question_id = $1`,
    id,
  );
  await executeQuery(
    `DELETE FROM questions WHERE user_id = $1 AND id = $2`,
    user_id,
    id,
  );
};

const addOption = async (question_id, option_text, is_correct) => {
  await executeQuery(
    `INSERT INTO question_answer_options (question_id, option_text, is_correct) VALUES ($1, $2, $3)`,
    question_id,
    option_text,
    is_correct,
  );
};

const getOptions = async (question_id) => {
  const result = await executeQuery(
    `SELECT * FROM question_answer_options WHERE question_id = $1`,
    question_id,
  );
  return result.rows;
};

const deleteOption = async (optionId) => {
  await executeQuery(
    `DELETE FROM question_answers WHERE question_answer_option_id = $1`,
    optionId,
  );
  await executeQuery(
    `DELETE FROM question_answer_options WHERE id = $1`,
    optionId,
  );
};

export {
  addOption,
  addQuestion,
  deleteOption,
  deleteQuestion,
  getOptions,
  getQuestion,
  listQuestions,
};
