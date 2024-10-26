"use client";
import { Skeleton } from "@/app/components";
import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const { data: users, error, isLoading } = useUsers();

  if (error) {
    return null;
  }

  if (isLoading) {
    return <Skeleton />;
  }

  const assignUser = async (userId: string) => {
    try {
      await axios.patch(`/api/issues/${issue.id}`, {
        assignedToUserId: userId === "notassigned" ? null : userId,
      });
    } catch (error) {
      toast.error("Could not assign user");
    }
  };
  return (
    <>
      <Select.Root
        defaultValue={issue.assignedToUserId || "notassigned"}
        onValueChange={assignUser}
      >
        <Select.Trigger placeholder="Assign ..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="notassigned">Unassigned</Select.Item>
            {users?.map((user) => (
              <Select.Item value={user.id}>{user.name}</Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster></Toaster>
    </>
  );
};

const useUsers = () =>
  useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    staleTime: 60 * 1000, // datas are cached for 60 seconds
    retry: 3, // retry 3 times before failing
  });

export default AssigneeSelect;
