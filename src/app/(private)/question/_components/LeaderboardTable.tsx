"use client";

import DataTable from "@/components/DataTable";

const leaderboard = [
  { id: 1, username: "karenon", score: 71, country: "IE" },
  { id: 2, username: "david", score: 54, country: "ZW" },
  { id: 3, username: "louis_ambrose", score: 47, country: "IE" },
  { id: 4, username: "syyyy", score: 22, country: "CA" },
  { id: 5, username: "kyran", score: 8, country: null },
  { id: 6, username: "gs2025", score: 6, country: "IE" },
  { id: 7, username: "sean_cmon", score: 5, country: "CA" },
];

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
        data={leaderboard}
        pageSize={PAGE_SIZE}
        total={leaderboard.length}
        getRowId={(row) => row.id}
        onRowClick={(row) => console.log(`/user/${row.username}`)}
      />
    </div>
  );
};

export default LeaderboardTable;
