import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import DeleteIssueButton from "./DeleteIssueButton";

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
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      {/*initial is for mobile and md is for medium devices*/}
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      <Box>
        <Flex direction="column" gap="4">
          <EditIssueButton issueId={issue.id} />
          <DeleteIssueButton issueId={issue.id} />
        </Flex>
      </Box>
    </Grid>
  );
};

export default IssueDetailPage;
