import StatusCard from "@/components/StatusCard";
import { DASHBOARD_STATUS } from "@/constants/dashboard";
import { DUMMY_STATUS_DATA, DUMMYY_PREV_QUIZ } from "@/constants/dummy";
import { sentence } from "@/lib/guards";

const StatusGrid = () => {
  const {
    titleDetails,
    titleQuiz,
    titleStatus,
    titleScore,
    msgQuestions,
    msgPlayers,
    msgDuration,
  } = DASHBOARD_STATUS;
  const { name, questions, players, date } = DUMMYY_PREV_QUIZ;
  const { id, type, maxScore, duration } = DUMMY_STATUS_DATA;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8 w-full">
      <StatusCard
        title={titleDetails}
        value={name}
        description={sentence(questions.length, msgQuestions)}
      />
      <StatusCard
        title={titleQuiz}
        value={sentence(players, msgPlayers)}
        description={id}
      />
      <StatusCard title={titleStatus} value={type} description={date} />
      <StatusCard
        title={titleScore}
        value={maxScore}
        description={sentence(duration, msgDuration)}
      />
    </div>
  );
};

export default StatusGrid;
