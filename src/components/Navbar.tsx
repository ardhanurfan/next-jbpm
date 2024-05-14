"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function Navbar() {
  const path = usePathname();

  return (
    <div className="top-0 w-full px-12 py-3 bg-blue-950 text-white flex items-center gap-6 fixed">
      <Link
        className={path === "/" ? "font-medium text-pink-500" : ""}
        href={"/"}
      >
        Definitions
      </Link>
      <Link
        className={path === "/task" ? "font-medium text-pink-500" : ""}
        href={"/task"}
      >
        My Task
      </Link>
    </div>
  );
}

export default Navbar;
