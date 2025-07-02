"use client";

import DataTable from "@/components/DataTable";
import { DUMMY_LEADERBOARD } from "@/constants/dummy";

const PAGE_SIZE = 5;

const LeaderboardTable = () => {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Current Leaderboard</h1>
      <DataTable
        columns={[
          { label: "Username", accessor: "username" },
          { label: "Country", accessor: "country" },
          { label: "Score", accessor: "score" },
        ]}
        data={DUMMY_LEADERBOARD}
        pageSize={PAGE_SIZE}
        total={DUMMY_LEADERBOARD.length}
        getRowId={(row) => row.id}
        onRowClick={(row) => console.log(`/user/${row.username}`)}
      />
    </div>
  );
};

export default LeaderboardTable;
