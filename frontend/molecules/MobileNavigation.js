"use client";
import * as React from "react";
import Sidebar from "./Sidebar";

export const MobileNavigation = (isCollapsed) => {
  return <Sidebar className={undefined} isCollapsed={isCollapsed} />;
};
