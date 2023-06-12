"use client";

import Button from "@/components/Button";
import Logo from "@/components/Logo";
import { ShoppingBagIcon } from "@/icons";
import TopAppBar from "@/layouts/TopAppBar";
import Link from "next/link";

interface LayoutHeaderProps {}

const LayoutHeader: React.FC<LayoutHeaderProps> = () => {
  return (
    <TopAppBar
      leadingNavItems={
        <Link legacyBehavior passHref href="/">
          <Button variant="ghost" size="medium" iconBefore={<Logo />} />
        </Link>
      }
      trailingNavItems={
        <Link legacyBehavior passHref href="/carts">
          <Button
            variant="ghost"
            size="medium"
            iconBefore={<ShoppingBagIcon />}
          />
        </Link>
      }
    />
  );
};

export default LayoutHeader;
