"use client"; // run this file in client side only

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AiFillBug } from "react-icons/ai";
import classnames from "classnames";
import { useSession } from "next-auth/react";
import { Box } from "@radix-ui/themes";

const NavBar = () => {
  //react hook to get active pathname
  const currentPath = usePathname();
  const { status, data: session } = useSession();
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];
  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
      <Link href="/">
        <AiFillBug />
      </Link>
      <ul className="flex space-x-6">
        {links.map(({ label, href }) => (
          <li key={label}>
            <Link
              className={classnames({
                "text-zinc-900": currentPath === href,
                "text-zinc-500": currentPath !== href,
                "hover:text-zinc-800 transition-colors": true,
              })}
              href={href}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
      <Box>
        {status === "authenticated" ? (
          <Link href={"/api/auth/signout"}>
            <button>Sign Out</button>
          </Link>
        ) : (
          <Link href={"/api/auth/signin"}>
            <button>Sign In</button>
          </Link>
        )}
      </Box>
    </nav>
  );
};

export default NavBar;
