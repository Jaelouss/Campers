import { useLocation } from "react-router-dom";
import type { ReactNode } from "react";
import { Header } from "@components";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const { pathname } = useLocation();
  const container = pathname === "/" ? "" : "container";

  return (
    <>
      <Header />
      <main className={container}>{children}</main>
    </>
  );
};
