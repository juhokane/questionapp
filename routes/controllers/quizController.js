import * as quizService from "../../services/quizService.js";

const getRandomQuestion = async ({ request, response }) => {
  const randomQuestion = await quizService.getRandomQuestion();
  let number = randomQuestion.map(({ id }) => id);
  response.redirect(`/quiz/${number}`);
};

const showQuestion = async ({ render, request, params }) => {
  const question = await quizService.getQuestion(params.id);
  const options = await quizService.getOptions(params.id);
  render("quiz.eta", {question, options});
};

const storeAnswer = async ({ response, request, params, user }) => {
  const check = await quizService.checkAnswer(params.id, params.optionId);
  var correct = false;
  if (check.length === 1) {
    correct = true;
  };
  await quizService.storeAnswer(user.id, params.id, params.optionId, correct);
  
  if (correct === true) {
    response.redirect(`/quiz/${params.id}/correct`);
  } else {
    response.redirect(`/quiz/${params.id}/incorrect`);
  };
};

const correctAnswer = async ({ render, request }) => {
  await render("correct.eta");
};

const incorrectAnswer = async ({ render, request, params }) => {
  const answer = await quizService.correctAnswer(params.id);
  console.log(answer);
  render("incorrect.eta", answer);
};

export { getRandomQuestion, showQuestion, storeAnswer, correctAnswer, incorrectAnswer };
