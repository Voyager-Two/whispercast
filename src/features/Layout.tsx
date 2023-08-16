import NavBar from "@app/features/NavBar";
import React from "react";

interface ILayoutProps {
  children: any;
}

export const Layout = ({ children }: ILayoutProps) => (
  <React.Fragment>
    <NavBar />
    {children}
  </React.Fragment>
);
