import { executeQuery } from "../database/database.js";

const getRandomQuestion = async () => {
  const result = await executeQuery(
    `SELECT id FROM questions ORDER BY RANDOM() LIMIT 1`
  );
  return result.rows;
};

const getQuestion = async (id) => {
  const result = await executeQuery(
    `SELECT * FROM questions WHERE id = $1`,
    id,
  );
  return result.rows[0];
};

const getOptions = async (id) => {
  const result = await executeQuery(
    `SELECT * FROM question_answer_options WHERE question_id = $1`,
    id,
  );
  return result.rows;
};

const checkAnswer = async (question_id, option_id) => {
  const result = await executeQuery(`SELECT * FROM question_answer_options WHERE question_id = $1 AND id = $2 AND is_correct = true`,
    question_id,
    option_id,
  );
  return result.rows;
};

const correctAnswer = async (question_id) => {
  const result = await executeQuery(`SELECT * FROM question_answer_options WHERE question_id = $1 AND is_correct`,
    question_id,
  );
  console.log(result.rows);
  return result.rows[0];
};

const storeAnswer = async (user_id, question_id, qao_id, correct) => {
  await executeQuery(`INSERT INTO question_answers (user_id, question_id, question_answer_option_id, correct) VALUES ($1, $2, $3, $4)`,
    user_id,
    question_id,
    qao_id,
    correct,
  );
};
  

export { getRandomQuestion, getQuestion, getOptions, checkAnswer, correctAnswer, storeAnswer };
