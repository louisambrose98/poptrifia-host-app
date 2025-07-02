export const QUIZ_STATUS_ENUM = ["NEW", "NEXT", "HOLD", "DONE"];

export const QUIZ_PANEL = {
  searchPlaceholder: "Search Room...",
  filterStatus: "Status",
  filterReset: "Reset Filters",
  createButton: "Create New Quiz",
};

const QUIZ_COLUMNS = {
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

export const QUIZ_TABLE = {
  columns: QUIZ_COLUMNS,
  title: "Quizzes",
  description: "Manage and view all quizzes in your database.",
  pageSize: 10,
  winnerWon: "Won",
  winnerLost: "Lost",
};
