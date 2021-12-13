import { Router } from "../deps.js";
import * as mainController from "./controllers/mainController.js";
import * as questionController from "./controllers/questionController.js";
import * as registrationController from "./controllers/regController.js";
import * as loginController from "./controllers/loginController.js";
import * as quizController from "./controllers/quizController.js";
import * as statController from "./controllers/statController.js";
import * as questionApi from "./apis/questionApi.js";


const router = new Router();

router.get("/", mainController.showMain);
router.get("/questions", questionController.listQuestions);
router.post("/questions", questionController.addQuestion);
router.post("/questions/:id/delete", questionController.deleteQuestion);
router.get("/questions/:id", questionController.getQuestionAndOptions);
router.post("/questions/:id/options", questionController.addOption);
router.post("/questions/:questionId/options/:optionId/delete", questionController.deleteOption);

router.get("/quiz", quizController.getRandomQuestion);
router.get("/quiz/:id", quizController.showQuestion);
router.post("/quiz/:id/options/:optionId", quizController.storeAnswer);
router.get("/quiz/:id/correct", quizController.correctAnswer);
router.get("/quiz/:id/incorrect", quizController.incorrectAnswer);

router.get("/api/questions/random", questionApi.getRandomQuestion);
router.post("/api/questions/answer", questionApi.checkAnswer);

router.get("/statistics",statController.getStats);

router.get("/auth/register", registrationController.showRegistrationForm);
router.post("/auth/register", registrationController.newUser);
router.get("/auth/login", loginController.showLoginPage);
router.post("/auth/login", loginController.loggingIn);

export { router };
