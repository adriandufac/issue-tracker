import prisma from "@/prisma/client";
import { Flex, Table } from "@radix-ui/themes";
import React from "react";
import { IssueStatusBadge } from "./components";
import Link from "next/link";

const LatestIssues = async () => {
  const issues = await prisma.issue.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
  });
  return (
    <Table.Root>
      <Table.Body>
        {issues.map((issue) => (
          <Table.Row key={issue.id}>
            <Table.Cell>
              <Flex direction="column" align="start" gap="2">
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <IssueStatusBadge status={issue.status} />
              </Flex>
            </Table.Cell>
            <Table.Cell>{issue.createdAt.toLocaleDateString()}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default LatestIssues;
