"use client";
import prisma from "@/prisma/client";
import { User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import React, { use, useEffect } from "react";
import { set } from "zod";

const AssigneeSelect = () => {
  const [users, setUsers] = React.useState<User[]>([]);
  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await axios.get("/api/users");
      setUsers(data);
    };
    fetchUsers();
  }, []);
  return (
    <Select.Root>
      <Select.Trigger placeholder="Assign ..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          {users.map((user) => (
            <Select.Item value={user.id}>{user.name}</Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneeSelect;
