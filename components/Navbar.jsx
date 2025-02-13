import React from "react";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

const Navbar = () => {
  return (
    <header className="p-4 flex justify-between items-center border fixed top-0 left-0 w-full z-50">
      <div className="flex items-center gap-2">
        <Link href="/">
          <span className="text-2xl font-bold">RunTime</span>
        </Link>
      </div>

      <div className="p-2 h-10 w-10">
        <UserButton className="h-8 w-8" />
      </div>
    </header>
  );
};

export default Navbar;
