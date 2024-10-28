"use client";
import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React from "react";

const status: { label: string; value?: Status }[] = [
  { label: "All" },
  { label: "OPEN", value: Status.OPEN },
  { label: "CLOSED", value: Status.CLOSED },
  { label: "IN_PROGRESS", value: Status.IN_PROGRESS },
];
const IssueStatusFilter = () => {
  const router = useRouter();

  return (
    <Select.Root
      onValueChange={(status) => {
        console.log("status : ", status);
        const query = status != " " ? `?status=${status}` : "";
        router.push(`/issues${query}`);
      }}
    >
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
