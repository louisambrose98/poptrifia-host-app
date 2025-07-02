"use client";

import DataTable from "@/components/DataTable";
import { DUMMY_PREV_RESULTS } from "@/constants/dummy";

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
        data={DUMMY_PREV_RESULTS}
        pageSize={5}
        total={DUMMY_PREV_RESULTS.length}
        getRowId={(row, idx) => row.username + idx}
        onRowClick={(row) => console.log(`/user/${row.username}`)}
      />
    </div>
  );
};

export default PreviousResultsTable;
