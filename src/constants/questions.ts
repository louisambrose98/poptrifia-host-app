export const CATEGORY_ENUM = [
  "ANIMALS",
  "ART",
  "BUSINESS",
  "CELEBRITIES",
  "COUNTRY",
  "CULTURES",
  "FOOD_AND_DRINKS",
  "FASHION",
  "GENERAL_KNOWLEDGE",
  "GEOGRAPHY",
  "HISTORY",
  "HOBBIES",
  "LANGUAGE",
  "LAW_AND_CRIMES",
  "LITERATURE",
  "MATHEMATICS",
  "MOVIES",
  "MUSIC",
  "MYTHOLOGY_RELIGION",
  "POLITICS",
  "POPTRIFIA",
  "SCIENCE",
  "SPACE_AND_ASTRONOMY",
  "SPORTS",
  "TECHNOLOGY",
  "TELEVISION",
  "TOYS_AND_GAMES",
  "TRANSPORTATION",
];
export const DIFFICULTY_ENUM = ["EASY", "MEDIUM", "HARD"];

const QUESTIONS_COLUMNS = {
  question: {
    label: "Question",
    accessor: "question",
  },
  options: {
    label: "Options",
    accessor: "options",
  },
  answer: {
    label: "Answer",
    accessor: "answer",
  },
  category: {
    label: "Category",
    accessor: "category",
  },
  difficulty: {
    label: "Difficulty",
    accessor: "difficulty",
  },
};

export const QUESTIONS_PANEL = {
  filterCategory: "Category",
  filterDifficulty: "Difficulty",
  filterReset: "Reset Filters",
  createButton: "Create New Question",
};

export const QUESTIONS_TABLE = {
  columns: QUESTIONS_COLUMNS,
  title: "Questions",
  description: "Manage and view all quiz questions in your database",
  pageSize: 10,
};
