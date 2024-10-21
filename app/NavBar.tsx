"use client"; // run this file in client side only

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AiFillBug } from "react-icons/ai";
import classnames from "classnames";
import { useSession } from "next-auth/react";
import {
  Avatar,
  Box,
  Button,
  Container,
  DropdownMenu,
  Flex,
} from "@radix-ui/themes";
import { Text } from "@radix-ui/themes/dist/esm/components/callout.js";

const NavBar = () => {
  return (
    <nav className="border-b mb-5 px-5 py-3">
      <Container>
        <Flex justify="between" align="center">
          <Flex align="center" gap="3">
            <Link href="/">
              <AiFillBug />
            </Link>
            <NavLinks></NavLinks>
          </Flex>

          <AuthStatus></AuthStatus>
        </Flex>
      </Container>
    </nav>
  );
};
const NavLinks = () => {
  //react hook to get active pathname
  const currentPath = usePathname();

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];

  return (
    <ul className="flex space-x-6">
      {links.map(({ label, href }) => (
        <li key={label}>
          <Link
            className={classnames({
              "nav-link": true,
              "!text-zinc-900": currentPath === href,
            })}
            href={href}
          >
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );
};
const AuthStatus = () => {
  const { status, data: session } = useSession();
  return (
    <Box>
      {status === "authenticated" ? (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Button radius="full" size="1" variant="ghost" className="!p-0">
              <Avatar
                src={session.user!.image!}
                fallback="?"
                size="2"
                radius="full"
                className="cursor-pointer"
                referrerPolicy="no-referrer"
              />
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Label>
              <Text className="text-zinc-900" size="2">
                {session.user!.email}
              </Text>
            </DropdownMenu.Label>
            <DropdownMenu.Item>
              <Link href="/api/auth/signout" className="w-full">
                Log out
              </Link>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      ) : (
        <Link href={"/api/auth/signin"} className="nav-link">
          Login
        </Link>
      )}
    </Box>
  );
};

export default NavBar;
