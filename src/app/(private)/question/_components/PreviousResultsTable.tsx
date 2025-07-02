"use client";

import DataTable from "@/components/DataTable";

const previousResults = [
  { id: 1, username: "karenon", country: "IE", score: 13, time: 62.769 },
  { id: 2, username: "david", country: "ZW", score: 4, time: 81.23 },
  { id: 3, username: "louis_ambrose", country: "ZW", score: 4, time: 81.23 },
  { id: 4, username: "syyyy", country: "IE", score: 4, time: 81.23 },
  { id: 5, username: "kyran", country: "CA", score: 4, time: 81.23 },
  { id: 6, username: "gs2025", country: "ZW", score: 4, time: 81.23 },
  { id: 7, username: "sean_cmon", country: "ZW", score: 4, time: 81.23 },
];

const PreviousResultsTable = () => {
  return (
    <div className="mt-10">
      <h2 className="text-xl font-semibold mb-2">Previous Results</h2>
      <DataTable
        columns={[
          { label: "Username", accessor: "username" },
          { label: "Country", accessor: "country" },
          { label: "Score", accessor: "score" },
          {
            label: "Time (s)",
            accessor: "time",
            render: (row) => row.time.toFixed(2),
          },
        ]}
        data={previousResults}
        pageSize={5}
        total={previousResults.length}
        getRowId={(row, idx) => row.username + idx}
        onRowClick={(row) => console.log(`/user/${row.username}`)}
      />
    </div>
  );
};

export default PreviousResultsTable;
