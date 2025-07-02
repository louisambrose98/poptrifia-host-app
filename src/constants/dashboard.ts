export const DASHBOARD_TITLE = "Dashboard";
export const DASHBOARD_DESCRIPTION =
  "Overview of your activity, quizzes, and results.";

export const DASHBOARD_STATUS = {
  titleDetails: "Previous Details",
  titleQuiz: "Previous Quiz",
  titleStatus: "Quiz Status",
  titleScore: "Max Score",
  msgQuestions: "questions",
  msgPlayers: "player(s)",
  msgDuration: "Duration",
};

export const DASHBOARD_LEADERBOARD = {
  title: "Current Leaderboard",
  columns: {
    username: { label: "Username", accessor: "username" },
    country: { label: "Country", accessor: "country" },
    score: { label: "Score", accessor: "score" },
  },
  pageSize: 5,
};

export const DASHBOARD_PREV_RESULTS = {
  title: "Previous Results",
  columns: {
    username: { label: "Username", accessor: "username" },
    country: { label: "Country", accessor: "country" },
    score: { label: "Score", accessor: "score" },
    time: { label: "Time (s)", accessor: "time" },
  },
  pageSize: 5,
};

export const DASHBOARD_PREV_QUIZ = {
  title: "Previous Quiz",
};
