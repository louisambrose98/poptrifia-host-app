"use client";
import DataTable from "@/components/DataTable";
import ItemBadge from "@/components/ItemBadge";
import TableText from "@/components/TableText";
import {
  QUESTIONS_COLUMNS,
  QUESTIONS_DESCRIPTION,
  QUESTIONS_TITLE,
} from "@/constants/questions";
import { useRouter } from "next/navigation";

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
    ...QUESTIONS_COLUMNS.question,
    render: (row: Question) => <TableText title={row.question} />,
  },
  {
    ...QUESTIONS_COLUMNS.options,
    render: (row: Question) => (
      <TableText
        className="max-w-xs truncate text-muted-foreground"
        title={row.options.join(", ")}
      />
    ),
  },
  {
    ...QUESTIONS_COLUMNS.answer,
    render: (row: Question) => <TableText title={row.answer} />,
  },
  {
    ...QUESTIONS_COLUMNS.category,
    render: (row: Question) => (
      <ItemBadge type="category" value={row.category} />
    ),
  },
  {
    ...QUESTIONS_COLUMNS.difficulty,
    render: (row: Question) => (
      <ItemBadge type="difficulty" value={row.difficulty} />
    ),
  },
];
type Props = {
  data: Question[];
};

const QuestionTable = ({ data }: Props) => {
  const router = useRouter();
  return (
    <DataTable
      title={QUESTIONS_TITLE}
      description={QUESTIONS_DESCRIPTION}
      columns={columns}
      data={data}
      pageSize={10}
      total={data.length}
      getRowId={(row: Question) => row.id}
      onRowClick={(row: Question) => router.push(`/question/${row.id}`)}
    />
  );
};

export default QuestionTable;
