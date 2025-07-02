"use client";
import DataTable from "@/components/DataTable";

type Question = {
  id: string;
  position: number;
  question: string;
  picture: string | null;
  options: string[];
  answer: string;
  timer: number;
  score: number;
  coins: number;
  type: string;
  category: string;
  difficulty: string;
  lastUsed: string;
  modePosition: string;
  modeLastUsed: string;
  createdAt: string;
  updatedAt: string;
  __typename: string;
};

const columns = [
  {
    label: "Question",
    accessor: "question",
    render: (row: Question) => (
      <div className="max-w-xs truncate" title={row.question}>
        {row.question}
      </div>
    ),
  },
  {
    label: "Options",
    accessor: "options",
    render: (row: Question) => (
      <div
        className="max-w-xs truncate text-muted-foreground"
        title={row.options.join(", ")}
      >
        {row.options.join(", ")}
      </div>
    ),
  },
  {
    label: "Answer",
    accessor: "answer",
    render: (row: Question) => (
      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
        {row.answer}
      </span>
    ),
  },
  {
    label: "Timer",
    accessor: "timer",
    render: (row: Question) => (
      <span className="text-sm text-muted-foreground">{row.timer}s</span>
    ),
  },
  {
    label: "Score",
    accessor: "score",
    render: (row: Question) => (
      <span className="font-medium text-foreground">{row.score}</span>
    ),
  },
  {
    label: "Type",
    accessor: "type",
    render: (row: Question) => (
      <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-secondary/10 text-secondary-foreground border border-secondary/20">
        {row.type}
      </span>
    ),
  },
  {
    label: "Category",
    accessor: "category",
    render: (row: Question) => (
      <span className="text-sm text-muted-foreground">{row.category}</span>
    ),
  },
  {
    label: "Difficulty",
    accessor: "difficulty",
    render: (row: Question) => {
      const difficultyColors = {
        easy: "bg-green-100 text-green-800 border-green-200",
        medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
        hard: "bg-red-100 text-red-800 border-red-200",
      };
      const colorClass =
        difficultyColors[
          row.difficulty.toLowerCase() as keyof typeof difficultyColors
        ] || "bg-gray-100 text-gray-800 border-gray-200";

      return (
        <span
          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${colorClass}`}
        >
          {row.difficulty}
        </span>
      );
    },
  },
];

type Props = {
  data: Question[];
};

const QuestionTable = ({ data }: Props) => {
  return (
    <DataTable
      columns={columns}
      data={data}
      pageSize={10}
      total={data.length}
      getRowId={(row: Question) => row.id}
      title="Questions"
      description="Manage and view all quiz questions in your database"
    />
  );
};

export default QuestionTable;
