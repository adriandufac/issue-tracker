import prisma from "@/prisma/client";
import { Issue, Status } from "@prisma/client";
import Pagination from "../_components/Pagination";
import IssueActions from "./IssueActions";
import IssueTable, { IssueQuery, columnNames } from "./IssueTable";
import { Flex } from "@radix-ui/themes";
import { Metadata } from "next";

const IssuePage = async ({ searchParams }: { searchParams: IssueQuery }) => {
  const statuses = Object.values(Status).toString();

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const where = { status: status as Status };

  const orderBy = columnNames.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  const issues = await prisma.issue.findMany({
    where: where,
    orderBy: orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issuesNumber = await prisma.issue.count({
    where: { status: status as Status },
  });

  return (
    <Flex direction="column" gap="3">
      <IssueActions></IssueActions>
      <IssueTable searchParams={searchParams} issues={issues}></IssueTable>
      <Pagination
        itemCount={issuesNumber}
        pageSize={pageSize}
        currentPage={page}
      ></Pagination>
    </Flex>
  );
};
export const metadata: Metadata = {
  title: "Issue Tracker - Issues List",
  description: "View all the project issues",
  /* openGraph: {}, To do to have better sharing on social media
  twitter: {}, */
  authors: [{ name: "Adrian Dufac" }],
  creator: "Adrian Dufac",
};
export default IssuePage;
