import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import React from "react";

const status: { label: string; value?: Status }[] = [
  { label: "All" },
  { label: "OPEN", value: Status.OPEN },
  { label: "CLOSED", value: Status.CLOSED },
  { label: "IN_PROGRESS", value: Status.IN_PROGRESS },
];
const IssueStatusFilter = () => {
  return (
    <Select.Root>
      <Select.Trigger placeholder="Filter by status" />
      <Select.Content>
        <Select.Group>
          <Select.Label>Filter by status</Select.Label>
          {status.map((s) => (
            <Select.Item key={s.value} value={s.value || " "}>
              {s.label}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
