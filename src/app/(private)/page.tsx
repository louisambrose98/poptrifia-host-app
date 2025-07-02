import LeaderboardTable from "./question/_components/LeaderboardTable";
import PreviousQuizTable from "./question/_components/PreviousQuizTable";
import PreviousResultsTable from "./question/_components/PreviousResultsTable";
import StatusGrid from "./question/_components/StatusGrid";

export default function DashboardPage() {
  return (
    <div className="max-w-full px-6 py-6">
      {/* Status Cards Grid */}
      <StatusGrid />

      {/* 3-column row for tables */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <LeaderboardTable />
        </div>
        <div>
          <PreviousResultsTable />
        </div>
        <div>
          <PreviousQuizTable />
        </div>
      </div>
    </div>
  );
}
