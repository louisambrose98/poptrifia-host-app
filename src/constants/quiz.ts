export const QUIZ_PAGE_SIZE = 10;
export const QUIZ_TITLE = "Quiz";
export const QUIZZES_TITLE = "Quizzes";
export const QUIZ_DESCRIPTION = "Manage and view all quizzes in your database.";
export const QUIZ_STATUS_ENUM = ["NEW", "NEXT", "HOLD", "DONE"];

export const QUIZ_COLUMNS = {
  name: {
    label: "Name",
    accessor: "name",
  },
  room: {
    label: "Room",
    accessor: "room",
  },
  winner: {
    label: "Winner",
    accessor: "winner",
  },
  players: {
    label: "Players",
    accessor: "numPlayers",
  },
  questions: {
    label: "Questions",
    accessor: "numQuestions",
  },
  quizDate: {
    label: "Quiz Date",
    accessor: "quizDate",
  },
  status: {
    label: "Quiz status",
    accessor: "status",
  },
  startTime: {
    label: "Start Time",
    accessor: "startDateTime",
  },
  endTime: {
    label: "End Time",
    accessor: "endDateTime",
  },
};
