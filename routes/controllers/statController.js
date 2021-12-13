import * as statService from "../../services/statService.js";

const getStats = async ({ request, user, render }) => {
  const count = await statService.getCount(user.id);
  const correctAnswers = await statService.correctAnswers(user.id);
  const ownQuestionAnswers = await statService.ownQuestionAnswers(user.id);
  const topUsers = await statService.topUsers();
  
  render("stats.eta", {count, correctAnswers, ownQuestionAnswers, topUsers});
};

export { getStats };
