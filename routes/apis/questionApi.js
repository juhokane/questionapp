import * as quizService from "../../services/quizService.js";

const getRandomQuestion = async ({ response }) => {
  const randomQuestion = await quizService.getRandomQuestion();
  const id = randomQuestion.map(({ id }) => id)[0];
  console.log(id);

  const question = await quizService.getQuestion(id);
  const questionId = question.id;
  const questionTitle = question.title;
  const questionText = question.question_text;
  const answerOptions = await quizService.getOptions(id);

  for (let i = 0; i < answerOptions.length; i++) {
    delete answerOptions[i].question_id;
    delete answerOptions[i].is_correct;
  }

  response.body = { questionId, questionTitle, questionText, answerOptions };
};

const checkAnswer = async ({ response, request }) => {
  const body = request.body({ type: "json" });
  const document = await body.value;
  const result = await quizService.checkAnswer(
    document.questionId,
    document.id,
  );
  var correct = false;
  if (result.length === 1) {
    correct = true;
  }
  response.body = { correct };
};

export { checkAnswer, getRandomQuestion };
