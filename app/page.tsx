import Image from "next/image";
import Pagination from "./issues/_components/Pagination";
import IssueSummary from "./IssueSummary";
import prisma from "@/prisma/client";

export default async function Home() {
  const open = await prisma.issue.count({ where: { status: "OPEN" } });
  const inProgress = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });
  const closed = await prisma.issue.count({ where: { status: "CLOSED" } });
  return (
    <div>
      <IssueSummary
        open={open}
        inProgress={inProgress}
        closed={closed}
      ></IssueSummary>
    </div>
  );
}
