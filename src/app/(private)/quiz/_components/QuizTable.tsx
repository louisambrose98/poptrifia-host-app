"use client";
import DataTable from "@/components/DataTable";
import ItemBadge from "@/components/ItemBadge";
import TableText from "@/components/TableText";
import { ZERO } from "@/constants/general";
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
    label: "Name",
    accessor: "name",
    render: (row: Quiz) => <TableText title={row.name} />,
  },
  {
    label: "Room",
    accessor: "room",
    render: (row: Quiz) => <ItemBadge type="room" value={row.room} />,
  },
  {
    label: "Winner",
    accessor: "winner",
    render: (row: Quiz) => (
      <ItemBadge type="winner" value={getWinner(row.winner)} />
    ),
  },
  {
    label: "Players",
    accessor: "numPlayers",
    render: (row: Quiz) => (
      <TableText title={getNumber(row.numPlayers, ZERO)} />
    ),
  },
  {
    label: "Questions",
    accessor: "numQuestions",
    render: (row: Quiz) => <TableText title={row.numQuestions} />,
  },
  {
    label: "Quiz Date",
    accessor: "quizDate",
    render: (row: Quiz) => <TableText title={getDateOnly(row.startDateTime)} />,
  },
  {
    label: "Quiz status",
    accessor: "status",
    render: (row: Quiz) => <ItemBadge type="status" value={row.status} />,
  },
  {
    label: "Start Time",
    accessor: "startDateTime",
    render: (row: Quiz) => (
      <TableText title={getHourAndMinutes(row.startDateTime)} />
    ),
  },
  {
    label: "End Time",
    accessor: "endDateTime",
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
      columns={columns}
      data={data}
      pageSize={10}
      total={data.length}
      getRowId={(row: Quiz) => row.id}
    />
  );
};

export default QuizTable;
