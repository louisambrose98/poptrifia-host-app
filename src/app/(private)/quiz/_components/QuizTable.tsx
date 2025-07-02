"use client";
import DataTable from "@/components/DataTable";

type Quiz = {
  id: string;
  name: string;
  room: string;
  winner: string;
  players: number;
  questions: number;
  animation: number;
  duration: number;
  quizDate: string; // YYYY-MM-DD
  status: string;
  startTime: string;
  endTime: string;
};

const columns = [
  { label: "Name", accessor: "name" },
  { label: "Room", accessor: "room" },
  { label: "Winner", accessor: "winner" },
  { label: "Players", accessor: "players" },
  { label: "Questions", accessor: "questions" },
  { label: "Animation", accessor: "animation" },
  { label: "Duration", accessor: "duration" },
  { label: "Quiz Date", accessor: "quizDate" },
  { label: "Quiz status", accessor: "status" },
  { label: "Start Time", accessor: "startTime" },
  { label: "End Time", accessor: "endTime" },
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
