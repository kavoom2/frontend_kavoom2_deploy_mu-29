"use client";

import Button from "@/components/Button/Button";
import { ShoppingBagIcon } from "@/icons";
import MainContainer from "@/layouts/MainContainer/MainContainer";
import TopAppBar from "@/layouts/TopAppBar/TopAppBar";

interface PageHeaderProps {}

const PageHeader: React.FC<PageHeaderProps> = () => {
  return (
    <TopAppBar
      leadingNavItems={<>29CM 아이콘</>}
      trailingNavItems={
        <>
          <Button
            variant="ghost"
            size="medium"
            iconBefore={<ShoppingBagIcon />}
          />
        </>
      }
    />
  );
};

interface PageMainProps {}

const PageMain: React.FC<PageMainProps> = () => {
  return <MainContainer>페이지 헤더입니다.</MainContainer>;
};

export default function ProductList() {
  return (
    <>
      <PageHeader />

      <PageMain />
    </>
  );
}
