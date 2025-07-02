"use client";
import DataTable from "@/components/DataTable";
import ItemBadge from "@/components/ItemBadge";
import TableText from "@/components/TableText";
import { COMMA, SPACE } from "@/constants/general";
import { QUESTIONS_TABLE } from "@/constants/questions";
import { str } from "@/lib/guards";
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
    ...QUESTIONS_TABLE.columns.question,
    render: (row: Question) => <TableText title={row.question} />,
  },
  {
    ...QUESTIONS_TABLE.columns.options,
    render: (row: Question) => (
      <TableText
        className="max-w-xs truncate text-muted-foreground"
        title={row.options.join(str(COMMA, SPACE))}
      />
    ),
  },
  {
    ...QUESTIONS_TABLE.columns.answer,
    render: (row: Question) => <TableText title={row.answer} />,
  },
  {
    ...QUESTIONS_TABLE.columns.category,
    render: (row: Question) => (
      <ItemBadge type="category" value={row.category} />
    ),
  },
  {
    ...QUESTIONS_TABLE.columns.difficulty,
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
      title={QUESTIONS_TABLE.title}
      description={QUESTIONS_TABLE.description}
      columns={columns}
      data={data}
      pageSize={QUESTIONS_TABLE.pageSize}
      total={data.length}
      getRowId={(row: Question) => row.id}
      onRowClick={(row: Question) => router.push(`/question/${row.id}`)}
    />
  );
};

export default QuestionTable;
