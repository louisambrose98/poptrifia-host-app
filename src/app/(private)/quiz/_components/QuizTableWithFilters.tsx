"use client";
import { DUMMY_QUIZZES } from "@/constants/dummy";
import { EMPTY } from "@/constants/general";
import { getString } from "@/lib/guards";
import { useMemo, useState } from "react";
import QuizPanel from "./QuizPanel";
import QuizTable from "./QuizTable";

const QuizTableWithFilters = () => {
  const [roomSearch, setRoomSearch] = useState(EMPTY);
  const [status, setStatus] = useState<string | null>(null);
  const [date, setDate] = useState<string | null>(null);

  const filteredData = useMemo(() => {
    return DUMMY_QUIZZES.filter(
      (q) =>
        (!roomSearch ||
          q.room.toLowerCase().includes(roomSearch.toLowerCase())) &&
        (!status || q.status === status) &&
        (!date || q.startDateTime === date)
    );
  }, [roomSearch, status, date]);

  return (
    <div className="p-6">
      <QuizPanel
        roomSearch={roomSearch}
        setRoomSearch={setRoomSearch}
        date={getString(date)}
        setDate={setDate}
        status={getString(status)}
        setStatus={setStatus}
      />

      <QuizTable data={filteredData} />
    </div>
  );
};

export default QuizTableWithFilters;
