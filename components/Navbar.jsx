"use client";
import React from "react";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Menu } from "lucide-react";
import { useSidebar } from "./ui/sidebar";

const Navbar = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <header className="p-4 flex justify-between items-center border w-full">
      <div className="flex items-center gap-2">
        <Menu onClick={toggleSidebar} className="h-8 w-8 cursor-pointer" />
      </div>
      <div>
        <Link href="/">
          <span className="text-2xl font-bold">RunTime</span>
        </Link>
      </div>
      <div className="p-2 h-10 w-10 flex items-center justify-center">
        <UserButton />
      </div>
    </header>
  );
};

export default Navbar;
