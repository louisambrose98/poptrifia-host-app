import LeaderboardTable from "./question/_components/LeaderboardTable";
import PreviousQuizTable from "./question/_components/PreviousQuizTable";
import PreviousResultsTable from "./question/_components/PreviousResultsTable";

export default function DashboardPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <LeaderboardTable />
      <PreviousResultsTable />
      <PreviousQuizTable />
    </div>
  );
}
