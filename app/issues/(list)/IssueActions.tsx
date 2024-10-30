import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import React, { Suspense } from "react";
import IssueStatusFilter from "./IssueStatusFilter";

const IssueActions = () => {
  return (
    <Flex justify="between">
      <Suspense>
        <IssueStatusFilter />
      </Suspense>
      <Button>
        <Link href="/issues/new">New Issue</Link>
      </Button>
    </Flex>
  );
};

export default IssueActions;
