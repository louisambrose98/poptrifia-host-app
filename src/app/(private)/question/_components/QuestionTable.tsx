"use client";
import DataTable from "@/components/DataTable";
import ItemBadge from "@/components/ItemBadge";
import TableText from "@/components/TableText";

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
    render: (row: Question) => <TableText title={row.question} />,
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
    render: (row: Question) => <TableText title={row.answer} />,
  },
  {
    label: "Category",
    accessor: "category",
    render: (row: Question) => (
      <ItemBadge type="category" value={row.category} />
    ),
  },
  {
    label: "Difficulty",
    accessor: "difficulty",
    render: (row: Question) => (
      <ItemBadge type="difficulty" value={row.difficulty} />
    ),
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
