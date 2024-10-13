import NextLink from "next/link";
import { Link as RadixLink } from "@radix-ui/themes";

interface LinkProps {
  href: string;
  children: string;
}
/**
 *
 * We want to use the Radix Link to have a consistent look with our app even if we change radix theme in the future. But radix link doesnt have clientside rendering so we need to wrap it with next/link to gain both benefits.
 *
 */
const Link = ({ href, children }: LinkProps) => {
  return (
    <NextLink href={href} passHref legacyBehavior>
      <RadixLink>{children}</RadixLink>
    </NextLink>
  );
};

export default Link;
