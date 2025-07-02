"use client";
import DateInput from "@/components/DateInput";
import FilterDropdown from "@/components/FilterDropdown";
import SearchInput from "@/components/SearchInput";
import { Button } from "@/components/ui/button";

type Props = {
  roomSearch: string;
  setRoomSearch: (value: string) => void;
  date: string;
  setDate: (value: string | null) => void;
  status: string;
  setStatus: (value: string | null) => void;
  StatusEnum: string[];
};

const QuizPanel = ({
  roomSearch,
  setRoomSearch,
  date,
  setDate,
  status,
  setStatus,
  StatusEnum,
}: Props) => {
  return (
    <div className="flex flex-wrap gap-4 mb-6 items-center">
      <span className="font-semibold text-lg mr-4">Quizzes</span>
      <SearchInput
        value={roomSearch}
        onChange={(e) => setRoomSearch(e.target.value)}
        className="w-48"
      />
      <DateInput
        value={date || ""}
        onChange={(e) => setDate(e.target.value || null)}
        className="border rounded px-3 py-2 text-sm"
      />
      <FilterDropdown
        label="Status"
        options={StatusEnum}
        value={status}
        onChange={setStatus}
      />
      {(roomSearch || status || date) && (
        <Button
          variant="destructive"
          onClick={() => {
            setRoomSearch("");
            setStatus(null);
            setDate(null);
          }}
        >
          Reset Filters
        </Button>
      )}
    </div>
  );
};

export default QuizPanel;
