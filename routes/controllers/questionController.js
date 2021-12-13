import * as questionService from "../../services/questionService.js";
import { validasaur } from "../../deps.js";

const questionValidationRules = {
  title: [validasaur.required, validasaur.minLength(1)],
  question_text: [validasaur.required, validasaur.minLength(1)],
};

const optionValidationRules = {
  option_text: [validasaur.required, validasaur.minLength(1)],
};

const getQuestion = async (request) => {
  const body = request.body({ type: "form" });
  const params = await body.value;

  return {
    title: params.get("title"),
    question_text: params.get("question_text"),
  };
};

const getOption = async (request) => {
  const body = request.body({ type: "form" });
  const params = await body.value;

  return {
    option_text: params.get("option_text"),
    is_correct: params.get("is_correct"),
  };
};

const addQuestion = async ({ request, response, user, render }) => {
  const questionInput = await getQuestion(request);

  const [passes, errors] = await validasaur.validate(
    questionInput,
    questionValidationRules,
  );

  if (!passes) {
    console.log(errors);
    questionInput.validationErrors = errors;
    render("questions.eta", {
      questions: await questionService.listQuestions(user.id),
      questionInput,
  });
  } else {
    await questionService.addQuestion(
      user.id,
      questionInput.title,
      questionInput.question_text,
    );
    response.redirect("/questions");
  }
};

const listQuestions = async ({ render, user }) => {
  render("questions.eta", {
    questions: await questionService.listQuestions(user.id),
  });
};

const getQuestionAndOptions = async ({ render, user, params }) => {
  render("questiondetails.eta", {
    question: await questionService.getQuestion(params.id, user.id),
    options: await questionService.getOptions(params.id),
  });
};

const deleteQuestion = async ({ response, params, user }) => {
  await questionService.deleteQuestion(user.id, params.id);
  response.redirect("/questions");
};


const addOption = async ({ request, response, params, render, user }) => {
  const optionData = await getOption(request);
  const [passes, errors] = await validasaur.validate(
    optionData,
    optionValidationRules,
  );

  console.log(optionData.option_text);

  if (!passes) {
    console.log(errors);
    optionData.errors = errors;
    render("questiondetails.eta", {
      question: await questionService.getQuestion(params.id, user.id),
      options: await questionService.getOptions(params.id),
      optionData,
  });
  } else {
    await questionService.addOption(
      params.id,
      optionData.option_text,
      optionData.is_correct,
    );

    response.redirect(`/questions/${params.id}`);
  }
};

const deleteOption = async ({ response, params }) => {
  await questionService.deleteOption(params.optionId);
  response.redirect(`/questions/${params.questionId}`);
};

export {
  addOption,
  addQuestion,
  deleteOption,
  deleteQuestion,
  getQuestionAndOptions,
  listQuestions,
};
