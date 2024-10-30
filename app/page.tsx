import prisma from "@/prisma/client";
import { Flex, Grid } from "@radix-ui/themes";
import { Metadata } from "next";
import IssueChart from "./IssueChart";
import IssueSummary from "./IssueSummary";
import LatestIssues from "./LatestIssues";
import { revalidatePath } from "next/cache";

export default async function Home() {
  const open = await prisma.issue.count({ where: { status: "OPEN" } });
  const inProgress = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });
  const closed = await prisma.issue.count({ where: { status: "CLOSED" } });

  const issuesStatus = { open: open, inProgress: inProgress, closed: closed };
  revalidatePath("/");
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

export const metadata: Metadata = {
  title: "Issue Tracker - Dashboard",
  description:
    "Dashboard for the issue tracker app, view a summary of project issues and the latest issues.",
  /* openGraph: {}, To do to have better sharing on social media
  twitter: {}, */
  authors: [{ name: "Adrian Dufac" }],
  creator: "Adrian Dufac",
};
