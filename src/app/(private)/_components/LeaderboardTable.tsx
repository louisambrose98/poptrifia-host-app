"use client";

import DataTable from "@/components/DataTable";
import { DASHBOARD_LEADERBOARD } from "@/constants/dashboard";
import { DUMMY_LEADERBOARD } from "@/constants/dummy";
import { navigateToUser } from "@/lib/navigation";
import TableTitle from "./TableTitle";

const LeaderboardTable = () => {
  const { title, columns, pageSize } = DASHBOARD_LEADERBOARD;

  return (
    <div className="w-full overflow-x-auto mt-6 sm:mt-10">
      <TableTitle title={title} />
      <DataTable
        columns={[
          { ...columns.username },
          { ...columns.country },
          { ...columns.score },
        ]}
        data={DUMMY_LEADERBOARD}
        pageSize={pageSize}
        total={DUMMY_LEADERBOARD.length}
        getRowId={(row) => row.id}
        onRowClick={(row) => navigateToUser(row.username)}
      />
    </div>
  );
};

export default LeaderboardTable;
