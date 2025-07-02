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
  { label: "Question", accessor: "question" },
  {
    label: "Options",
    accessor: "options",
    render: (row: Question) => row.options.join(", "),
  },
  { label: "Answer", accessor: "answer", className: "font-semibold" },
  { label: "Timer", accessor: "timer" },
  { label: "Score", accessor: "score" },
  { label: "Type", accessor: "type" },
  { label: "Category", accessor: "category" },
  { label: "Difficulty", accessor: "difficulty" },
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
    />
  );
};

export default QuestionTable;
