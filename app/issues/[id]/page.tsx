import React from "react";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";

interface IssueDetailPageProps {
  params: { id: string };
}

const IssueDetailPage = async ({ params }: IssueDetailPageProps) => {
  if (Number.isNaN(parseInt(params.id))) {
    return notFound();
  }
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });
  if (!issue) {
    return notFound();
  }

  return (
    <div>
      <p>{issue.title}</p>
      <p>{issue.description}</p>
      <p>{issue.status}</p>
      <p>{issue.createdAt.toLocaleDateString()}</p>
    </div>
  );
};

export default IssueDetailPage;
