"use client";

import DataTable from "@/components/DataTable";
import { DASHBOARD_PREV_RESULTS } from "@/constants/dashboard";
import { DUMMY_PREV_RESULTS } from "@/constants/dummy";
import { navigateToUser } from "@/lib/navigation";
import TableTitle from "./TableTitle";

const PreviousResultsTable = () => {
  const { title, columns, pageSize } = DASHBOARD_PREV_RESULTS;

  return (
    <div className="w-full overflow-x-auto mt-6 sm:mt-10">
      <TableTitle title={title} />
      <DataTable
        columns={[
          { ...columns.username },
          { ...columns.country },
          { ...columns.score },
          {
            ...columns.time,
            render: (row) => row.time.toFixed(3),
          },
        ]}
        data={DUMMY_PREV_RESULTS}
        pageSize={pageSize}
        total={DUMMY_PREV_RESULTS.length}
        getRowId={(row, idx) => row.username + idx}
        onRowClick={(row) => navigateToUser(row.username)}
      />
    </div>
  );
};

export default PreviousResultsTable;
