import Image from "next/image";
import Pagination from "./issues/_components/Pagination";
import IssueSummary from "./IssueSummary";
import prisma from "@/prisma/client";
import LatestIssues from "./LatestIssues";
import IssueChart from "./IssueChart";
import { Flex, Grid } from "@radix-ui/themes";

export default async function Home() {
  const open = await prisma.issue.count({ where: { status: "OPEN" } });
  const inProgress = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });
  const closed = await prisma.issue.count({ where: { status: "CLOSED" } });

  const issuesStatus = { open: open, inProgress: inProgress, closed: closed };
  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Flex direction="column" gap="5">
        <IssueSummary issuesStatus={issuesStatus}></IssueSummary>
        <IssueChart issuesStatus={issuesStatus}></IssueChart>
      </Flex>

      <LatestIssues></LatestIssues>
    </Grid>
  );
}
