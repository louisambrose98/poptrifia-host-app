import StatusCard from "@/components/StatusCard";

const STATUS_DATA = {
  id: "27d6c6fc-28fc-4959-8750-ec8a9d19e826",
  type: "PUBLIC",
  numQuestions: 10,
  maxScore: 19,
  duration: 150,
  stime: "2025-07-01T20:02:00.617Z",
  etime: "2025-07-01T20:04:15.617Z",
  ctime: "2025-07-01T20:06:15.617Z",
  ntime: "2025-07-02T04:00:30.617Z",
};

// Example quiz info (replace with real data as needed)
const PREV_QUIZ = {
  name: "Quiz #17",
  date: "2025-07-01T20:00:27.838Z",
  players: 2,
  questions: Array(10),
  winner: "karenon",
};

const StatusGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
      <StatusCard
        title="Previous Details"
        value={PREV_QUIZ.name}
        description={`${PREV_QUIZ.questions.length} questions`}
      />
      <StatusCard
        title="Previous Winner"
        value={PREV_QUIZ.winner}
        description={PREV_QUIZ.date}
      />
      <StatusCard
        title="Previous Quiz"
        value={`${PREV_QUIZ.players} player(s)`}
        description={STATUS_DATA.id}
      />
      <StatusCard
        title="Quiz Status"
        value={STATUS_DATA.type}
        description={"3 hours ago"}
      />
      <StatusCard
        title="Max Score"
        value={STATUS_DATA.maxScore}
        description={`Duration: ${STATUS_DATA.duration}s`}
      />
    </div>
  );
};

export default StatusGrid;
