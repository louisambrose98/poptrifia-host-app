"use client";
import DateInput from "@/components/DateInput";
import FilterDropdown from "@/components/FilterDropdown";
import SearchInput from "@/components/SearchInput";
import { Button } from "@/components/ui/button";
import { EMPTY } from "@/constants/general";
import { QUIZ_STATUS_ENUM } from "@/constants/quiz";
import { getString } from "@/lib/guards";
import { useRouter } from "next/navigation";

type Props = {
  roomSearch: string;
  setRoomSearch: (value: string) => void;
  date: string;
  setDate: (value: string | null) => void;
  status: string;
  setStatus: (value: string | null) => void;
};

const QuizPanel = ({
  roomSearch,
  setRoomSearch,
  date,
  setDate,
  status,
  setStatus,
}: Props) => {
  const router = useRouter();
  return (
    <div className="flex flex-wrap gap-4 mb-6 items-center w-full justify-between">
      <div className="flex gap-4 items-center">
        <span className="font-semibold text-lg mr-4">Quizzes</span>
        <SearchInput
          value={roomSearch}
          onChange={(e) => setRoomSearch(e.target.value)}
          className="w-48"
        />
        <DateInput
          value={getString(date)}
          onChange={(e) => setDate(e.target.value || null)}
          className="border rounded px-3 py-2 text-sm"
        />
        <FilterDropdown
          label="Status"
          options={QUIZ_STATUS_ENUM}
          value={status}
          onChange={setStatus}
        />
        {(roomSearch || status || date) && (
          <Button
            variant="destructive"
            onClick={() => {
              setRoomSearch(EMPTY);
              setStatus(null);
              setDate(null);
            }}
          >
            Reset Filters
          </Button>
        )}
      </div>
      <Button onClick={() => router.push("/quiz/add")}>Create New Quiz</Button>
    </div>
  );
};

export default QuizPanel;
