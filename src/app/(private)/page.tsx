import LeaderboardTable from "./_components/LeaderboardTable";
import PreviousQuizTable from "./_components/PreviousQuizTable";
import PreviousResultsTable from "./_components/PreviousResultsTable";
import StatusGrid from "./_components/StatusGrid";

export default function DashboardPage() {
  return (
    <div className="max-w-full w-full px-2 sm:px-4 md:px-6 py-6">
      {/* Status Cards Grid */}
      <StatusGrid />

      {/* 3-column row for tables */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        <div className="w-full overflow-x-auto">
          <LeaderboardTable />
        </div>
        <div className="w-full overflow-x-auto">
          <PreviousResultsTable />
        </div>
        <div className="w-full overflow-x-auto">
          <PreviousQuizTable />
        </div>
      </div>
    </div>
  );
}
