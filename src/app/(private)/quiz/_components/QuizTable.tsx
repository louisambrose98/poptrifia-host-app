"use client";
import DataTable from "@/components/DataTable";
import ItemBadge from "@/components/ItemBadge";
import TableText from "@/components/TableText";
import { ZERO } from "@/constants/general";
import {
  QUIZZES_TITLE,
  QUIZ_COLUMNS,
  QUIZ_DESCRIPTION,
  QUIZ_PAGE_SIZE,
} from "@/constants/quiz";
import { getDateOnly, getHourAndMinutes } from "@/lib/datetime";
import { getNumber, isValidString } from "@/lib/guards";

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
  return isValidString(winner) ? "Won" : "Lost";
};

const columns = [
  {
    ...QUIZ_COLUMNS.name,
    render: (row: Quiz) => <TableText title={row.name} />,
  },
  {
    ...QUIZ_COLUMNS.room,
    render: (row: Quiz) => <ItemBadge type="room" value={row.room} />,
  },
  {
    ...QUIZ_COLUMNS.winner,
    render: (row: Quiz) => (
      <ItemBadge type="winner" value={getWinner(row.winner)} />
    ),
  },
  {
    ...QUIZ_COLUMNS.players,
    render: (row: Quiz) => (
      <TableText title={getNumber(row.numPlayers, ZERO)} />
    ),
  },
  {
    ...QUIZ_COLUMNS.questions,
    render: (row: Quiz) => <TableText title={row.numQuestions} />,
  },
  {
    ...QUIZ_COLUMNS.quizDate,
    render: (row: Quiz) => <TableText title={getDateOnly(row.startDateTime)} />,
  },
  {
    ...QUIZ_COLUMNS.status,
    render: (row: Quiz) => <ItemBadge type="status" value={row.status} />,
  },
  {
    ...QUIZ_COLUMNS.startTime,
    render: (row: Quiz) => (
      <TableText title={getHourAndMinutes(row.startDateTime)} />
    ),
  },
  {
    ...QUIZ_COLUMNS.endTime,
    render: (row: Quiz) => (
      <TableText title={getHourAndMinutes(row.endDateTime)} />
    ),
  },
];

type Props = {
  data: Quiz[];
};

const QuizTable = ({ data }: Props) => {
  return (
    <DataTable
      title={QUIZZES_TITLE}
      description={QUIZ_DESCRIPTION}
      columns={columns}
      data={data}
      pageSize={QUIZ_PAGE_SIZE}
      total={data.length}
      getRowId={(row: Quiz) => row.id}
    />
  );
};

export default QuizTable;
