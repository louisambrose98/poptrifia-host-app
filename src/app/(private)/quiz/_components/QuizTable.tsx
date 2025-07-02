"use client";
import DataTable from "@/components/DataTable";
import ItemBadge from "@/components/ItemBadge";
import TableText from "@/components/TableText";
import { ZERO } from "@/constants/general";
import { QUIZ_TABLE } from "@/constants/quiz";
import { getDateOnly, getHourAndMinutes } from "@/lib/datetime";
import { getNumber, isValidString } from "@/lib/guards";
import { useRouter } from "next/navigation";

type Quiz = {
  id: string;
  name: string;
  room: string;
  winner: string | null;
  numPlayers: number | null;
  numQuestions: number;
  animation: number;
  duration: number;
  status: string;
  startDateTime: string;
  endDateTime: string;
};

const getWinner = (winner: string | null) => {
  return isValidString(winner) ? QUIZ_TABLE.winnerWon : QUIZ_TABLE.winnerLost;
};

const columns = [
  {
    ...QUIZ_TABLE.columns.name,
    render: (row: Quiz) => <TableText title={row.name} />,
  },
  {
    ...QUIZ_TABLE.columns.room,
    render: (row: Quiz) => <ItemBadge type="room" value={row.room} />,
  },
  {
    ...QUIZ_TABLE.columns.winner,
    render: (row: Quiz) => (
      <ItemBadge type="winner" value={getWinner(row.winner)} />
    ),
  },
  {
    ...QUIZ_TABLE.columns.players,
    render: (row: Quiz) => (
      <TableText title={getNumber(row.numPlayers, ZERO)} />
    ),
  },
  {
    ...QUIZ_TABLE.columns.questions,
    render: (row: Quiz) => <TableText title={row.numQuestions} />,
  },
  {
    ...QUIZ_TABLE.columns.quizDate,
    render: (row: Quiz) => <TableText title={getDateOnly(row.startDateTime)} />,
  },
  {
    ...QUIZ_TABLE.columns.status,
    render: (row: Quiz) => <ItemBadge type="status" value={row.status} />,
  },
  {
    ...QUIZ_TABLE.columns.startTime,
    render: (row: Quiz) => (
      <TableText title={getHourAndMinutes(row.startDateTime)} />
    ),
  },
  {
    ...QUIZ_TABLE.columns.endTime,
    render: (row: Quiz) => (
      <TableText title={getHourAndMinutes(row.endDateTime)} />
    ),
  },
];

type Props = {
  data: Quiz[];
};

const QuizTable = ({ data }: Props) => {
  const router = useRouter();
  return (
    <DataTable
      title={QUIZ_TABLE.title}
      description={QUIZ_TABLE.description}
      columns={columns}
      data={data}
      pageSize={QUIZ_TABLE.pageSize}
      total={data.length}
      getRowId={(row: Quiz) => row.id}
      onRowClick={(row: Quiz) => router.push(`/quiz/${row.id}`)}
    />
  );
};

export default QuizTable;
